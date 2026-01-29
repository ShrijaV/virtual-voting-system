import random
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Voter, Candidate, Vote,Election
from rest_framework import viewsets
from .serializers import CandidateSerializer, VoterSerializer, VoteSerializer,ElectionSerializer

# Create your views here.
class CandidateViewSet(viewsets.ModelViewSet):
    queryset=Candidate.objects.all()
    serializer_class=CandidateSerializer

class ElectionViewSet(viewsets.ModelViewSet):
    queryset=Election.objects.all()
    serializer_class=ElectionSerializer

@api_view(['GET'])
def get_voter(request, voter_id):
    try:
        voter=Voter.objects.get(id=voter_id)
        return Response({
            "id":voter.id,
            "phone":voter.phone,
            "has_voted":voter.has_voted,
        })
    except:
        return Response({"error":"Voter not found"},status=404)

@api_view(['POST'])
def cast_vote(request):
    voter_id=request.data.get('voter_id')
    candidate_id=request.data.get('candidate_id')

    try:
        voter=Voter.objects.get(id=voter_id)
        candidate=Candidate.objects.get(id=candidate_id)
    except (Voter.DoesNotExist, Candidate.DoesNotExist):
        return Response({"error":"Invalid voter or candidate"}, status=400)
    
    if voter.has_voted:
        return Response({"error":"You have already voted"},status=400)
    voter.has_voted=True
    voter.save()

    candidate.votes+=1
    candidate.save()

    # Vote.objects.create(voter=voter,candidate=candidate)

    return Response({"message": "Vote recorded successfully"})


@api_view(['POST'])
def request_otp(request):
    phone=request.data.get('phone')
    
    if not phone:
        return Response({"error":"Phone number is required"},status=400)
    otp=str(random.randint(1000,9999))
    voter,created=Voter.objects.get_or_create(phone=phone)
    voter.otp=otp
    voter.save()
    print("generated OTP for",phone,":",otp)
    return Response({"message":"OTP sent successfully (check backend console)"})


@api_view(['POST'])
def verify_otp(request):
    phone=request.data.get('phone')
    otp=request.data.get('otp')

    try:
        voter=Voter.objects.get(phone=phone)
    except Voter.DoesNotExist:
        return Response({"error":"Phone number not registered"},status=400)
    
    if voter.otp==otp:
        return Response({"message":"Login successful","voter_id":voter.id})
    else:
        return Response({"error":"Invalid OTP"},status=400)
    
@api_view(['GET'])
def election_results(request, election_id):
    candidates = Candidate.objects.filter(election_id=election_id).order_by('-votes')
    data = CandidateSerializer(candidates, many=True).data
    return Response(data)

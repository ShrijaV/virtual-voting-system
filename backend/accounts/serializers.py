from rest_framework import serializers
from .models import Voter,Candidate,Vote,Election

class VoterSerializer(serializers.ModelSerializer):
    class Meta:
        model=Voter
        fields=['id','phone','has_voted']


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Candidate
        fields='__all__'


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Voter
        fields='__all__'

    def create(self, validated_data):
        voter=validated_data['voter']
        candidate=validated_data['candidate']

        if voter.has_voted:
            raise serializers.ValidationError("Voter has already voted.")
        
        voter.has_voted=True
        voter.save()

        candidate.votes+=1
        candidate.save()

        return super().create(validated_data)
    

class ElectionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Election
        fields="__all__"

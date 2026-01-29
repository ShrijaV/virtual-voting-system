from django.db import models
from django.utils import timezone

# Create your models here.

class Voter(models.Model):
    phone=models.CharField(max_length=10,unique=True)
    otp=models.CharField(max_length=4,blank=True,null=True)
    has_voted=models.BooleanField(default=False)

    def __str__(self):
        return self.phone
    

class Election(models.Model):
    title=models.CharField(max_length=100)
    created_at=models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title
    


class Candidate(models.Model):
    name=models.CharField(max_length=100)
    party=models.CharField(max_length=100, blank=True, null=True)
    election=models.ForeignKey('Election',on_delete=models.CASCADE,null=True)
    votes=models.IntegerField(default=0)

    def __str__(self):
        return f"{self.name} ({self.party})"
    

class Vote(models.Model):
    voter=models.OneToOneField(Voter,on_delete=models.CASCADE)
    candidate=models.ForeignKey(Candidate,on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.voter.phone}  -> {self.candidate.name}"
    

    
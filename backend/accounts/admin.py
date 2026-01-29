from django.contrib import admin
from .models import Voter, Candidate

# Register your models here.


class candidateAdmin(admin.ModelAdmin):
    list_display=("id","name","party","election","votes")



class voterAdmin(admin.ModelAdmin):
    list_display=("id","phone","otp","has_voted")

admin.site.register(Voter,voterAdmin)
admin.site.register(Candidate, candidateAdmin)
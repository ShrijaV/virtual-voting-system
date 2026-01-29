"""
URL configuration for voting project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from accounts.views import request_otp,verify_otp,CandidateViewSet,cast_vote,get_voter,ElectionViewSet,election_results

router=DefaultRouter()
router.register('candidates',CandidateViewSet)
router.register('elections',ElectionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/request-otp/', request_otp),
    path('api/verify-otp/', verify_otp),
    path('api/', include(router.urls)),
    path('api/get_voter/<int:voter_id>/', get_voter),
    path('api/cast-vote/', cast_vote),
    path("api/election-results/<int:election_id>/", election_results),

]

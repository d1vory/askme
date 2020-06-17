from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('answers', AnswerViewSet)
router.register('questions', QuestionViewSet, basename='questions')

# urlpatterns = [
#     path('questions/',QuestionList.as_view(), name= 'questions'),
#     path('answer/create',QuestionList.as_view(), name= 'questions'),
# ]

urlpatterns =  router.urls

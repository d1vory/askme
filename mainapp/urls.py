from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register('answers', AnswerViewSet)
router.register('questions', QuestionListViewSet)
urlpatterns = router.urls

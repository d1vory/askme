from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import viewsets
from .serializers import *
from .models import MyUser,Question, Answer
from django.contrib.auth.models import User
# Create your views here.


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

class QuestionListViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        tokenVal = self.request.query_params.get('token')
        user = User.objects.get(auth_token=tokenVal)
        queryset = Question.objects.filter(askedUser__id = user.id)
        return queryset

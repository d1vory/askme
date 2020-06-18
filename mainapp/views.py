from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import viewsets
from .serializers import *
from .models import MyUser,Question, Answer
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import permissions
# Create your views here.


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return AnswerSerializer
        elif self.action == 'create':
            return AnswerCreateSerializer


class QestionDeleteView(generics.DestroyAPIView):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    permission_classes = (permissions.IsAuthenticated, )

class QuestionViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        #get token string from corsheaders
        tokenStr = self.request.headers['Authorization']
        tokenVal = tokenStr.split()[1]

        user = User.objects.get(auth_token=tokenVal)
        queryset = Question.objects.filter(askedUser__id = user.id)
        # allQuestions = Question.objects.filter(askedUser__id = user.id)
        # unAnsweredQuestions = filter((lambda question: question.entry_set.count() == 0  ), allQuestions)
        return queryset

        #For evety qurstion:
        #   find count of related AnswerSerializer
        #   if count == 0 then include question

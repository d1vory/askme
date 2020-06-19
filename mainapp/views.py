from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import viewsets
from .serializers import *
from .models import MyUser,Question, Answer
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import permissions
from friendship.models import FriendshipRequest,Friend
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
        # get unanswered questions
        queryset = Question.objects.raw('SELECT * FROM mainapp_question where askeduser_id = %s AND mainapp_question.id NOT IN ( SELECT mainapp_answer.question_id FROM mainapp_answer);',[user.id])

        return queryset

class FriendListView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        tokenStr = self.request.headers['Authorization']
        tokenVal = tokenStr.split()[1]
        user = User.objects.get(auth_token=tokenVal)

        queryset = Friend.objects.friends(user)
        serializer = self.serializer_class(queryset, many=True)
        #print(queryset)
        return queryset

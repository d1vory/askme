from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import viewsets
from .serializers import *
from .models import MyUser,Question, Answer
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import permissions
from friendship.models import FriendshipRequest,Friend
from rest_framework.response import Response
from rest_framework import status
from rest_framework import filters
# Create your views here.


# class AnswerViewSet(viewsets.ModelViewSet):
#     queryset = Answer.objects.all()
#     serializer_class = AnswerSerializer
#
#     def get_serializer_class(self):
#         if self.action == 'list':
#             return AnswerSerializer
#         elif self.action == 'create':
#             return AnswerCreateSerializer

class AnswerCreateView(generics.CreateAPIView):
    serializer_class = AnswerCreateSerializer
    queryset = Answer.objects.all()

class AnswersAccountListView(generics.ListAPIView):
    serializer_class = AnswerSerializer

    def get_queryset(self):
        user  = self.request.user
        queryset = Answer.objects.raw("""
                                        SELECT *
                                        FROM mainapp_answer
                                        WHERE question_id IN(
                                        SELECT id
                                        FROM mainapp_question
                                        where askeduser_id = %s AND mainapp_question.id IN (
                                          SELECT mainapp_answer.question_id
                                          FROM mainapp_answer))
                                        ORDER BY timestamp DESC; """,[user.id])
        return queryset


class AnswersListView(generics.ListAPIView):
    serializer_class = AnswerSerializer

    def get_queryset(self):
        user  = self.request.user
        queryset = Answer.objects.raw("""
                                            SELECT *
                                            FROM mainapp_answer
                                            WHERE question_id IN(
                                            	SELECT id
                                            	FROM mainapp_question
                                            	WHERE askeduser_id IN (SELECT to_user_id
                                            							FROM friendship_friend
                                            							WHERE from_user_id = %s) AND mainapp_question.id IN (
                                            									  SELECT mainapp_answer.question_id
                                            									  FROM mainapp_answer))
                                            ORDER BY timestamp DESC;
                                        """,[user.id])

        return queryset

class QuestionCreateView(generics.CreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def create(self,request, *args, **kwargs):
        tokenStr = self.request.headers['Authorization']
        tokenVal = tokenStr.split()[1]
        user = User.objects.get(auth_token=tokenVal)

        questionData = request.data
        resData = {}
        resData['askedUser'] = request.data['askedUser']
        resData['question_text'] = request.data['question_text']
        if not request.data['isAnon']:
            resData['asker'] = user.id

        serializer = self.get_serializer(data=resData)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class QestionDeleteView(generics.DestroyAPIView):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    permission_classes = (permissions.IsAuthenticated, )



class QuestionViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        #get token string from corsheaders
        #print('USER IS ====== ' , self.request.user)
        tokenStr = self.request.headers['Authorization']
        tokenVal = tokenStr.split()[1]

        user = User.objects.get(auth_token=tokenVal)
        # get unanswered questions
        queryset = Question.objects.raw('SELECT * FROM mainapp_question where askeduser_id = %s AND mainapp_question.id NOT IN ( SELECT mainapp_answer.question_id FROM mainapp_answer);',[user.id])

        return queryset

class FriendListView(generics.ListAPIView):
    serializer_class = DefaultUserSerializer

    def get_queryset(self):
        tokenStr = self.request.headers['Authorization']
        tokenVal = tokenStr.split()[1]
        user = User.objects.get(auth_token=tokenVal)

        queryset = Friend.objects.friends(user)
        serializer = self.serializer_class(queryset, many=True)
        #print(queryset)
        return queryset


class UserSearchListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = DefaultUserSerializer
    search_fields= ['username']
    filter_backends = (filters.SearchFilter,)

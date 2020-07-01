from django.shortcuts import render, get_object_or_404
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



class UserAccountInfoView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_object(self):
        #print(self.request.__dict__)
        #print(self.kwargs)
        username = self.kwargs['username']
        #print(username)
        user = User.objects.get(username=username)
        obj = get_object_or_404(User, pk=user.id)
        return obj

class AccountSettingsView(generics.UpdateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_object(self):
        user = self.request.user
        obj = get_object_or_404(User, pk=user.id)
        return obj

    def put(self, request, *args, **kwargs):
        print("PUT CALLED")
        return self.partial_update(request, *args, **kwargs)

class AccountInfoView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_object(self):
        user = self.request.user
        obj = get_object_or_404(User, pk=user.id)
        return obj

class AnswerCreateView(generics.CreateAPIView):
    serializer_class = AnswerCreateSerializer
    queryset = Answer.objects.all()


class AnswerLikeView(generics.UpdateAPIView):
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()


    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)



class AnswersAccountListView(generics.ListAPIView):
    serializer_class = AnswerSerializer

    def get_queryset(self):
        user  = User.objects.get(username=self.kwargs['username']) if 'username' in self.kwargs else self.request.user
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

class MultipleQuestionsCreateView(generics.CreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = (permissions.IsAuthenticated, )

    # def get_serializer(self, *args, **kwargs):
    #     serializer_class = self.get_serializer_class()
    #     kwargs['context'] = self.get_serializer_context()
    #     return serializer_class(*args, **kwargs)

    def create(self,request, *args, **kwargs ):
        user = self.request.user

        questionData = request.data
        resData = []
        for askedUserId in questionData['askedUsers']:
            dict = {'question_text' :questionData['question_text'], 'askedUser': askedUserId }
            if not questionData['isAnon']:
                dict['asker'] = user.id
            resData.append(dict)

        serializer = self.get_serializer(data=resData, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

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
        queryset = Question.objects.raw('SELECT * FROM mainapp_question where askeduser_id = %s AND mainapp_question.id NOT IN ( SELECT mainapp_answer.question_id FROM mainapp_answer) ORDER BY timestamp DESC;',[user.id])

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


class UserSearchListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    search_fields= ['username','first_name','last_name']
    filter_backends = (filters.SearchFilter,)

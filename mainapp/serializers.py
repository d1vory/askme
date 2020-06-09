from rest_framework import serializers
from .models import MyUser,Question, Answer
from django.contrib.auth.models import User

class DefaultUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','first_name','last_name']

class MyUserSerializer(serializers.ModelSerializer):
    user = DefaultUserSerializer(many=False, read_only=True)
    class Meta:
        model = MyUser
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    askedUser = MyUserSerializer(many=False, read_only=True)
    asker = MyUserSerializer(many=False, read_only=True)
    class Meta:
        model = Question
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    question = QuestionSerializer(many=False, read_only =True)
    class Meta:
        model = Answer
        fields = '__all__'

from rest_framework import serializers
from .models import MyUser,Question, Answer
from django.contrib.auth.models import User
from rest_auth.serializers import UserDetailsSerializer



class UserSerializer(UserDetailsSerializer):

    gender = serializers.CharField(source="myuser.gender")

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('gender',)

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('myuser', {})
        gender = profile_data.get('gender')

        instance = super(UserSerializer, self).update(instance, validated_data)

        # get and update user profile
        profile = instance.userprofile
        if profile_data and gender:
            profile.gender = gender
            profile.save()
        return instance



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

    class Meta:
        model = Question
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    question = QuestionSerializer(many=False, read_only =True)
    class Meta:
        model = Answer
        fields = '__all__'

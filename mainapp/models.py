from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
# Create your modes here.


#TODO Make a reliable friend functionality 

class MyUser(models.Model):
    """
    Represents user for authentication and information
    """
    user = models.OneToOneField(User, on_delete= models.CASCADE)
    avatar = models.ImageField(upload_to="static/media/profile", blank = True)
    selfDescription = models.TextField( blank=True)
    DateOfBirth = models.DateField(default=datetime.today, blank = True)
    gender = models.CharField(blank=True, max_length=3, choices = [('ml','male'),('fml','female'),('oth','other')])
    isAnonymousQuestionsAllowed = models.BooleanField(default=True)
    isUserAnswersVisibleInFeed = models.BooleanField(default=True)

    friends  = models.ManyToManyField('self',related_name='related_friends',blank=True)

    def __str__(self):
        return self.user.username

class Question(models.Model):
    """
    Represents a question that was asked for an user
    """

    question_text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    asker  = models.ForeignKey('MyUser', on_delete=models.CASCADE)


class Answer(models.Model):
    """
    Represents answer that was given to a question
    """
    answer_text = models.TextField()
    photo = models.ImageField(upload_to="static/media/temp", blank = True)
    likes = models.IntegerField(default = 0)
    dislikes = models.IntegerField(default =  0)
    question = models.ForeignKey('Question',on_delete= models.CASCADE)

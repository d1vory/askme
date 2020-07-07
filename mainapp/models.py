from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from django.contrib.auth.models import AnonymousUser
from django.utils import timezone
from django.db.models.signals import post_save
# Create your modes here.


#TODO Make a reliable friend functionality

class MyUser(models.Model):
    """
    Represents user for authentication and information
    """
    user = models.OneToOneField(User, on_delete= models.CASCADE)
    avatar = models.ImageField(upload_to="profile_images", blank = True)
    selfDescription = models.TextField( blank=True)
    DateOfBirth = models.DateField(default=datetime.today, blank = True)
    gender = models.CharField(blank=True, max_length=3, choices = [('ml','male'),('fml','female'),('oth','other')])
    isAnonymousQuestionsAllowed = models.BooleanField(default=True)
    isUserAnswersVisibleInFeed = models.BooleanField(default=True)

    #friends  = models.ManyToManyField('self',related_name='related_friends',blank=True)

    def __str__(self):
        return self.user.username


def create_my_user(sender, instance, created, **kwargs):

    if created:

        MyUser.objects.create(user=instance)

post_save.connect(create_my_user, sender=User)

class Question(models.Model):
    """
    Represents a question that was asked for an user
    """

    question_text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    asker  = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="asker")
    askedUser = models.ForeignKey(User, on_delete=models.CASCADE, related_name="askedUser", default=None)

    def __str__(self):
        return self.question_text

class Answer(models.Model):
    """
    Represents answer that was given to a question
    """
    answer_text = models.TextField()
    photo = models.ImageField(upload_to="static/media/temp", blank = True)
    likes = models.IntegerField(default = 0)
    dislikes = models.IntegerField(default =  0)
    question = models.ForeignKey('Question',on_delete= models.CASCADE)
    timestamp = models.DateTimeField(default= timezone.now)
    def __str__(self):
        return self.answer_text


class Comment(models.Model):
    comment_text =  models.TextField()
    commented_user = models.ForeignKey(User,on_delete= models.CASCADE )
    answer = models.ForeignKey('Answer',on_delete= models.CASCADE )

    def __str__(self):
        return self.comment_text

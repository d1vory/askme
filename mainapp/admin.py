from django.contrib import admin
from .models import MyUser, Answer, Question, Comment
# Register your models here.

admin.site.register([MyUser, Answer,Question,Comment])

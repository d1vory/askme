from django.contrib import admin
from .models import MyUser, Answer, Question
# Register your models here.

admin.site.register([MyUser, Answer,Question])

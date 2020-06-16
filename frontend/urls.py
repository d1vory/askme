from django.urls import path, re_path
from django.views.generic import TemplateView
from . import views


urlpatterns = [
    path('', views.index )
    #re_path(r'^/*', views.index),
]

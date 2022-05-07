from django.contrib import admin
from django.urls import path

from api.views import CreateUserView, UserView

urlpatterns = [
    path("all-users",UserView.as_view()),
    path("signup",CreateUserView.as_view()),
]

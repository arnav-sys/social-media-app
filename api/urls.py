from django.contrib import admin
from django.urls import path

from api.views import CreateRequestView, CreateUserView, Login, RemoveRequestView, UpdateProfileView, UpdateUserView, UserView

urlpatterns = [
    path("all-users",UserView.as_view()),
    path("signup",CreateUserView.as_view()),
    path("login",Login),
    path("update-user",UpdateUserView.as_view()),
    path("update-profile",UpdateProfileView.as_view()),
    path("create-request",CreateRequestView.as_view()),
    path("remove-request", RemoveRequestView.as_view())
]

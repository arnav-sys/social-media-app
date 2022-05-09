from django.contrib import admin
from django.urls import path

from api.views import CreateFriend, CreateRequestView, CreateUserView, Login, RemoveFriend, RemoveRequestView, UpdateProfileView, UpdateUserView, UserView

urlpatterns = [
    path("all-users",UserView.as_view()),
    path("signup",CreateUserView.as_view()),
    path("login",Login),
    path("update-user",UpdateUserView.as_view()),
    path("update-profile",UpdateProfileView.as_view()),
    path("create-request",CreateRequestView.as_view()),
    path("remove-request", RemoveRequestView.as_view()),
    path("create-friend",CreateFriend.as_view()),
    path("remove-friend",RemoveFriend.as_view())
]

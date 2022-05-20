from unittest import addModuleCleanup
from django.contrib import admin
from django.urls import path

from api.views import CreateFriend, CreatePost, CreateRequestView, CreateUserView, DeletePost, GetUserDetails, LikePost, Login, PostId, PostView, RemoveFriend, RemoveRequestView, UpdatePost, UpdateProfileView,  UserView

urlpatterns = [
    path("all-users",UserView.as_view()),
    path("signup",CreateUserView.as_view()),
    path("login",Login),
    path("userid",GetUserDetails.as_view()),
    path("update-profile",UpdateProfileView.as_view()),
    path("create-request",CreateRequestView.as_view()),
    path("remove-request", RemoveRequestView.as_view()),
    path("create-friend",CreateFriend.as_view()),
    path("remove-friend",RemoveFriend.as_view()),
    path("create-post",CreatePost.as_view()),
    path("all-posts",PostView.as_view()),
    path("delete-post",DeletePost.as_view()),
    path("update-post",UpdatePost.as_view()),
    path("like-post",LikePost.as_view()),
    path("postid", PostId),
]

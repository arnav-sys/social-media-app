from ast import For
from glob import glob
from http.client import HTTPResponse
from tkinter import EW
from turtle import pos
from django.shortcuts import HttpResponse
import json

from jinja2 import pass_context
from rest_framework.response import Response
from django.core import serializers
from api.models import Comment, Post, User
import json
from rest_framework.views import APIView
from api.serializers import CommentSerializer, CreateFriendSerializer, CreateRequestSerializer, CreateUserSerializer, PostSerializer,  UpdateUserSerializer, UserSerializer
from rest_framework import generics,status
from rest_framework.parsers import  MultiPartParser
from django.views.decorators.csrf import csrf_exempt

from socialmediapp.settings import BASE_DIR

mainuser = None

# Create your views here.
class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    

class CreateUserView(APIView):
    serializer_class = CreateUserSerializer

    def post(self,request,format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get("username")
            email =  serializer.data.get("email")
            password = serializer.data.get("password")
            user = User(username=username,email=email,password=password)
            user.save()
            return Response(UserSerializer(user).data,status = status.HTTP_201_CREATED)
        
        return Response({"Bad Request":"Data Not Valid"},status=status.HTTP_400_BAD_REQUEST)

class UpdateUserView(APIView):
    serializer_class = UpdateUserSerializer

    def post(self,request,format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get("username")
            email = serializer.data.get("email")
            password = serializer.data.get("password")
            bio = serializer.data.get("bio")
            user = User.objects.get(email=email)
            user.username = username
            user.password = password
            user.bio = bio
            user.save()
            global mainuser
            mainuser = user
            return Response(UserSerializer(user).data,status=status.HTTP_201_CREATED)
        return Response({"Bad Request":"Data Not Valid"},status=status.HTTP_400_BAD_REQUEST)

class UpdateProfileView(APIView):
    parser_classes = [MultiPartParser]

    def put(self,request,format=None):
        file = request.data["file"]
        username = request.data["username"]
        global mainuser
        user = User.objects.get(username=username)
        user.profileimg = file
        user.save()
        mainuser = user
        return Response(UserSerializer(user).data,status=status.HTTP_201_CREATED)

class CreateRequestView(APIView):
    serializer_class = CreateRequestSerializer
    def post(self,request,format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            requests = serializer.data.get("requests")
            username = serializer.data.get("username")
            user = User.objects.get(username=username)
            if user is not None:
                user_re = user.requests
                if user_re == "None":
                    user_re = requests
                else:
                    user_re = user_re + "," + requests
                user_re = str(user_re)
                user.requests = user_re
                user.save()
                return Response({"Success Request":"request created"},status=status.HTTP_201_CREATED)
        
            return Response({"Bad Request":"user not found"},status=status.HTTP_400_BAD_REQUEST)
        return Response({"Bad Request":"Data Not Valid"},status=status.HTTP_400_BAD_REQUEST)   

class RemoveRequestView(APIView):
    serializer_class = CreateRequestSerializer
    def post(self,request,format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get("username")         
            requests = serializer.data.get("requests")
            user = User.objects.get(username=username)
            user_re = user.requests
            user_re = list(user_re.split(","))
            for i in user_re:
                new_user_re = ""
                if i != requests:
                    new_user_re = new_user_re + "," + i
            user.requests = new_user_re
            user.save()
            return Response({"Success Request":"request removed"},status=status.HTTP_201_CREATED)
        return Response({"Bad Request":"Data Not Valid"},status=status.HTTP_400_BAD_REQUEST)   

class CreateFriend(APIView):
    serializer_class =  CreateFriendSerializer
    def post(self,request,format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get("username")
            friends = serializer.data.get("friends")
            user = User.objects.get(username=username)
            friend = User.objects.get(username=friends)
            user_friends = user.friends
            friend_friends = friend.friends
            if user_friends == "None":
                user_friends = friends
            if friend_friends == "None":
                friend_friends = username
            else:
                user_friends = user_friends + "," + friends
                friend_friends = friend_friends + "," + username
            user.friends = user_friends
            user.save()
            friend.friends = friend_friends
            friend.save()
            return Response({"Success Request":"friend created"},status=status.HTTP_201_CREATED)
        return Response({"Bad Request":"Data Not Valid"},status=status.HTTP_400_BAD_REQUEST)   

class RemoveFriend(APIView):
    serializer_class = CreateFriendSerializer
    def post(self,request,format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get("username")    
            friends = serializer.data.get("friends")     
            user = User.objects.get(username=username)
            friend = User.objects.get(username=friends)
            user_re = user.friends
            friend_re = friend.friends
            user_re = list(user_re.split(","))
            friend_re = list(friend_re.split(","))
            new_user_re = ""
            for i in user_re:
                if i != friends:
                    new_user_re = new_user_re + "," + i
            print(new_user_re)
            user.friends = new_user_re
            user.save()
            for i in friend_re:
                new_friend_re = ""
                if i != username:
                    new_friend_re = new_friend_re + "," + i
            friend.friends = new_friend_re
            friend.save()
            return Response({"Success Request":"friend removed"},status=status.HTTP_201_CREATED)
        return Response({"Bad Request":"Data Not Valid"},status=status.HTTP_400_BAD_REQUEST)   

@csrf_exempt
def Login(request):
    if request.method == "POST":
        raw_user = json.loads(request.body)
        username = raw_user["username"]
        password = raw_user["password"]
        print(username)
        user = User.objects.get(username=username)
        if user is not None:
            if user.password == password:
                global mainuser
                mainuser = user
                obj = {
                    "username":user.username,
                    "email":user.email,
                    "password":user.password,
                    "friends":user.friends,
                    "requests":user.requests,
                    "bio":user.bio,
                    "profileimg":user.profileimg
                }
                userj = serializers.serialize("json",[user])
                respo = HttpResponse(userj)
                print(respo)
                return respo
            else:
                return HttpResponse({"Bad Request":"Password not correct"})
        return HttpResponse({"Bad Request":"User Not Found"})
    return HttpResponse({"method not allowed"})
        
class CreatePost(APIView):
    parser_classes = [MultiPartParser]
    def put(self,request,format=None):
        img = request.data["img"]
        caption = request.data["caption"]
        username = request.data["username"]
        user = User.objects.get(username=username)
        if user:
            print("ok")
        post = Post(img=img,caption=caption,user=user,likes=0,username
        =username)
        post.save()
        comment = Comment(caption="first-comment",user=user,post=post)
        comment.save()
        return Response(PostSerializer(post).data,status=status.HTTP_201_CREATED)
        

class PostView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class DeletePost(APIView):
    def delete(self,request,format=None):
        id = request.data["id"]
        post = Post.objects.get(id=id)
        post.delete()
        return Response({"Success":"Post Deleted"})

class UpdatePost(APIView):
    parser_classes = [MultiPartParser]
    def put(self,request,format=None):
        img = request.data["img"]
        caption = request.data["caption"]
        id = request.data["id"]
        post  = Post.objects.get(id=id)
        post.img = img
        post.caption = caption
        post.save()
        return Response(PostSerializer(post).data,status=status.HTTP_201_CREATED)
 
class LikePost(APIView):
    def post(self,request,format=None):
        id = request.data["id"]
        m = request.data["m"]
        post = Post.objects.get(id=id)
        if m=="t":
            post.likes = post.likes-1
            post.save()
        else:
            post.likes = post.likes + 1
            post.save()
        return Response(PostSerializer(post).data,status=status.HTTP_201_CREATED)

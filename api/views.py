from http.client import HTTPResponse
from django.shortcuts import render
from rest_framework.response import Response
from api.models import User
from rest_framework.views import APIView
from api.serializers import CreateUserSerializer, UserSerializer
from rest_framework import generics,status

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

from ast import For
from glob import glob
from http.client import HTTPResponse
from django.shortcuts import HttpResponse
import json
from rest_framework.response import Response
from api.models import User
import json
from rest_framework.views import APIView
from api.serializers import CreateRequestSerializer, CreateUserSerializer,  UpdateUserSerializer, UserSerializer
from rest_framework import generics,status
from rest_framework.parsers import FileUploadParser, FormParser, MultiPartParser
from django.views.decorators.csrf import csrf_exempt

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
            profileimg = serializer.data.get("profileimg")
            user = User.objects.get(email=email)
            user.username = username
            user.password = password
            user.bio = bio
            user.profileimg = profileimg
            print(profileimg)
            print(username)
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
        print(file)
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
                    print("ok")
                    user_re = requests
                else:
                    user_re = user_re + "," + requests
                print(user_re)
                user_re = str(user_re)
                print(user_re)
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
            print(user)
            user_re = user.requests
            user_re = list(user_re.split(","))
            print(user_re)
            for i in user_re:
                new_user_re = ""
                print(i)
                if i != requests:
                    new_user_re = new_user_re + "," + i
            print(new_user_re)
            user.requests = new_user_re
            user.save()
            return Response({"Success Request":"request removed"},status=status.HTTP_201_CREATED)
        return Response({"Bad Request":"Data Not Valid"},status=status.HTTP_400_BAD_REQUEST)   


@csrf_exempt
def Login(request):
    if request.method == "POST":
        raw_user = json.loads(request.body)
        username = raw_user["username"]
        password = raw_user["password"]
        user = User.objects.get(username=username)
        if user is not None:
            if user.password == password:
                global mainuser
                mainuser = user
                print(user.id)
                respo = HttpResponse(str(UserSerializer(user).data))
                print(respo)
                print(UserSerializer(user).data)
                return respo
            else:
                return HttpResponse({"Bad Request":"Password not correct"})
        return HttpResponse({"Bad Request":"User Not Found"})
        

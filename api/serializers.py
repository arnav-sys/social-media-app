from api.models import Post, User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id","username","email","password","friends","requests","bio","profileimg")

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username","email","password")

class UpdateUserSerializer(serializers.ModelSerializer):
    email = serializers.CharField(validators=[])
    username = serializers.CharField(validators=[])
    class Meta:
        model = User
        fields = ("username","password","email","bio")


class CreateRequestSerializer(serializers.ModelSerializer):
    username = serializers.CharField(validators=[])
    class Meta:
        model = User
        fields = ("requests","username")
    
class CreateFriendSerializer(serializers.ModelSerializer):
    username = serializers.CharField(validators=[])
    class Meta:
        model = User
        fields = ("friends","username")

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ("id","user","caption","img","likes")


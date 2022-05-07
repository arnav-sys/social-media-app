from api.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id","username","email","password","friends","requests","bio","profileimg")

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username","email","password")
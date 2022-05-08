from django.db import models


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=25, unique=True)
    email = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=30)
    bio = models.CharField(max_length=150,default="No Bio")
    profileimg = models.ImageField(upload_to ="imgs",max_length=254,)
    friends = models.TextField(max_length=1000000000,default="")
    requests = models.TextField(max_length=1000000000,default="")
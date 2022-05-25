from distutils.command.upload import upload
from importlib.metadata import requires
from pyexpat import model
from unittest.util import _MAX_LENGTH
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

class Post(models.Model):
    username = models.CharField(max_length=25)
    caption = models.CharField(max_length=250)
    img = models.ImageField(upload_to = "imgs",max_length=254)
    likes = models.IntegerField()

class Comment(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    username = models.CharField(max_length=25,default="no")
    caption = models.CharField(max_length=250)
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
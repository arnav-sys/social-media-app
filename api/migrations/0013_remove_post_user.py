# Generated by Django 4.0.4 on 2022-05-25 07:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_comment_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='user',
        ),
    ]

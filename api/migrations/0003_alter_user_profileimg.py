# Generated by Django 4.0.4 on 2022-05-07 07:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_user_bio_alter_user_friends_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profileimg',
            field=models.ImageField(default='./imgs/default-img.png', upload_to='imgs'),
        ),
    ]

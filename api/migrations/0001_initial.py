# Generated by Django 4.0.4 on 2022-05-07 06:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=25, unique=True)),
                ('email', models.CharField(max_length=50, unique=True)),
                ('password', models.CharField(max_length=30)),
                ('bio', models.CharField(max_length=150)),
                ('profileimg', models.ImageField(upload_to='uploads')),
                ('friends', models.TextField(max_length=1000000000)),
                ('requests', models.TextField(max_length=1000000000)),
            ],
        ),
    ]

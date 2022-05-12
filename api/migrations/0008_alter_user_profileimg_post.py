# Generated by Django 4.0.4 on 2022-05-12 05:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_user_profileimg'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profileimg',
            field=models.ImageField(max_length=254, upload_to='imgs'),
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('caption', models.CharField(max_length=250)),
                ('img', models.ImageField(max_length=254, upload_to='imgs')),
                ('likes', models.IntegerField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
    ]

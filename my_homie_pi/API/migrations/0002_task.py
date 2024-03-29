# Generated by Django 3.2 on 2021-04-19 08:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_ID', models.IntegerField(default=0)),
                ('task_type', models.CharField(default=None, max_length=20)),
                ('name', models.CharField(default=None, max_length=20, unique=True)),
                ('start_date', models.DateTimeField(auto_now_add=True)),
                ('end_date', models.DateTimeField(default=None)),
            ],
        ),
    ]

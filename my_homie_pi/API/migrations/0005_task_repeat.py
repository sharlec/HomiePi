# Generated by Django 3.2 on 2021-08-13 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0004_task_week'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='repeat',
            field=models.IntegerField(default='1', max_length=7),
        ),
    ]
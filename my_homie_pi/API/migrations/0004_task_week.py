# Generated by Django 3.2 on 2021-08-13 08:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0003_user_gender'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='week',
            field=models.CharField(default='1111111', max_length=7),
        ),
    ]

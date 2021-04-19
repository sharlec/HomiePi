from django.db import models

# Create your models here.
class user(models.Model):

    GENDER_CHOICES = (
        (u'M', u'Male'),
        (u'F', u'Female'),
    )
    name = models.CharField(max_length=20, unique=True,null=False, default=None)
    gender = models.CharField(max_length=2, choices=GENDER_CHOICES,default="M")
    age = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)


class task(models.Model):
    user_ID = models.IntegerField(null=False, default=0)
    task_type = models.CharField(max_length=20, unique=False,null=False, default=None)
    name = models.CharField(max_length=20, unique=True,null=False, default=None)
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(default=None)

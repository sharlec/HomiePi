from django.db import models
from django.contrib.auth.models import User
# Create your models here.
# class user(models.Model):
#
#     name = models.CharField(max_length=20, unique=True,null=False, default=None)
# ?    password = models.CharField(max_length=32, default = None)

class UserProfile(models.Model):
    GENDER_CHOICES = (
        (u'M', u'Male'),
        (u'F', u'Female'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    gender = models.CharField(max_length=2, choices=GENDER_CHOICES)
    mod_date = models.DateTimeField('Last modified', auto_now=True)
    age = models.IntegerField(null=False, default=1)

    class Meta:
        verbose_name = 'User profile'

    def __str__(self):
        # return self.user.__str__()
        return "{}".format(self.user.__str__())

class task(models.Model):
    user_ID = models.IntegerField(null=False, default=0)
    name = models.CharField(max_length=20, unique=True,null=False, default=None)
    week = models.CharField(max_length=7, unique=False, null=False, default= "0000000")
    repeat = models.IntegerField(max_length=7, unique=False, null=False, default="1")
    start_date = models.DateTimeField(auto_now_add=True)

class record(models.Model):
    user_ID = models.IntegerField(null=False)
    task_ID = models.IntegerField(null=False)
    task_name = models.CharField(max_length=20, null=False, default=None)
    complete = models.IntegerField(null=False, default = 0)
    repeat = models.IntegerField(null = False, default = 0)
    date = models.DateField(auto_now_add = True)

    class Meta:
        unique_together = ('user_ID', 'task_ID', 'date')

# class record(models.Model):
#     user_ID = models.IntegerField(null=False, default=0)
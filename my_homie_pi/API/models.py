from django.db import models

# Create your models here.
class user(models.Model):
    name = models.CharField(max_length=20, unique=True,null=False, default=None)
    age = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
from rest_framework import serializers
from .models import user


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ('id','name','age','created_at')

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ('name','age')

        # name = models.CharField(max_length=20, unique=True, null=False, default=None)
        # age = models.IntegerField(null=False, default=1)
        # created_at = models.DateTimeField(auto_now_add=True)
from rest_framework import serializers
from .models import user,task


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ('id','name','age','gender','created_at')

class taskSerializer(serializers.ModelSerializer):
    class Meta:
        model = task
        fields = ('id','user_ID','repeat','name','week','start_date')

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ('name','age','gender')

class CreateTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = task
        fields = ('user_ID', 'repeat', 'name', 'week')

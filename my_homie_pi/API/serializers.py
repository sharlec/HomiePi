from rest_framework import serializers
from .models import UserProfile,task,record
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'password','username', 'created',)

    def create(self, validated_data):

        # create user
        user = User.objects.create(
            url = validated_data['url'],
            email = validated_data['email'],
            # etc ...
        )

        profile_data = validated_data.pop('profile')
        # create profile
        profile = Profile.objects.create(
            user = user
            first_name = profile_data['first_name'],
            last_name = profile_data['last_name'],
            # etc...
        )

        return user

class taskSerializer(serializers.ModelSerializer):
    class Meta:
        model = task
        fields = ('id','user_ID','repeat','name','week','start_date')

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name','age','gender')

class CreateTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = task
        fields = ('user_ID', 'repeat', 'name', 'week')

class recordSerializer(serializers.ModelSerializer):
    class Meta:
        model = record
        fields = '__all__'

from rest_framework import serializers
from .models import UserProfile,task,record
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('gender', 'age')

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=True)
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'profile', 'password','is_active')

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')

        # create user
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            is_active = True
        )

        # create profile
        profile = UserProfile.objects.create(
            user = user,
            gender = profile_data['gender'],
            age = profile_data['age'],
        )
        return user

class taskSerializer(serializers.ModelSerializer):
    class Meta:
        model = task
        fields = ('id','user_ID','repeat','name','week','start_date')
        def create(self, validated_data):
            # create user
            task = Task.objects.create_user(
                # username=validated_data['username'],
                user_ID=validated_data['user_ID'],
                repeat= validated_data['repeat'],
                week= validated_data['week'],
            )
            return task

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

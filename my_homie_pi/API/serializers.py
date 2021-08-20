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
        fields = ('first_name', 'last_name', 'username', 'profile', 'password')

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')

        # create user
        user = User.objects.create(
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            username = validated_data['username'],
            password = validated_data['password'],
            # profile = validated_data['profile'],
        )

        # create profile
        profile = UserProfile.objects.create(
            user = user,
            gender = profile_data['gender'],
            age = profile_data['age'],
        )
        return user


class loginSerializer(serializers.Serializer):
    # username = serializers.CharField(max_length=255)
    # password = serializers.CharField(
    #     label=("Password"),
    #     style={'input_type': 'password'},
    #     trim_whitespace=False,
    #     max_length=128,
    #     write_only=True
    # )
    class Meta:
        model = User
        fields = ('username', 'password')


    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)
            if not user:
                msg = ('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = ('Must include "username" and "password".')
            raise serializers.ValidationError(msg, code='authorization')

        data['user'] = user
        return data



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

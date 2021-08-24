from django.shortcuts import render
from rest_framework import generics, status, permissions
from .serializers import UserSerializer,CreateUserSerializer, taskSerializer, CreateTaskSerializer, recordSerializer
from .models import UserProfile, task, record
from rest_framework.views import APIView
from rest_framework.response import Response
import datetime
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view
from django.contrib import auth
from rest_framework import permissions
from django.http import HttpResponse
from django.conf import settings
from rest_framework_simplejwt import authentication
from django.core import serializers
import json
import datetime



def index(request):
    return render(request,"index.html")

class userView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = (permissions.AllowAny, )
    # this is for registration
    def post(self, request, format = None):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TestView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (authentication.JWTAuthentication,)
    def get(self, request, *args, **kwargs):
        # print(self.authentication_classes.get_user().username)
        return Response('ok')

class recordView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = record.objects.all()
    serializer_class = recordSerializer
    # serializer = self.serializer_class(data=request.data)

class dashBoardView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (authentication.JWTAuthentication,)
    def get(self, request, *args, **kwargs):
        JWT_authenticator = authentication.JWTAuthentication()
        response = JWT_authenticator.authenticate(request)
        user, token = response

        taskset  = task.objects.filter(user_ID = user.id)
        task_list = list(taskset.values())

        now = datetime.datetime.now()
        today_date = now.strftime("%Y-%m-%d")
        recordset = record.objects.filter(user_ID =user.id, date = today_date)
        record_list = list(recordset.values())

        data = {'user_ID' : user.id,
                'username': user.username,
                'age': user.profile.age,
                'gender': user.profile.gender,
                'task_list': task_list,
                'record_list' : record_list}

        return Response(data, status = status.HTTP_200_OK)

class taskView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (authentication.JWTAuthentication,)
    # queryset = task.objects.all()
    serializer_class = taskSerializer

    def post(self, request, format = None):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format = None):
        JWT_authenticator = authentication.JWTAuthentication()
        response = JWT_authenticator.authenticate(request)
        # user, token = response
        # print(user.ID)
        queryset  = task.objects.filter(user_ID= 1)
        # data = serializers.serialize('json', list(queryset))
        dict1 = {}
        obj = list(queryset.values())
        print(obj)
        dict1['data'] = obj

        return Response(obj)


        # return queryset



# class createTaskView(APIView):
#     # permission_classes = [permissions.IsAuthenticated]
#     authentication_classes = (authentication.JWTAuthentication,)
#     serializer_class = CreateTaskSerializer
#     queryset = task.objects.all()
#
#
#     def post(self, request, format=None):
#         # JWT_authenticator = authentication.JWTAuthentication()
#         # response = JWT_authenticator.authenticate(request)
#         # user, token = response
#
#         # serializer = self.serializer_class(data=request.data)
#         serializer = self.serializer_class(data = request.data)
#         # username =  user.username
#         # print(username)
#         # print(serializer.data.get('name'))
#         if serializer.is_valid():
#             user_ID = serializer.data.get('user_ID')
#             name = serializer.data.get('name')
#             repeat = serializer.data.get('repeat')
#             week = serializer.data.get('week')
#             queryset = task.objects.filter(name=name,user_ID = user_ID)
#             if queryset.exists():
#                 print("already exists")
#                 # new_user.save()
#                 return Response(UserSerializer(new_task).data, status=status.HTTP_200)
#             else:
#                 new_task = task(user_ID=user_ID,name=name, repeat = repeat, week = week)
#                 new_task.save()
#                 return Response(UserSerializer(new_task).data, status=status.HTTP_201_CREATED)
#         # return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response("OK")


# class getUser(APIView):
#     serializer_class = UserSerializer
#     look_url_kwarg = 'user_ID'
#
#     def get(self,request,format=None):
#         user_ID = request.GET.get(self.look_url_kwarg)
#         if user_ID != None:
#             queryset = user.objects.filter(user_ID = user_ID)
#             if len(queryset) > 0:
#                 data = userSerializer(queryset[0]).data
#                 # data['age']
#                 # data['is_host'] = self.request.session.session_key == user_name
#                 return Response(data, status=status.HTTP_200_OK)
#             return Response({'Bad Request': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
#         return Response({'Bad Request': 'code parameters not found'}, status=status.HTTP_400_BAD_REQUEST)
#
# class getUserTask(APIView):
#     serializer_class = taskSerializer
#     look_url_kwarg = 'user_name'
#
#     def get(self,request,format=None):
#         user_name = request.GET.get(self.look_url_kwarg)
#         if user_name != None:
#             queryset = user.objects.filter(name = user_name)
#             if len(queryset) > 0:
#                 data = taskSerializer(queryset[0]).data
#                 # data['age']
#                 # data['is_host'] = self.request.session.session_key == user_name
#                 return Response(data, status=status.HTTP_200_OK)
#             return Response({'Bad Request': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
#         return Response({'Bad Request': 'code parameters not found'}, status=status.HTTP_400_BAD_REQUEST)
#
# class taskView(generics.ListAPIView):
#         queryset = task.objects.all()
#         serializer_class = taskSerializer
#
# class getUserRecord(generics.ListAPIView):
#     serializer_class = taskSerializer
#     look_url_kwarg = 'user_ID'
#     record = record
#
#     def get_queryset(self):
#         today_min = datetime.datetime.combine(datetime.date.today(), datetime.time.min)
#         today_max = datetime.datetime.combine(datetime.date.today(), datetime.time.max)
#         return self.record.objects.filter(user_ID=self.request.GET.get(self.look_url_kwarg), date__range=(today_min, today_max))
#
#     def get(self,request,format=None):
#             data = recordSerializer(self.get_queryset(), many = True).data
#             return Response(data,status=status.HTTP_200_OK)
#
#         #     if len(queryset) > 0:
#         #         serializer = (queryset, many=True)
#         #         data = serializer.data
#         #         # data['age']
#         #         # data['is_host'] = self.request.session.session_key == user_name
#         #         return Response(data, status=status.HTTP_200_OK)
#         #     return Response({'Bad Request': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
#         # return Response({'Bad Request': 'code parameters not found'}, status=status.HTTP_400_BAD_REQUEST)

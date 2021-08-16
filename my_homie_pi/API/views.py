from django.shortcuts import render
from rest_framework import generics, status
from .serializers import userSerializer,CreateUserSerializer, taskSerializer, CreateTaskSerializer, recordSerializer
from .models import user, task, record
from  rest_framework.views import APIView
from rest_framework.response import Response
import datetime
# from drf_multiple_model.views import ObjectMultipleModelAPIView


# Create your views here.
from django.http import HttpResponse    # 引用HttpResponse类
# Create your views here.
def index(request):
    return render(request,"index.html")

class userView(generics.ListAPIView):
    queryset = user.objects.all()
    serializer_class = userSerializer

class recordView(generics.ListAPIView):
    queryset = record.objects.all()
    serializer_class = recordSerializer

class createUserView(APIView):
    serializer_class = CreateUserSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            age = serializer.data.get('age')
            queryset = user.objects.filter(name=name)
            if queryset.exists():
                print("already exists")
                new_user = user(name=name, age=age)
                # new_user.save()
                return Response(userSerializer(new_user).data, status=status.HTTP_200)
            else:
                new_user = user(name = name,age=age)
                new_user.save()
                return Response(userSerializer(new_user).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class taskView(generics.ListAPIView):
        queryset = task.objects.all()
        serializer_class = taskSerializer


class createTaskView(APIView):
    serializer_class = CreateTaskSerializer
    def post(self, request, format=None):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            user_ID = serializer.data.get('user_ID')
            name = serializer.data.get('name')
            repeat = serializer.data.get('repeat')
            week = serializer.data.get('week')
            queryset = task.objects.filter(name=name,user_ID = user_ID)
            if queryset.exists():
                print("already exists")
                # new_user.save()
                return Response(userSerializer(new_task).data, status=status.HTTP_200)
            else:
                new_task = task(user_ID=user_ID,name=name, repeat = repeat, week = week)
                new_task.save()
                return Response(userSerializer(new_task).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class getUser(APIView):
    serializer_class = userSerializer
    look_url_kwarg = 'user_name'

    def get(self,request,format=None):
        user_name = request.GET.get(self.look_url_kwarg)
        if user_name != None:
            queryset = user.objects.filter(name = user_name)
            if len(queryset) > 0:
                data = userSerializer(queryset[0]).data
                # data['age']
                # data['is_host'] = self.request.session.session_key == user_name
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Bad Request': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'code parameters not found'}, status=status.HTTP_400_BAD_REQUEST)

class getUserTask(APIView):
    serializer_class = taskSerializer
    look_url_kwarg = 'user_name'

    def get(self,request,format=None):
        user_name = request.GET.get(self.look_url_kwarg)
        if user_name != None:
            queryset = user.objects.filter(name = user_name)
            if len(queryset) > 0:
                data = taskSerializer(queryset[0]).data
                # data['age']
                # data['is_host'] = self.request.session.session_key == user_name
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Bad Request': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'code parameters not found'}, status=status.HTTP_400_BAD_REQUEST)

class getUserRecord(generics.ListAPIView):
    serializer_class = taskSerializer
    look_url_kwarg = 'user_ID'
    record = record

    def get_queryset(self):
        today_min = datetime.datetime.combine(datetime.date.today(), datetime.time.min)
        today_max = datetime.datetime.combine(datetime.date.today(), datetime.time.max)
        return self.record.objects.filter(user_ID=self.request.GET.get(self.look_url_kwarg), date__range=(today_min, today_max))

    def get(self,request,format=None):
        # user_ID = request.GET.get(self.look_url_kwarg)

            # return Response(), status=status.HTTP_200_OK)
            # queryset = self.get_queryset()
            data = recordSerializer(self.get_queryset(), many = True).data
            # queryset = [
            #     {'queryset': self.get_queryset(),
            #      'serializer_class': recordSerializer}]
            return Response(data,status=status.HTTP_200_OK)

        #     if len(queryset) > 0:
        #         serializer = (queryset, many=True)
        #         data = serializer.data
        #         # data['age']
        #         # data['is_host'] = self.request.session.session_key == user_name
        #         return Response(data, status=status.HTTP_200_OK)
        #     return Response({'Bad Request': 'user not found'}, status=status.HTTP_404_NOT_FOUND)
        # return Response({'Bad Request': 'code parameters not found'}, status=status.HTTP_400_BAD_REQUEST)

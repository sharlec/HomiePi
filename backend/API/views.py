from django.shortcuts import render, redirect
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
from .updateRecord import recordUpdate
from django.utils import timezone
import secrets
from .models import AddTaskToken, AddUserToken



def index(request):
    return render(request,"index.html")

def add_task_qr_page(request):
    user_id = request.GET.get("user_id")
    user = None
    if user_id:
        user = User.objects.filter(id=user_id).first()

    token_value = secrets.token_urlsafe(16)
    expires_at = timezone.now() + datetime.timedelta(minutes=10)
    AddTaskToken.objects.create(user=user, token=token_value, expires_at=expires_at)

    mobile_url = request.build_absolute_uri(f"/m/add-task?token={token_value}")

    return render(request, "api/add_task_qr.html", {
        "mobile_url": mobile_url,
        "expires_at": expires_at,
    })

def mobile_add_task(request):
    token_value = request.GET.get("token") or request.POST.get("token")
    if not token_value:
        return render(request, "api/mobile_add_task.html", {"error": "Missing token."})

    token_obj = AddTaskToken.objects.filter(token=token_value).first()
    if not token_obj or not token_obj.is_valid():
        return render(request, "api/mobile_add_task.html", {"error": "Token expired or invalid."})

    users = list(User.objects.all().order_by("id"))
    palette = ["#f97316", "#3b82f6", "#10b981", "#f43f5e", "#a855f7", "#0ea5e9"]
    user_cards = []
    for idx, user in enumerate(users):
        initials = user.username[:2].upper()
        user_cards.append({
            "id": user.id,
            "username": user.username,
            "initials": initials or "U",
            "color": palette[idx % len(palette)],
        })

    if request.method == "POST":
        name = (request.POST.get("name") or "").strip()
        repeat = request.POST.get("repeat") or "1"
        week_days = request.POST.getlist("week")
        user_id = token_obj.user.id if token_obj.user else request.POST.get("user_id")

        if not user_id:
            return render(request, "api/mobile_add_task.html", {
                "error": "Please select a user.",
                "token": token_value,
                "users": user_cards,
                "token_user": token_obj.user,
            })

        if not name:
            return render(request, "api/mobile_add_task.html", {
                "error": "Task name is required.",
                "token": token_value,
                "users": user_cards,
                "token_user": token_obj.user,
            })

        try:
            repeat = int(repeat)
            if repeat < 1:
                repeat = 1
        except ValueError:
            repeat = 1

        week = "".join(sorted(set(week_days))) if week_days else "0123456"

        if task.objects.filter(user_ID=int(user_id), name=name).exists():
            return render(request, "api/mobile_add_task.html", {
                "error": "Task already exists for this user.",
                "token": token_value,
                "users": user_cards,
                "token_user": token_obj.user,
            })

        new_task = task(user_ID=int(user_id), name=name, repeat=repeat, week=week)
        new_task.save()
        recordUpdate()
        token_obj.used = True
        token_obj.used_at = timezone.now()
        token_obj.save(update_fields=["used", "used_at"])

        return render(request, "api/mobile_add_task.html", {"success": True})

    return render(request, "api/mobile_add_task.html", {
        "token": token_value,
        "users": user_cards,
        "token_user": token_obj.user,
        "no_users": len(users) == 0,
    })

def add_user_qr_page(request):
    token_value = secrets.token_urlsafe(16)
    expires_at = timezone.now() + datetime.timedelta(minutes=10)
    AddUserToken.objects.create(token=token_value, expires_at=expires_at)
    mobile_url = request.build_absolute_uri(f"/m/register?token={token_value}")
    return render(request, "api/add_user_qr.html", {
        "mobile_url": mobile_url,
        "expires_at": expires_at,
    })

def mobile_register(request):
    token_value = request.GET.get("token") or request.POST.get("token")
    if not token_value:
        return render(request, "api/mobile_register.html", {"error": "Missing token."})

    token_obj = AddUserToken.objects.filter(token=token_value).first()
    if not token_obj or not token_obj.is_valid():
        return render(request, "api/mobile_register.html", {"error": "Token expired or invalid."})

    avatars = [
        {"key": "😀"},
        {"key": "😺"},
        {"key": "🐼"},
        {"key": "🍀"},
        {"key": "⭐️"},
        {"key": "🌊"},
    ]

    if request.method == "POST":
        name = (request.POST.get("name") or "").strip()
        age = request.POST.get("age") or "1"
        avatar = request.POST.get("avatar") or "sunset"
        if not name:
            return render(request, "api/mobile_register.html", {
                "error": "Name is required.",
                "token": token_value,
                "avatars": avatars,
            })
        try:
            age = int(age)
            if age < 1:
                age = 1
        except ValueError:
            age = 1

        if User.objects.filter(username=name).exists():
            return render(request, "api/mobile_register.html", {
                "error": "User already exists.",
                "token": token_value,
                "avatars": avatars,
            })

        user = User.objects.create(username=name)
        user.set_unusable_password()
        user.save()
        UserProfile.objects.create(user=user, gender="M", age=age, avatar=avatar)
        token_obj.used = True
        token_obj.used_at = timezone.now()
        token_obj.save(update_fields=["used", "used_at"])
        return render(request, "api/mobile_register.html", {"success": True})

    return render(request, "api/mobile_register.html", {
        "token": token_value,
        "avatars": avatars,
    })

@api_view(['GET'])
def kiosk_user_list(request):
    users = User.objects.all().order_by("id")
    data = []
    for u in users:
        avatar = None
        if hasattr(u, "profile"):
            avatar = u.profile.avatar
        data.append({"id": u.id, "username": u.username, "avatar": avatar})
    return Response(data, status=status.HTTP_200_OK)

@api_view(['GET'])
def kiosk_dashboard(request):
    user_id = request.GET.get("user_id")
    if not user_id:
        return Response({"detail": "user_id is required."}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.filter(id=user_id).first()
    if not user:
        return Response(status=status.HTTP_404_NOT_FOUND)

    taskset = task.objects.filter(user_ID=user.id)
    task_list = list(taskset.values())

    now = datetime.datetime.now()
    today_date = now.strftime("%Y-%m-%d")
    recordset = record.objects.filter(user_ID=user.id, date=today_date)
    record_list = list(recordset.values())

    data = {
        "user_ID": user.id,
        "username": user.username,
        "task_list": task_list,
        "record_list": record_list,
    }
    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
def kiosk_record_update(request):
    record_id = request.data.get("record_id")
    user_id = request.data.get("user_id")
    complete = request.data.get("complete")

    if not record_id or not user_id or complete is None:
        return Response(
            {"detail": "record_id, user_id, and complete are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    entry = record.objects.filter(id=record_id, user_ID=user_id).first()
    if not entry:
        return Response(status=status.HTTP_404_NOT_FOUND)

    try:
        complete = int(complete)
    except (TypeError, ValueError):
        return Response({"detail": "complete must be an integer."}, status=status.HTTP_400_BAD_REQUEST)

    if complete < 0:
        complete = 0
    if complete > entry.repeat:
        complete = entry.repeat

    entry.complete = complete
    entry.save(update_fields=["complete"])
    return Response(recordSerializer(entry).data, status=status.HTTP_200_OK)

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

class logoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.JWTAuthentication,)

    def post(self, request, *args, **kwargs):
        return Response(status=status.HTTP_204_NO_CONTENT)

class recordView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.JWTAuthentication,)

    def get(self, request, *args, **kwargs):
        queryset = record.objects.filter(user_ID=request.user.id)
        serializer = recordSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        record_id = request.data.get("record_id")
        complete = request.data.get("complete")
        if record_id is None or complete is None:
            return Response(
                {"detail": "record_id and complete are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            entry = record.objects.get(id=record_id, user_ID=request.user.id)
        except record.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            complete = int(complete)
        except (TypeError, ValueError):
            return Response(
                {"detail": "complete must be an integer."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if complete < 0:
            complete = 0
        if complete > entry.repeat:
            complete = entry.repeat

        entry.complete = complete
        entry.save(update_fields=['complete'])
        return Response(recordSerializer(entry).data, status=status.HTTP_200_OK)

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
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.JWTAuthentication,)
    queryset = task.objects.all()
    serializer_class = taskSerializer

    def get(self, request, format = None):
        queryset = task.objects.filter(user_ID=request.user.id)
        obj = list(queryset.values())
        return Response(obj, status=status.HTTP_200_OK)

    def post(self, request, format = None):
        name = request.data.get("name")
        repeat = request.data.get("repeat")
        week = request.data.get("week")
        if not name or repeat is None or week is None:
            return Response(
                {"detail": "name, repeat, and week are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        taskset  = task.objects.filter(name=name, user_ID=request.user.id)
        if taskset.exists():
            print("already exist")
            return Response( status=status.HTTP_409_Conflict)
        else:
            print("new task created")
            user_ID = request.user.id
            print(request.data)
            new_task = task(user_ID=user_ID,name=name, repeat = repeat, week = week)
            new_task.save()
            recordUpdate()
            return Response(status=status.HTTP_201_CREATED)

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

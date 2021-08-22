from django.shortcuts import render
from rest_framework import generics, status
from .serializers import UserSerializer,CreateUserSerializer, taskSerializer, CreateTaskSerializer, recordSerializer
from .models import UserProfile, task, record
from  rest_framework.views import APIView
from rest_framework.response import Response
import datetime
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view
from django.contrib import auth
from rest_framework import permissions
from django.http import HttpResponse

from django.conf import settings
from jose import jwt
from rest_framework import permissions
from django.conf import settings

from rest_framework_simplejwt import authentication


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


class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request, format=None):
        data = self.request.data
        username = data['username']
        password = data['password']
        try:
            print('21')
            c = User.objects.all().filter(username=username, password =password)
            print('d')
            # print(c[0].username)
            user = auth.authenticate(request, username=username, password=password)
            print(user.id)
            if user is not None:
                print("here")
                data = {"user_id": user.id,
                        "exp": datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)}
                # token = jwt.encode(data, settings.JWT_SECRET_KEY, algorithm=settings.ALGORITHM)
                # print(token)
                # return Response({
                #     "user": UserSerializer(user, context=self.get_serializer_context()).data,
                #     "token": AuthToken.objects.create(user)[1]
                # })
                # auth.login(request, user)
                print(user.username)
                # # Redirect to a success page.
                # return Response(status=status.HTTP_201_CREATED)
                return Response({ 'success': 'User authenticated' })
                # return redirect("./user")
            else:
                print('o huo')
                return Response({ 'error': 'Error Authenticating' })
        except:
            return Response({ 'error': 'Something went wrong when logging in' })


class TestView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = (authentication.JWTAuthentication,)
    def get(self, request, *args, **kwargs):
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
        return Response('ok')

# class createUserView(APIView):
#     serializer_class = CreateUserSerializer
#     def post(self, request, format=None):
#         serializer = self.serializer_class(data = request.data)
#         if serializer.is_valid():
#             name = serializer.data.get('name')
#             age = serializer.data.get('age')
#             queryset = user.objects.filter(name=name)
#             if queryset.exists():
#                 print("already exists")
#                 new_user = user(name=name, age=age)
#                 # new_user.save()
#                 return Response(UserSerializer(new_user).data, status=status.HTTP_200)
#             else:
#                 new_user = user(name = name,age=age)
#                 new_user.save()
#                 return Response(UserSerializer(new_user).data, status=status.HTTP_201_CREATED)
#         return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)



# class createTaskView(APIView):
#     serializer_class = CreateTaskSerializer
#     def post(self, request, format=None):
#         serializer = self.serializer_class(data = request.data)
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
#         return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
#
#
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

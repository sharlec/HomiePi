from django.shortcuts import render
from rest_framework import generics, status
from .serializers import UserSerializer,CreateUserSerializer, taskSerializer, CreateTaskSerializer, recordSerializer
from .models import UserProfile, task, record
from  rest_framework.views import APIView
from rest_framework.response import Response
import datetime
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

# Create your views here.
from django.http import HttpResponse    # 引用HttpResponse类
# Create your views here.
def index(request):
    return render(request,"index.html")


# @login_required
# def profile(request, pk):
#     user = get_object_or_404(User, pk=pk)
#     return render(request, 'users/profile.html', {'user': user})

class userView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, format = None):
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
                # new_user.save()
                return Response(userSerializer(new_user).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

# class recordView(generics.ListAPIView):
#     queryset = record.objects.all()
#     serializer_class = recordSerializer
#     serializer = self.serializer_class(data=request.data)



def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            email = form.cleaned_data['email']
            password = form.cleaned_data['password2']

            # 使用内置User自带create_user方法创建用户，不需要使用save()
            user = User.objects.create_user(username=username, password=password, email=email)

            # 如果直接使用objects.create()方法后不需要使用save()
            user_profile = UserProfile(user=user)
            user_profile.save()

            return HttpResponseRedirect("/accounts/login/")
    else:
        form = RegistrationForm()
    return render(request, 'users/registration.html', {'form': form})


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
                return Response(UserSerializer(new_user).data, status=status.HTTP_200)
            else:
                new_user = user(name = name,age=age)
                new_user.save()
                return Response(UserSerializer(new_user).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

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

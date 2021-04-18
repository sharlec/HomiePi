from django.shortcuts import render
from rest_framework import generics, status
from .serializers import userSerializer,CreateUserSerializer
from .models import user
from  rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.
from django.http import HttpResponse    # 引用HttpResponse类
# Create your views here.
def index(request):
    return render(request,"index.html")

class userView(generics.ListAPIView):
    queryset = user.objects.all()
    serializer_class = userSerializer

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

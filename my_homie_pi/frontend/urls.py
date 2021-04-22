from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('profile/<str:user_name>',index),
    path('task',index),
    path('register',index)
    ]
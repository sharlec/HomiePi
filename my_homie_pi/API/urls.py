
from django.urls import path
from .views import userView, createUserView, taskView, getUser

urlpatterns = [
    path('home', userView.as_view()),
    path('task', taskView.as_view()),
    path('create-user', createUserView.as_view()),
    path('get-user', getUser.as_view())
]


from django.urls import path
from .views import userView, createUserView, taskView

urlpatterns = [
    path('home', userView.as_view()),
    path('task', taskView.as_view()),
    path('create-user', createUserView.as_view())
]

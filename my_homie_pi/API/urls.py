
from django.urls import path
from .views import userView, createUserView

urlpatterns = [
    path('home', userView.as_view()),
    path('create-user', createUserView.as_view())
]

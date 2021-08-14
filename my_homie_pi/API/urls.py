
from django.urls import path
from .views import userView, createUserView, taskView, getUser,getUserTask, createTaskView

urlpatterns = [
    path('home', userView.as_view()),
    path('task', taskView.as_view()),
    path('create-user', createUserView.as_view()),
    path('create-task', createTaskView.as_view()),
    path('get-user', getUser.as_view()),
    path('get-user-task',getUserTask.as_view())
]


from django.urls import path
from .views import userView, createUserView, taskView, getUser,getUserTask, createTaskView, recordView, getUserRecord

urlpatterns = [
    path('home', userView.as_view()),
    path('task', taskView.as_view()),
    path('create-user', createUserView.as_view()),
    path('create-task', createTaskView.as_view()),
    path('get-user', getUser.as_view()),
    path('get-user-task',getUserTask.as_view()),
    path('record',recordView.as_view()),
    path('get-user-record',getUserRecord.as_view())
]

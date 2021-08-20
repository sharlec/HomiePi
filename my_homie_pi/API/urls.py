
from django.urls import path
from rest_framework.authtoken import views
# from django.contrib.auth.views import login
# from .views import userView, createUserView, taskView, getUser,getUserTask, createTaskView, recordView, getUserRecord

from .views import userView, my_view

urlpatterns = [

    path('user', userView.as_view()),
    # path('login/', views.user_login),
    # path('logout/', views.user_logout),
    path('login', my_view),
    # path('token-auth/', views.obtain_auth_token, name='api-token-auth'),
    # path('login/', login, name='login')
    # path('task', taskView.as_view()),
    # path('record', recordView.as_view()),
    # # path('register',)
    #
    # path('create-user', createUserView.as_view()),
    # path('create-task', createTaskView.as_view()),
    # path('get-user', getUser.as_view()),
    # path('get-user-task',getUserTask.as_view()),
    # path('get-user-record',getUserRecord.as_view())
]

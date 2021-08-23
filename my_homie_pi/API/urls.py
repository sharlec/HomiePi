
from django.urls import path
from rest_framework.authtoken import views
# from django.contrib.auth.views import login
from .views import userView,recordView

from .views import userView, TestView, dashBoardView
# from rest_framework_jwt.views import obtain_jwt_token

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# urlpatterns=[
#     path(r"login", obtain_jwt_token ),
# ]

# from rest_framework.decorators import login_required

urlpatterns = [
    path('user', userView.as_view()),
    path('login', TokenObtainPairView.as_view()),  # 需要添加的内容
    path('logout', TokenObtainPairView.as_view()),  # 需要添加的内容
    path(r'refresh', TokenRefreshView.as_view()),  # 需要添加的内容
    path(r'test', TestView.as_view()),  # 添加测试views的路由
    path(r'dashboard', dashBoardView.as_view()),  # 添加测试views的路由
    # path(r"login", obtain_jwt_token),
    # path('login/', views.user_login),
    # path('logout/', views.user_logout),
    # path('login', LoginView.as_view()),
    # path('token-auth/', views.obtain_auth_token, name='api-token-auth'),
    # path('login/', login, name='login')
    # path('task', taskView.as_view()),
    # path('record', login_required(recordView.as_view())),
    # # path('register',)
    #
    # path('create-user', createUserView.as_view()),
    # path('create-task', createTaskView.as_view()),
    # path('get-user', getUser.as_view()),
    # path('get-user-task',getUserTask.as_view()),
    # path('get-user-record',getUserRecord.as_view())
]

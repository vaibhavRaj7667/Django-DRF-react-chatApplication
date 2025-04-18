"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('username/',ProtectedView.as_view(),name="ProtectedView"),
    path('register/', createuser.as_view(), name="createuser"),
    path('friends/',UserList.as_view() ),
    path('friends/<int:user_id>/', UserFriendsView.as_view(), name='user-friends'),
    path('request/',AddFriendView.as_view(),name="AddFriendView"),
    path('currentuser/',currentuser.as_view()),
    path('logout/',LogoutUser.as_view()),
    path('messages/',GetMessage.as_view()),
]

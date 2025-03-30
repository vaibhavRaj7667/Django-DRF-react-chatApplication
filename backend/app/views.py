from django.shortcuts import render
from app.serializer import CreateUserSerializer,UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
# from app.models import FriendList
from app.models import Friend

from django.shortcuts import get_object_or_404


#this is test gitpush


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        
        return Response({"message": f"This is a protected route ${user}"})
    
class UserList(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users,many=True)
        return Response(serializer.data , status=status.HTTP_200_OK)

class currentuser(APIView):
    def get(self, request):
        id = request.user.id
        return Response( {"id":id},status=status.HTTP_200_OK)

    

class UserFriendsView(APIView):
    def get(self, request, user_id):
        print(request.user)
        user = get_object_or_404(User, id=user_id)

        friends = Friend.objects.filter(user=user, status='accepted').values_list('friend', flat=True)

       
        friend_ids = list(friends) 
        friends = User.objects.filter(id__in=friend_ids)  

        serializer = UserSerializer(friends, many=True)  
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AddFriendView(APIView):
    def post(self, request):
        user = request.user  
        friend_id = request.data.get("friend_id")  
        
        try:
            friend = User.objects.get(id=friend_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

       
        if Friend.objects.filter(user=user, friend=friend).exists() or Friend.objects.filter(user=friend, friend=user).exists():
            return Response({"error": "Friend request already sent or alreday freind"}, status=status.HTTP_400_BAD_REQUEST)

       
        friend_request = Friend.objects.create(user=user, friend=friend, status="pending")

        return Response({"message": "Friend request sent!"}, status=status.HTTP_201_CREATED)
        
    

class createuser(APIView):
    def post(self, request):
        print(request.data)
        serializer = CreateUserSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

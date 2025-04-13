from rest_framework import serializers
from django.contrib.auth.models import User
from app.models import Friend,Message



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =  ['username', 'id']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'message_text', 'sent_at']


class FriendSerializer(serializers.ModelSerializer):

    class Meta:
        model = Friend
        fields = ['id', 'user', 'friend', 'status', 'requested_at']


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}  

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user
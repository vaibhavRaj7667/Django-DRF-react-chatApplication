from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from app.models import Message
from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async

User = get_user_model()

def get_room_name(user1, user2):
    ids = sorted([str(user1.id), str(user2.id)])
    return f"private_chat_{ids[0]}_{ids[1]}"


class MyConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Check if the user is anonymous, if so, close the connection
        if self.scope["user"].is_anonymous:
            await self.close()
        else:
            print("this is current user",self.scope["user"].username)
            
            extra_data = self.scope.get("extra_data", {})
            # Corrected to access username from the extra_data dictionary
            print("this is other user",extra_data.get('username'))  # Use get() for safe access
            self.user1 = await sync_to_async(User.objects.get)(username = self.scope["user"])
            self.user2 = await sync_to_async(User.objects.get)(username = extra_data.get('username'))

           
            

            
            self.room_name = get_room_name(self.user1, self.user2)

            print(self.room_name)

            await self.channel_layer.group_add(self.room_name, self.channel_name)


            

            await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_name, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)

        # message_ = text_data_json['message']
        message_ = text_data_json.get('message')
        sender_username = self.scope["user"].username

        await self.save_message(sender_username, self.user2, message_)

        message={
            "message":message_,
            "sender_username":sender_username
        }


        await self.channel_layer.group_send(
            self.room_name,
            {
                "type":"chat.message",
                "message":message
            }
        )


    async def chat_message(self,event):
        sender_username = event["message"]["sender_username"]

        sync_to_async(Message.objects.create)(
            sender = sender_username,
            receiver = self.user2,
            message_text = event["message"],
        )

    # Prevent sending the message back to the sender
        if sender_username != self.scope["user"].username:
            await self.send(text_data=json.dumps(event["message"]))
        # await self.send(text_data=json.dumps(event["message"]))

        # message = event["message"]

        # await self.send(text_data=json.dumps({"message":message}))
    @database_sync_to_async
    def save_message(self, sender , receiver, message):
        user = User.objects.get(username = sender)
        return Message.objects.create(sender = user , receiver = receiver, message_text = message)

        


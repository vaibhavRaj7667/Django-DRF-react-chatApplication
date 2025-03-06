from django.urls import re_path

from .consumers import MyConsumer

websocket_urlpatterns = [
    re_path("ws/chat/", MyConsumer.as_asgi()),   
]
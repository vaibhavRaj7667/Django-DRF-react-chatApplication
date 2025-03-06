# # your_app/middleware.py
# from django.contrib.auth.models import AnonymousUser
# from rest_framework_simplejwt.tokens import AccessToken
# from channels.db import database_sync_to_async

# class JWTAuthMiddleware:
#     def __init__(self, app):
#         self.app = app

#     async def __call__(self, scope, receive, send):
#         # Extract the token from the query string
#         query_string = scope.get("query_string", b"").decode("utf-8")
#         token = None
#         for param in query_string.split("&"):
#             if param.startswith("token="):
#                 token = param.split("=")[1]
#                 break

#         # Authenticate the user
#         if token:
#             try:
#                 access_token = AccessToken(token)
#                 user_id = access_token["user_id"]
#                 scope["user"] = await self.get_user(user_id)
#             except Exception as e:
#                 scope["user"] = AnonymousUser()
#         else:
#             scope["user"] = AnonymousUser()

        
#         return await self.app(scope, receive, send)

#     @database_sync_to_async
#     def get_user(self, user_id):
#         from django.contrib.auth import get_user_model
#         User = get_user_model()
#         try:
#             return User.objects.get(id=user_id)
#         except User.DoesNotExist:
#             return AnonymousUser()


# your_app/middleware.py
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken
from channels.db import database_sync_to_async
import urllib.parse

class JWTAuthMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        # Extract the query string and parse it
        query_string = scope.get("query_string", b"").decode("utf-8")
        parsed_query = urllib.parse.parse_qs(query_string)
        
        # Initialize variables
        token = parsed_query.get("token", [None])[0]
        
        scope["user"] = AnonymousUser()  # Default user
        scope["extra_data"] = {}

        # If token exists, authenticate user and pass extra data
        if token:
            try:
                access_token = AccessToken(token)
                user_id = access_token["user_id"]
                scope["user"] = await self.get_user(user_id)
                
                # Store additional data from the query string in scope["extra_data"]
                for key, values in parsed_query.items():
                    if key != "token":
                        scope["extra_data"][key] = values[0]  # Storing the first value for each key

            except Exception as e:
                scope["user"] = AnonymousUser()
                scope["extra_data"] = {"error": str(e)}

        return await self.app(scope, receive, send)

    @database_sync_to_async
    def get_user(self, user_id):
        from django.contrib.auth import get_user_model
        User = get_user_model()
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return AnonymousUser()

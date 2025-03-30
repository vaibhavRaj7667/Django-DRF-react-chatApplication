from django.contrib.auth.models import AnonymousUser
# from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.tokens import UntypedToken
from channels.db import database_sync_to_async
import urllib.parse

import logging
logging.basicConfig(level=logging.DEBUG, format="%(levelname)s: %(message)s")
logging.getLogger("daphne.server").setLevel(logging.WARNING)
logger = logging.getLogger(__name__)

class JWTAuthMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        # Extract the query string and parse it
        query_string = scope.get("query_string", b"").decode("utf-8")
        parsed_query = urllib.parse.parse_qs(query_string)
        
        # Initialize variables
        token = parsed_query.get("token", [None])[0]

        logger.debug(f"Raw token recived :{token}")
        
        # scope["user"] = AnonymousUser()  # Default user
        scope["user"] = None # Default user
        scope["extra_data"] = {}

        # If token exists, authenticate user and pass extra data
        if token:
            try:
                access_token = UntypedToken(token)
                logger.debug(f"Full token payload: {access_token.payload}")
                user_id = access_token["user_id"]

                logger.debug(f"token user_id:{user_id}")

                user = await self.get_user(user_id)
                # scope["user"] = await self.get_user(user_id)
                logger.debug(f"Authenticated user: {user}")
                scope["user"]=user
                
                # Store additional data from the query string in scope["extra_data"]
                for key, values in parsed_query.items():
                    if key != "token":
                        scope["extra_data"][key] = values[0]  # Storing the first value for each key

            except Exception as e:
                scope["user"] = AnonymousUser()
                scope["extra_data"] = {"error": str(e)}
        logger.debug(f"final assigned user:{scope['user']}")
        return await self.app(scope, receive, send)

    @database_sync_to_async
    def get_user(self, user_id):
        from django.contrib.auth import get_user_model
        User = get_user_model()
        try:
            # return User.objects.get(id=user_id)
            user = User.objects.get(id=user_id)
            user.refresh_from_db()
            return user
        except User.DoesNotExist:
            return AnonymousUser()

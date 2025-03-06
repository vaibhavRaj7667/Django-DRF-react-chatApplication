from django.db import models
from django.contrib.auth.models import User



class FriendList(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="friend_list")
    profile_img = models.ImageField(upload_to='pfp/', blank=True, null=True)
    friends = models.ManyToManyField(User, blank=True, related_name="friends")

    def add_friend(self, friend):
        if friend not in self.friends.all():
            self.friends.add(friend)

    def __str__(self):
        friend_names = ", ".join([friend.username for friend in self.friends.all()])
        return f"{self.user.username}'s friends: {friend_names if friend_names else 'No friends yet'}"

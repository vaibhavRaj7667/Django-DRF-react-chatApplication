from django.db import models
from django.contrib.auth.models import User


class Friend(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('blocked', 'Blocked'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friends')
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friend_of')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    requested_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'friend')

    def save(self, *args, **kwargs):
        """Ensure that a friendship is unique in both directions."""
        # if Friend.objects.filter(user=self.friend, friend=self.user).exists():
        #     raise ValueError("Friendship already exists in the reverse direction.")
        super().save(*args, **kwargs)

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    message_text = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=['sender', 'receiver']),
            models.Index(fields=['sent_at']),  # Indexing sent_at for faster sorting
        ]

from django.db import models

class MyModelUser(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    createdAt = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'User: {self.username}'
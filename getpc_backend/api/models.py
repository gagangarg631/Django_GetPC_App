from django.db import models

class StreamFile(models.Model):
    token = models.CharField(max_length=5, primary_key=True)
    filepath = models.TextField();    

    def __str__(self):
        return self.token

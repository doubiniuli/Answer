from django.db import models

# Create your models here.
from django.db import models

class Participant(models.Model):
    # id = models.IntegerField()
    phone = models.CharField(max_length=20)
    name = models.CharField(max_length=128)
    address = models.CharField(max_length=1024)
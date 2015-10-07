from django.db import models

# Create your models here.
from django.db import models

class Participant(models.Model):
    class Meta:
        db_table = u'Participant'
    # id = models.IntegerField()
    phone = models.CharField(max_length=20)
    name = models.CharField(max_length=128)
    address = models.CharField(max_length=1024)


class Weixin(models.Model):
    class Meta:
        db_table = u'Weixin'
    access_token = models.CharField(max_length=1024)
    expires_in = models.IntegerField()
    app_id = models.CharField(max_length=512)
    signature_time = models.DateTimeField()
    nonce_str = models.CharField(max_length=512)
    signature = models.CharField(max_length=128)
    js_api_list = models.CharField(max_length=1024)
    url = models.CharField(max_length=256)
    js_ticket = models.CharField(max_length=512)
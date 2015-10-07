import django
import requests
import hashlib
import time
import logging
import os
from Answer import settings
os.environ['DJANGO_SETTINGS_MODULE'] = 'Answer.settings'

APP_ID = "wx6ee8795bbaee6f5d"
secret = "c187ef0bea83964dd4c89f41d1bffc42"
ACCESS_TOKEN = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx6ee8795bbaee6f5d&secret=c187ef0bea83964dd4c89f41d1bffc42"


def get_js_tickets(access_token):
    url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=jsapi" % access_token
    rps = requests.get(url=url)
    if rps and rps.json.get("errmsg") == "ok":
        return rps.json.get("ticket")
    return None


def get_access_token():
    rps = requests.get(url=ACCESS_TOKEN)
    if rps:
        return rps.json().get("access_token")
    return None


def update_weixin_model():
    app_id = "wx6ee8795bbaee6f5d"
    access_token =get_access_token()
    if access_token is None:
        return None
    jsapi = get_js_tickets(access_token)
    if jsapi is None:
        return None
    Weixin.objects.filter(app_id=app_id).update(access_token=access_token, js_ticket=jsapi, app_id=app_id)


if __name__ == '__main__':
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")
    settings.configure()
    # os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Answer.settings")
    django.setup()
    while True:
        try:
            update_weixin_model()
            time.sleep(3000)
        except Exception as e:
            logging.exception(e)



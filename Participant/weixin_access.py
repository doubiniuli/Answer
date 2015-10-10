import requests
import hashlib
import time
import logging
import os
import web


online_write_db = web.database(dbn='mysql',
                               host='localhost',
                               port=3306,
                               user='root',
                               passwd='yunfan',
                               db='Participant')

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s [line:%(lineno)d] %(levelname)s %(message)s',
                    datefmt='%a, %d %b %Y %H:%M:%S',
                    filename=os.path.join(os.getcwd(), 'log.txt'),
                    filemode='w')

APP_ID = "wx6ee8795bbaee6f5d"
secret = "c187ef0bea83964dd4c89f41d1bffc42"
ACCESS_TOKEN = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx6ee8795bbaee6f5d&secret=c187ef0bea83964dd4c89f41d1bffc42"


def get_js_tickets(access_token):
    url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=jsapi" % access_token
    rps = requests.get(url=url)
    if rps and rps.json().get("errmsg") == "ok":
        return rps.json().get("ticket")
    return None


def get_access_token():
    rps = requests.get(url=ACCESS_TOKEN)
    if rps:
        return rps.json().get("access_token")
    return None


def update_weixin_model():
    app_id = "wx6ee8795bbaee6f5d"
    access_token =get_access_token()
    logging.info("Get token.")
    if access_token is None:
        return None
    logging.info("Get js api")
    jsapi = get_js_tickets(access_token)
    if jsapi is None:
        return None
    logging.info("Update database.")
    online_write_db.query("update Weixin set access_token='%s', js_ticket='%s' where app_id='%s'" % (access_token, jsapi, app_id))


if __name__ == '__main__':
    # os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Answer.settings")
    # django.setup()
    while True:
        try:
            logging.info("Start update")
            update_weixin_model()
            time.sleep(3000)
        except Exception as e:
            logging.exception(e)



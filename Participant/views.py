#coding:utf-8
from django.http import HttpResponse
from django.template import Context
from models import Participant, Weixin
from django.shortcuts import render_to_response
import logging
import time
import hashlib
import json
# Create your views here.

problem_infoMap = {
    '1': {
        'id': 1,
        'A': 'A: 上海奥迪国际赛车场',
        'B': 'B: 珠海国际赛车场',
        'C': 'C: 北京京港国际赛车场',
        'correct': 'A',
        'next': '2'
    },
    '2': {
        'id': 2,
        'A': 'A: 青年冠军方程式系列赛',
        'B': 'B: 兰博基尼-宝珀<br>Super Trofeo亚洲挑战赛',
        'C': 'C: 北京京港国际赛车场',
        'correct': 'A',
        'next': '3'
    },
    '3': {
        'id': 3,
        'A': 'A: 1个回合',
        'B': 'B: 2个回合',
        'C': 'C: 3个回合',
        'correct': 'C',
        'next': '4'
    },
    '4': {
        'id': 4,
        'A': 'A: Gallardo',
        'B': 'B: Hurac',
        'C': 'C: 北京京港国际赛车场',
        'correct': 'C',
        'next': '5'
    },
    '5': {
        'id': 5,
        'A': 'A: 上海奥迪国际赛车场',
        'B': 'B: 珠海国际赛车场',
        'C': 'C: 北京京港国际赛车场',
        'correct': 'B',
        'next': 'result'
    },
    'result': {
        'id': 'result'
    }
}

wx_auth = None


def update_weixin_auth():
    global wx_auth
    wx_auth = (Weixin.objects.all()[0], int(time.time()))


def catch_view_exception(fn):
    def wrapped(*args, **kwargs):
        try:
            return fn(*args, **kwargs)
        except Exception as e:
            from django.http import HttpResponse
            logging.exception(e)
            return HttpResponse(u'exception: %s' % str(e))

    wrapped.__name__ = fn.__name__
    return wrapped


@catch_view_exception
def add_participant(request):
    name = request.POST.get('name')
    address = request.POST.get('address')
    phone = request.POST.get('phone')
    participant = Participant(name=name, address=address, phone=phone)
    participant.save()
    return HttpResponse('Success')


@catch_view_exception
def list_participant(request):
    s = request.GET.get('s')
    r = request.GET.get('r')
    return Participant.objects.all()[s:s + r]


@catch_view_exception
def get_problem_html(request):
    name = request.GET.get('name')
    correct = request.GET.get('correct')
    if correct is None or name is None:
        return HttpResponse('Failed.')
    problem_info = problem_infoMap.get(name)
    correct_num = int(correct)
    if not problem_info:
        return HttpResponse('Failed.')
    if name != 'result':
        return render_to_response("template/problemJpg.html", Context(dict(problem_info=problem_info,
                                                                           correctNum=correct,
                                                                           waInfo=problem_info[problem_info['correct']])))
    else:
        if correct_num < 2:
            return render_to_response("template/title0.html", Context(dict()))
        elif correct_num < 5:
            return render_to_response("template/title1.html", Context(dict()))
        else:
            return render_to_response("template/title2.html", Context(dict()))


@catch_view_exception
def get_index_html(request):
    return render_to_response("template/empty.html", Context(dict()))


NONCE_STR = "FuckWeixinJsSDK"


def get_signature(jsapi, noncestr, timestamp, url):
    string1 = "jsapi_ticket=%s&noncestr=%s&timestamp=%s&url=%s" % (jsapi, noncestr, timestamp, url)
    return hashlib.sha1(string1)


@catch_view_exception
def get_submit(request):
    return render_to_response("template/submit.html", Context(dict()))


@catch_view_exception
def get_weixin_auth(request):
    url = request.GET.get("url")
    now = int(time.time())

    if wx_auth[1] > now + 1500:
        update_weixin_auth()

    t = wx_auth[1]
    js_api = wx_auth[0].js_ticket
    return HttpResponse(json.dumps({
        "jsTicket": js_api,
        "noncestr": NONCE_STR,
        "timestamp": str(t),
        "signature": str(get_signature(js_api, NONCE_STR, t, url))
    }));

update_weixin_auth()
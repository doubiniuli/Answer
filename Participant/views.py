#coding:utf-8
from django.shortcuts import render
from django.http import HttpResponse
from django.template import Context
from models import Participant
from django.shortcuts import render_to_response
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


def add_participant(request):
    name = request.GET.get('name')
    address = request.GET.get('address')
    phone = request.GET.get('phone')
    return HttpResponse('')


def list_participant(request):
    pass


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

#coding:utf-8
from django.shortcuts import render
from django.http import HttpResponse
from models import Participant
from django.shortcuts import render_to_response
# Create your views here.

problem_info = {
    '1': {
        'A': 'A: 上海奥迪国际赛车场',
        'B': 'B: 珠海国际赛车场',
        'C': 'C: 北京京港国际赛车场',
        'correct': 'A'
    },
}

def add_participant(request):
    name = request.GET.get('name')
    address = request.GET.get('address')
    phone = request.GET.get('phone')
    return HttpResponse('')


def list_participant(request):
    pass


def get_problem_html(request):
    num = request.GET.get('name')
    return render_to_response("template/problem-2.html", problem_info.get(num))


#coding:utf-8
from django.shortcuts import render
from django.http import HttpResponse
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


def list_participant(request):
    pass


def get_problem_html(request):
    name = request.GET.get('name')


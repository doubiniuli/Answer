#coding:utf-8
from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.



def add_participant(request):
    name = request.GET.get('name')
    address = request.GET.get('address')
    phone = request.GET.get('phone')


def list_participant(request):
    pass

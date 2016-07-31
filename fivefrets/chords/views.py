from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    context = {
        'test': 'test from view'
    }
    return render(request, 'chords/index.html', context)

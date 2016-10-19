from django.shortcuts import render
from django.http import HttpResponse
from .estimate.features import features

def index(request):
    context = {
        'test': 'test from view'
    }
    return render(request, 'chords/index.html', context)

def display(request, yt_id = ""):
    get_features = features(yt_id);
    get_features.dowload();
    context = {
        'yt_id' : yt_id
    }
    return render(request, 'chords/display.html', context)

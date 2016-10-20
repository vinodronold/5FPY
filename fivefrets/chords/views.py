from django.shortcuts import render
from django.http import HttpResponse
from django.forms.models import model_to_dict

from .models import Song, SongChord
from .estimate.features import features

def index(request):
    context = {
        'test': 'test from view'
    }
    return render(request, 'chords/index.html', context)

def display(request, yt_id = ""):
    try:
        song_instance = Song.objects.get(youtube = yt_id)
        chords_instance = SongChord.objects.filter(song_id__exact = song_instance.id)
        # print(chords_instance)
        context = {
            'song'   : song_instance,
            'chords' : chords_instance
        }
    except Song.DoesNotExist:
        get_features = features(yt_id);
        # get_features.dowload();
        context = {
            'song' : 'NOT FOUND'
        }

    return render(request, 'chords/display.html', context)

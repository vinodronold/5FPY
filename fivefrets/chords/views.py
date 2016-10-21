from django.shortcuts import render
from django.http import HttpResponse

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
        for e in song_instance.get_songchord_list():
            print(e.chord_diagram())
        context = {
            'song'      : song_instance,
            'song_info' : song_instance.get_song_info(),
            'chords'    : song_instance.get_songchord_list()
        }
    except Song.DoesNotExist:
        get_features = features(yt_id);
        # get_features.dowload();
        context = {
            'song' : 'NOT FOUND'
        }

    return render(request, 'chords/display.html', context)

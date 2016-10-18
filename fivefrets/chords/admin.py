from django.contrib import admin
from .models import GuitarChord, Song, SongChord

admin.site.register(GuitarChord)
admin.site.register(Song)
admin.site.register(SongChord)

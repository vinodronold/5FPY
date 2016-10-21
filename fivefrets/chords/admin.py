from django.contrib import admin
from .models import Chord, GuitarChord, Album, Composer, Singer, Song, SongChord

class GuitarChordInline(admin.TabularInline):
    model = GuitarChord

class ChordAdmin(admin.ModelAdmin):
    inlines = [
        GuitarChordInline,
    ]

class SongChordInline(admin.TabularInline):
    model = SongChord

class SongAdmin(admin.ModelAdmin):
    inlines = [
        SongChordInline,
    ]

admin.site.register(Chord, ChordAdmin)
admin.site.register(Album)
admin.site.register(Composer)
admin.site.register(Singer)
admin.site.register(Song, SongAdmin)

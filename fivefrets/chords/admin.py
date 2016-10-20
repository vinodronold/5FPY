from django.contrib import admin
from .models import GuitarChord, Song, SongChord

class SongChordInline(admin.TabularInline):
    model = SongChord

class SongAdmin(admin.ModelAdmin):
    inlines = [
        SongChordInline,
    ]

admin.site.register(GuitarChord)
admin.site.register(Song, SongAdmin)

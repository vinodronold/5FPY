from django.db import models

class Lyric(models.Model):
    content = models.TextField()

    def __str__(self):
        return self.chords_id

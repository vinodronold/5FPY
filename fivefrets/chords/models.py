from django.db import models

class Composer(models.Model):
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    display_name = models.CharField(max_length=50)

class Singer(models.Model):
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    display_name = models.CharField(max_length=50)

class Album(models.Model):
    LANGUAGE_CHOICE = (
        ('EN', 'English'),
        ('HI', 'Hindi'),
        ('KN', 'Kannada'),
        ('ML', 'Malayalam'),
        ('TA', 'Tamil'),
        ('TE', 'Telugu'),
        ('OT', 'Other'),
    )
    name = models.CharField(max_length=100)
    year = models.IntegerField()
    language = models.CharField(
        max_length=2,
        choices=LANGUAGE_CHOICE,
        default='OT',
    )

class Lyric(models.Model):
    content = models.TextField()

class GuitarChord(models.Model):
    CHORD_CHOICE = (
        ('1', 'A'),
        ('2', 'A#'),
        ('3', 'B'),
        ('4', 'C'),
        ('5', 'C#'),
        ('6', 'D'),
        ('7', 'D#'),
        ('8', 'E'),
        ('9', 'F'),
        ('10', 'F#'),
        ('11', 'G'),
        ('12', 'G#'),
    )
    CHORD_TYPE_CHOICE = (
        ('MAJ', 'Major'),
        ('MIN', 'Minor')
    )
    name = models.CharField(
        max_length=2,
        choices=CHORD_CHOICE
    )
    primary = models.BooleanField()
    typ = models.CharField(
        max_length=5,
        choices=CHORD_TYPE_CHOICE
    )
    barre = models.IntegerField()
    fret = models.IntegerField()
    string1 = models.IntegerField()
    string2 = models.IntegerField()
    string3 = models.IntegerField()
    string4 = models.IntegerField()
    string5 = models.IntegerField()
    string6 = models.IntegerField()

class Song(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    composer = models.ForeignKey(Composer, on_delete=models.CASCADE)
    singers = models.ManyToManyField(Singer)
    lyric = models.ForeignKey(Lyric, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

class SongChord(models.Model):
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    chord = models.ForeignKey(GuitarChord, on_delete=models.CASCADE)
    position = models.IntegerField()
    start = models.IntegerField()
    end = models.IntegerField()

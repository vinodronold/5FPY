from django.db import models

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
    alt_name =  models.CharField(max_length=10)
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

    def __str__(self):
        return self.get_name_display() + '-' + self.typ

    def get_chord(self):
        if self.typ == "MIN":
            return self.get_name_display() + "m"
        return self.get_name_display()

class Song(models.Model):
    name = models.CharField(max_length=100)
    youtube = models.CharField(max_length=50)
    lyric = models.TextField()

    def __str__(self):
        return self.name

class SongChord(models.Model):
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    chord = models.ForeignKey(GuitarChord)
    position = models.IntegerField()
    start = models.IntegerField()
    end = models.IntegerField()

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.chord.get_chord()

from __future__ import print_function
import librosa
import subprocess
import csv

class features:

    def __init__(self, yt_id):
        self.id = yt_id
        self.filepath = '/home/py/projects/tmp/'
        self.ext = 'mp3'
        self.vamp_plugin = 'nnls-chroma:chordino:simplechord'

    def dowload(self):
        result = subprocess.check_call([
            'youtube-dl',
            '--no-playlist',
            '--extract-audio',
            '--audio-format', self.ext,
            '--output', self.filepath + '%(id)s.%(ext)s',
            '--cache-dir', self.filepath + 'youtube-dl',
            self.id,
            ])

    def extract(self):
        result = subprocess.check_call([
            'sonic-annotator',
            '-d',
            'vamp:'+self.vamp_plugin,
            self.filepath + self.id + '.' + self.ext,
            '-w', 'csv',
            '--csv-force',
            '--force',
            ])

    def process_beats(self):

        audio, sample_rate = librosa.load(self.filepath + self.id + '.' + self.ext)
        tempo, beat_frames = librosa.beat.beat_track(y=audio, sr=sample_rate)
        #print('Estimated tempo: {:.2f} beats per minute'.format(tempo))
        beat_times = librosa.frames_to_time(beat_frames, sr=sample_rate)
        #librosa.output.times_csv(self.filepath + self.id + 'librosa_beat_times.csv', beat_times)

        with open(self.filepath + self.id + '_vamp_' + self.vamp_plugin + '.csv', 'r') as f:
            reader = csv.reader(f)
            chords = list(reader)
            #for c in chords:
            #    print(c)
        #with open(self.filepath + self.id + 'librosa_beat_times.csv', 'r') as f:
        #    reader = csv.reader(f)
        #    beat_times = list(reader)
        chord_idx = 0
        for beat_time in beat_times:
            if float(beat_time) >= float(chords[chord_idx + 1][0]):
                chord_idx += 1
            print(beat_time[0], chords[chord_idx][0], chords[chord_idx][1])

import subprocess

class features:

    def __init__(self, yt_id):
        self.id = yt_id
        self.filepath = '/home/py/projects/tmp/'
        self.ext = 'mp3'

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
            'vamp:nnls-chroma:chordino:simplechord',
            self.filepath + self.id + '.' + self.ext,
            '-w', 'csv',
            '--csv-force',
            '--force',
            ])

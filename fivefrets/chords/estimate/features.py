import subprocess

class features:

    def __init__(self, yt_id):
        self.id = yt_id

    def dowload(self):
        result = subprocess.check_call([
            'youtube-dl',
            '--no-playlist',
            '--extract-audio',
            '--audio-format', 'mp3',
            '--output', '/home/py/projects/tmp/'+self.id+'.%(ext)s',
            '--cache-dir', '/tmp/youtube-dl',
            self.id,])

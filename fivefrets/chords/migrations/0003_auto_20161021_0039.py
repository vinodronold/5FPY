# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-10-21 00:39
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chords', '0002_auto_20161018_0324'),
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('year', models.PositiveSmallIntegerField()),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Chord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('1', 'A'), ('2', 'A#'), ('3', 'B'), ('4', 'C'), ('5', 'C#'), ('6', 'D'), ('7', 'D#'), ('8', 'E'), ('9', 'F'), ('10', 'F#'), ('11', 'G'), ('12', 'G#')], max_length=2)),
                ('typ', models.CharField(choices=[('MAJ', 'Major'), ('MIN', 'Minor')], max_length=5)),
                ('alt_name', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Composer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Singer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.AlterModelOptions(
            name='songchord',
            options={'ordering': ['id']},
        ),
        migrations.RemoveField(
            model_name='guitarchord',
            name='alt_name',
        ),
        migrations.RemoveField(
            model_name='guitarchord',
            name='name',
        ),
        migrations.RemoveField(
            model_name='guitarchord',
            name='typ',
        ),
        migrations.AlterField(
            model_name='guitarchord',
            name='barre',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='guitarchord',
            name='fret',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='guitarchord',
            name='primary',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='guitarchord',
            name='string1',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='guitarchord',
            name='string2',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='guitarchord',
            name='string3',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='guitarchord',
            name='string4',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='guitarchord',
            name='string5',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='guitarchord',
            name='string6',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='songchord',
            name='chord',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chords.Chord'),
        ),
        migrations.AlterField(
            model_name='songchord',
            name='end',
            field=models.PositiveSmallIntegerField(),
        ),
        migrations.AlterField(
            model_name='songchord',
            name='position',
            field=models.PositiveSmallIntegerField(),
        ),
        migrations.AlterField(
            model_name='songchord',
            name='start',
            field=models.PositiveSmallIntegerField(),
        ),
        migrations.AddField(
            model_name='guitarchord',
            name='chord',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='chords.Chord'),
        ),
        migrations.AddField(
            model_name='song',
            name='album',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='chords.Album'),
        ),
        migrations.AddField(
            model_name='song',
            name='composer',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='chords.Composer'),
        ),
        migrations.AddField(
            model_name='song',
            name='singer',
            field=models.ManyToManyField(default=0, to='chords.Singer'),
        ),
    ]
# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-10-22 18:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chords', '0006_auto_20161022_1804'),
    ]

    operations = [
        migrations.AlterField(
            model_name='guitarchord',
            name='barre',
            field=models.CharField(default=0, max_length=2),
        ),
        migrations.AlterField(
            model_name='guitarchord',
            name='fret',
            field=models.CharField(default=0, max_length=2),
        ),
        migrations.AlterField(
            model_name='guitarchord',
            name='string1',
            field=models.CharField(default=0, max_length=2),
        ),
        migrations.AlterField(
            model_name='guitarchord',
            name='string2',
            field=models.CharField(default=0, max_length=2),
        ),
        migrations.AlterField(
            model_name='guitarchord',
            name='string3',
            field=models.CharField(default=0, max_length=2),
        ),
        migrations.AlterField(
            model_name='guitarchord',
            name='string4',
            field=models.CharField(default=0, max_length=2),
        ),
        migrations.AlterField(
            model_name='guitarchord',
            name='string5',
            field=models.CharField(default=0, max_length=2),
        ),
        migrations.AlterField(
            model_name='guitarchord',
            name='string6',
            field=models.CharField(default=0, max_length=2),
        ),
    ]
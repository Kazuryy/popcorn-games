# Generated by Django 4.2.20 on 2025-03-22 06:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0004_player'),
    ]

    operations = [
        migrations.AddField(
            model_name='player',
            name='player_id',
            field=models.CharField(default='unknown', max_length=100),
        ),
    ]

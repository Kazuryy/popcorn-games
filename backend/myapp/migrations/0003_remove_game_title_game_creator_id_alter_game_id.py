# Generated by Django 4.2.20 on 2025-03-19 09:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_alter_game_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='game',
            name='title',
        ),
        migrations.AddField(
            model_name='game',
            name='creator_id',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='game',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]

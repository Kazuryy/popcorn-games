from django.core.management.base import BaseCommand
from django.utils.timezone import now, timedelta
from myapp.models import Game

class Command(BaseCommand):
    help = "Supprime les parties de plus de 12 heures"

    def handle(self, *args, **kwargs):
        limite = now() - timedelta(hours=12)
        anciennes_parties = Game.objects.filter(created_at__lt=limite)
        count, _ = anciennes_parties.delete()
        self.stdout.write(self.style.SUCCESS(f"{count} parties supprimées"))
from django.db import models

class Game(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    creator_id = models.CharField(max_length=100, null=True, blank=True)  # ✅ Ajoute ce champ

    def __str__(self):
        return f"Game {self.id} - Créateur: {self.creator_id}"
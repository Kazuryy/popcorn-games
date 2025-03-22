from django.db import models

class Game(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    creator_id = models.CharField(max_length=100, null=True, blank=True)  # ✅ Ajoute ce champ
    code = models.CharField(max_length=6, unique=True)  # ✅ nouveau champ

    def __str__(self):
        return f"Game {self.id} - Créateur: {self.creator_id} - Code: {self.code}"
    
class Player(models.Model):
    username = models.CharField(max_length=100)
    player_id = models.CharField(max_length=100, default='unknown')  # lié au cookie
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='players')

    def __str__(self):
        return f"Player {self.username} - ID {self.player_id} - Game {self.game_id}"
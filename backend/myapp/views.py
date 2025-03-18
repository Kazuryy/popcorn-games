from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Game
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

@api_view(['POST'])
def create_game(request):
    game = Game.objects.create()
    return Response({'game_id': game.id})

def get_game_from_cookie(request):
    game_id = request.COOKIES.get("gameId")
    if game_id:
        return JsonResponse({"game_id": game_id})
    return JsonResponse({"error": "No game found"}, status=404)

def get_game(request, game_id):
    print(f"🔍 Recherche du jeu avec ID : {game_id}")  # ✅ Debug pour voir si Django reçoit bien la requête
    game = get_object_or_404(Game, id=game_id)  # 🔥 Lève 404 si l'ID du jeu n'existe pas
    return JsonResponse({"game_id": game.id, "created_at": game.created_at})
    
def list_games(request):
    games = Game.objects.all().values("id", "created_at")
    return JsonResponse({"games": list(games)})
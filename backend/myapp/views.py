import uuid
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Game

### 📌 1️⃣ CRÉATION DE PARTIE (MJ)
@api_view(['POST'])
def create_game(request):
    player_id = request.COOKIES.get("playerId")

    # ✅ Si le joueur n'a pas encore d'ID, on lui en génère un
    if not player_id:
        player_id = str(uuid.uuid4())
    
    response = JsonResponse({'game_id': None, 'is_master': True})  # Temporaire

    # ✅ Assigne le joueur comme créateur de la partie
    game = Game.objects.create(creator_id=player_id)
    response = JsonResponse({'game_id': game.id, 'is_master': True})

    # ✅ Stocke `playerId` dans un cookie sécurisé
    response.set_cookie(
        "playerId", player_id,
        max_age=7 * 24 * 60 * 60,
        secure=True, httponly=True, samesite="Lax"
    )
    
    return response

### 📌 2️⃣ SUPPRESSION D'UNE PARTIE (MJ UNIQUEMENT)
@api_view(['DELETE'])
def delete_game(request, game_id):
    player_id = request.COOKIES.get("playerId")

    if not player_id:
        print("❌ Aucun playerId reçu, suppression refusée")  # ✅ Log d'erreur
        return JsonResponse({"error": "Identification requise"}, status=403)

    game = get_object_or_404(Game, id=game_id)

    # ✅ Vérifie si l'utilisateur est bien le créateur de la partie
    if game.creator_id != player_id:
        print(f"❌ Suppression refusée : {player_id} n'est pas le créateur {game.creator_id}")  # ✅ Log pour debug
        return JsonResponse({"error": "Seul le Maître du Jeu peut supprimer cette partie"}, status=403)

    game.delete() # ✅ Log de succès
    return JsonResponse({"message": "Partie supprimée avec succès"}, status=200)

### 📌 3️⃣ LISTE DES PARTIES DISPONIBLES
@api_view(['GET'])
def list_games(request):
    try:
        games = Game.objects.all().values("id", "created_at")
        games_list = [{"id": game["id"], "created_at": game["created_at"].strftime("%Y-%m-%d %H:%M:%S")} for game in games]
        return JsonResponse({"games": games_list}, status=200)
    except Exception as e:
        return JsonResponse({"error": f"Erreur lors de la récupération des parties : {str(e)}"}, status=500)

### 📌 4️⃣ OBTENIR UNE PARTIE + DÉTERMINER LE STATUT (MJ ou joueur)
@api_view(['GET'])
def get_game(request, game_id):
    player_id = request.COOKIES.get("playerId")

    # ✅ Si aucun `playerId` n'est trouvé, on en génère un
    if not player_id:
        player_id = str(uuid.uuid4())

    game = get_object_or_404(Game, id=game_id)
    is_master = (game.creator_id == player_id)  # ✅ Vérifie si le joueur est MJ

    response = JsonResponse({
        "game_id": game.id,
        "created_at": game.created_at,
        "is_master": is_master
    })

    # ✅ Stocke `playerId` dans un cookie sécurisé
    response.set_cookie(
        "playerId", player_id,
        max_age=7 * 24 * 60 * 60,
        secure=True, httponly=True, samesite="Lax"
    )
    
    return response

### 📌 5️⃣ OBTENIR LE `gameId` STOCKÉ DANS LE COOKIE
@api_view(['GET'])
def get_game_from_cookie(request):
    game_id = request.COOKIES.get("gameId")
    if game_id:
        return JsonResponse({"game_id": game_id})
    return JsonResponse({"error": "No game found"}, status=404)

### 📌 6️⃣ OBTENIR OU CRÉER UN `playerId`
@api_view(['GET'])
def get_or_create_player_id(request):
    player_id = request.COOKIES.get("playerId")  # Vérifie si l'ID existe déjà
    if not player_id:
        player_id = str(uuid.uuid4())  # ✅ Génère un UUID unique

    response = JsonResponse({"player_id": player_id})  # Retourne l'ID au frontend
    response.set_cookie(
        "playerId",
        player_id,
        max_age=7 * 24 * 60 * 60,  # 7 jours
        secure=True,  # ⚠️ Active pour HTTPS uniquement
        httponly=True,  # 🚀 Empêche JavaScript d'accéder au cookie (protection XSS)
        samesite="Lax",  # 🔒 Protection CSRF
    )
    return response
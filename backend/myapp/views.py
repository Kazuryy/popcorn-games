import uuid
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http import JsonResponse
from .models import Game, Player
import random


def generate_unique_code():
    while True:
        code = str(random.randint(100000, 999999))
        if not Game.objects.filter(code=code).exists():
            return code


### 📌 1️⃣ CRÉATION DE PARTIE (MJ)
@api_view(['POST'])
def create_game(request):
    player_id = request.COOKIES.get("playerId")

    # ✅ Génère un playerId s'il n'existe pas
    if not player_id:
        player_id = str(uuid.uuid4())

    # ✅ Génère un code unique pour la partie
    code = generate_unique_code()

    # ✅ Crée la partie avec cet ID comme MJ
    game = Game.objects.create(creator_id=player_id, code=code)

    username = request.data.get("username", "").strip()
    if not username:
        return JsonResponse({"error": "Pseudo requis"}, status=400)

    # ✅ Crée un joueur associé avec le pseudo "Game Master"
    Player.objects.create(username=username, player_id=player_id, game=game)

    # ✅ Réponse avec cookie mis à jour
    response = JsonResponse({'game_id': game.id, 'code': code, 'is_master': True})
    response.set_cookie(
        "playerId", player_id,
        max_age=12 * 60 * 60,
        secure=False if settings.DEBUG else True,  # ⚠️ Active pour HTTPS uniquement 
        httponly=True,
        samesite="Lax"
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
        "is_master": is_master,
        "creator_id": game.creator_id,
        "code": game.code
    })

    # ✅ Stocke `playerId` dans un cookie sécurisé
    response.set_cookie(
        "playerId", player_id,
        max_age=12 * 60 * 60,
        secure=False if settings.DEBUG else True,  # ⚠️ Active pour HTTPS uniquement 
        httponly=True, 
        samesite="Lax"
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
        max_age=12 * 60 * 60,
        secure=False if settings.DEBUG else True,  # ⚠️ Active pour HTTPS uniquement
        httponly=True,  # 🚀 Empêche JavaScript d'accéder au cookie (protection XSS)
        samesite="Lax",  # 🔒 Protection CSRF
    )
    return response

### 📌 7️⃣ LISTE DES JOUEURS DANS UNE PARTIE
@api_view(['GET'])
def list_players(request, game_id):
    game = get_object_or_404(Game, id=game_id)
    players = game.players.all().values("username", "player_id")
    return JsonResponse({"players": list(players)})

@api_view(['POST'])
def join_game(request, game_id):
    player_id = request.COOKIES.get("playerId")
    username = request.data.get("username")

    if not player_id:
        player_id = str(uuid.uuid4())

    if not username:
        return JsonResponse({"error": "Pseudo requis"}, status=400)

    game = get_object_or_404(Game, id=game_id)

    # Évite les doublons
    if not Player.objects.filter(player_id=player_id, game=game).exists():
        Player.objects.create(username=username, player_id=player_id, game=game)

    response = JsonResponse({"message": "Joueur ajouté"})
    response.set_cookie(
        "playerId", player_id,
        max_age=12 * 60 * 60,
        secure=False if settings.DEBUG else True,
        httponly=True,
        samesite="Lax"
    )
    return response

@api_view(['PUT'])
def update_username(request, game_id):
    player_id = request.COOKIES.get("playerId")
    username = request.data.get("username")

    if not player_id or not username:
        return JsonResponse({"error": "Infos manquantes"}, status=400)

    player = get_object_or_404(Player, player_id=player_id, game__id=game_id)
    player.username = username
    player.save()

    return JsonResponse({"message": "Pseudo mis à jour"})

@api_view(['DELETE'])
def leave_game(request, game_id):
    player_id = request.COOKIES.get("playerId")
    if not player_id:
        return JsonResponse({"error": "Non identifié"}, status=403)

    player = get_object_or_404(Player, player_id=player_id, game__id=game_id)
    player.delete()

    return JsonResponse({"message": "Joueur retiré de la partie"})

@api_view(['GET'])
def get_game_by_code(request, code):
    try:
        game = Game.objects.get(code=code)
        return JsonResponse({"game_id": game.id})
    except Game.DoesNotExist:
        return JsonResponse({"error": "Code invalide"}, status=404)

@api_view(['POST'])
def kick_player(request):
    player_id = request.data.get('player_id')
    game_code = request.data.get('game_code')

    game = Game.objects.filter(code=game_code).first()
    if not game:
        return Response({"detail": "Game not found"}, status=404)

    player = Player.objects.filter(id=player_id, game=game).first()
    if not player:
        return Response({"detail": "Player not found"}, status=404)

    if request.user != game.game_master:
        return Response({"detail": "Only the Game Master can kick players"}, status=403)

    player.is_kicked = True
    player.save()

    return Response({"detail": "Player has been kicked successfully"})
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Game

@api_view(['POST'])
def create_game(request):
    game = Game.objects.create()
    return Response({'game_id': game.id})
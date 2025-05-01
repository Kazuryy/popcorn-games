from django.urls import path
from .views import create_game, delete_game, list_games, get_game, get_game_from_cookie, get_or_create_player_id, list_players, join_game, leave_game, update_username, get_game_by_code, kick_player

urlpatterns = [
    path("api/create_game/", create_game, name="create_game"),
    path("api/games/<int:game_id>/delete/", delete_game, name="delete_game"),
    path("api/games/", list_games, name="list_games"),
    path("api/games/<int:game_id>/", get_game, name="get_game"),
    path("api/get_game_from_cookie/", get_game_from_cookie, name="get_game_from_cookie"),
    path("api/get_player_id/", get_or_create_player_id, name="get_player_id"),
    path("api/games/<int:game_id>/players/", list_players, name="list_players"),
    path("api/games/<int:game_id>/join/", join_game, name="join_game"),
    path("api/games/<int:game_id>/update_username/", update_username),
    path("api/games/<int:game_id>/leave/", leave_game),
    path("api/games/by-code/<str:code>/", get_game_by_code),
    path('api/kick/', kick_player, name='kick-player'),
]
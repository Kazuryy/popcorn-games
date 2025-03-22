from django.urls import path
from . import views

urlpatterns = [
    # 🟢 Création, suppression, lecture de parties
    path("api/create-game/", views.create_game, name="create_game"),
    path("api/delete-game/<int:game_id>/", views.delete_game, name="delete_game"),
    path("api/list-games/", views.list_games, name="list_games"),
    path("api/get-game/<int:game_id>/", views.get_game, name="get_game"),
    path("api/game-by-code/<str:code>/", views.get_game_by_code, name="get_game_by_code"),

    # 🟢 Gestion des joueurs
    path("api/players/<int:game_id>/", views.list_players, name="list_players"),
    path("api/join-game/<int:game_id>/", views.join_game, name="join_game"),
    path("api/update-username/<int:game_id>/", views.update_username, name="update_username"),
    path("api/leave-game/<int:game_id>/", views.leave_game, name="leave_game"),

    # 🟢 Cookies
    path("api/player-id/", views.get_or_create_player_id, name="get_or_create_player_id"),
    path("api/game-from-cookie/", views.get_game_from_cookie, name="get_game_from_cookie"),
]
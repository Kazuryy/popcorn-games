"""
URL configuration for myapp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from .views import create_game, delete_game, list_games, get_game, get_game_from_cookie, get_or_create_player_id

urlpatterns = [
    path("api/create_game/", create_game, name="create_game"),
    path("api/games/<int:game_id>/delete/", delete_game, name="delete_game"),
    path("api/games/", list_games, name="list_games"),
    path("api/games/<int:game_id>/", get_game, name="get_game"),
    path("api/get_game_from_cookie/", get_game_from_cookie, name="get_game_from_cookie"),
    path("api/get_player_id/", get_or_create_player_id, name="get_player_id"),
]
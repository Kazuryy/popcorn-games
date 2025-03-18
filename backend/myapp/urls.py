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
from .views import create_game, get_game, list_games

urlpatterns = [
    path('api/create_game/', create_game, name='create_game'),
    path('api/games/<int:game_id>/', get_game, name='get_game'),
    path('api/games/', list_games, name='list_games'),  # ✅ Nouvelle route pour lister les parties
]
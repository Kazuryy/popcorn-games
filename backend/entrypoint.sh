#!/bin/sh

echo "🛠️ Lancement des migrations..."
python manage.py migrate

echo "📦 Collecte des fichiers statiques..."
python manage.py collectstatic --noinput

echo "🚀 Démarrage de Gunicorn..."
exec gunicorn --chdir /app --bind 0.0.0.0:8000 myapp.wsgi:application
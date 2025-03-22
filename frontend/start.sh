#!/bin/sh

echo "💡 Injection de VITE_API_URL=$VITE_API_URL"
echo "window.env = { VITE_API_URL: \"${VITE_API_URL}\" };" > /usr/share/nginx/html/config.js

nginx -g 'daemon off;'
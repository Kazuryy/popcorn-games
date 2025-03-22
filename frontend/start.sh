#!/bin/sh

echo "window.env = { VITE_API_URL: '${VITE_API_URL}' };" > /usr/share/nginx/html/config.js

echo "🌐 VITE_API_URL injectée dans config.js : ${VITE_API_URL}"

nginx -g 'daemon off;'
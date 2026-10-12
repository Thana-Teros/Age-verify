#!/bin/sh

if [ -f /usr/share/nginx/html/age-verify.js ]; then
    sed -i "s|__REDIRECT_URL__|${REDIRECT_URL:-https://www.google.com}|g" /usr/share/nginx/html/age-verify.js
    sed -i "s|__MODAL_BG__|${MODAL_BG_COLOR:-#FDF1D3}|g" /usr/share/nginx/html/age-verify.js
    sed -i "s|__TEXT_COLOR__|${TEXT_COLOR:-#111111}|g" /usr/share/nginx/html/age-verify.js
    sed -i "s|__BTN_YES_BG__|${BTN_YES_BG:-#1b4332}|g" /usr/share/nginx/html/age-verify.js
    sed -i "s|__BTN_YES_COLOR__|${BTN_YES_COLOR:-#ffffff}|g" /usr/share/nginx/html/age-verify.js
    sed -i "s|__BTN_NO_BG__|${BTN_NO_BG:-#FDF1D3}|g" /usr/share/nginx/html/age-verify.js
    sed -i "s|__BTN_NO_COLOR__|${BTN_NO_COLOR:-#111111}|g" /usr/share/nginx/html/age-verify.js
fi

exec nginx -g 'daemon off;'

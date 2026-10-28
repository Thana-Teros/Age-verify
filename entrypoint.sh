#!/bin/sh

replace_placeholder() {
  placeholder="$1"
  value="$2"
  escaped_value=$(printf '%s' "$value" | sed 's/[\\&|]/\\&/g')
  sed -i "s|${placeholder}|${escaped_value}|g" /usr/share/nginx/html/age-verify.js
}

replace_placeholder '__REDIRECT_URL__' "${REDIRECT_URL:-https://www.google.com}"
replace_placeholder '__MODAL_BG__' "${MODAL_BG_COLOR:-#FDF1D3}"
replace_placeholder '__TEXT_COLOR__' "${TEXT_COLOR:-#111111}"
replace_placeholder '__BTN_YES_BG__' "${BTN_YES_BG:-#1b4332}"
replace_placeholder '__BTN_YES_COLOR__' "${BTN_YES_COLOR:-#ffffff}"
replace_placeholder '__BTN_NO_BG__' "${BTN_NO_BG:-#FDF1D3}"
replace_placeholder '__BTN_NO_COLOR__' "${BTN_NO_COLOR:-#111111}"
replace_placeholder '__TITLE_TEXT__' "${TITLE_TEXT:-AVEZ-VOUS PLUS DE __AGE_LIMIT__ ANS ?}"
replace_placeholder '__DESCRIPTION_TEXT__' "${DESCRIPTION_TEXT:-En entrant sur ce site, vous confirmez avoir l'âge requis.}"
replace_placeholder '__NO_BUTTON_TEXT__' "${NO_BUTTON_TEXT:-J'ai moins de __AGE_LIMIT__ ans}"
replace_placeholder '__YES_BUTTON_TEXT__' "${YES_BUTTON_TEXT:-J'ai plus de __AGE_LIMIT__ ans}"
replace_placeholder '__AGE_LIMIT__' "${AGE_LIMIT:-18}"

exec nginx -g 'daemon off;'

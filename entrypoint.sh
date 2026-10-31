#!/bin/sh
set -eu

template=/usr/share/nginx/html/age-verify.template.js
target=/tmp/age-verify.js
temporary_target=${target}.tmp

# The generated asset can contain deployment-specific text. Keep it readable
# only by the non-root Nginx user that generates and serves it.
umask 077

base64_value() {
  printf '%s' "$1" | base64 | tr -d '\n'
}

valid_http_url() {
  case "$1" in
    http://*|https://*) return 0 ;;
    *) return 1 ;;
  esac
}

valid_age() {
  case "$1" in
    ''|*[!0-9]*) return 1 ;;
    *) [ "$1" -ge 1 ] && [ "$1" -le 120 ] ;;
  esac
}

age_limit=${AGE_LIMIT:-18}
valid_age "$age_limit" || age_limit=18
redirect_url=${REDIRECT_URL:-https://www.google.com}
valid_http_url "$redirect_url" || redirect_url=https://www.google.com

write_encoded() {
  key=$1
  value=$2
  printf '  "%s": "%s"' "$key" "$(base64_value "$value")"
}

{
  printf 'window.__AGE_VERIFY_CONFIG__ = Object.freeze({\n'
  write_encoded ageLimit "$age_limit"; printf ',\n'
  write_encoded titleText "${TITLE_TEXT:-AVEZ-VOUS PLUS DE __AGE_LIMIT__ ANS ?}"; printf ',\n'
  write_encoded descriptionText "${DESCRIPTION_TEXT:-En entrant sur ce site, vous confirmez avoir l'âge requis.}"; printf ',\n'
  write_encoded yesButtonText "${YES_BUTTON_TEXT:-J'ai plus de __AGE_LIMIT__ ans}"; printf ',\n'
  write_encoded noButtonText "${NO_BUTTON_TEXT:-J'ai moins de __AGE_LIMIT__ ans}"; printf ',\n'
  write_encoded redirectUrl "$redirect_url"; printf ',\n'
  write_encoded modalBgColor "${MODAL_BG_COLOR:-#FDF1D3}"; printf ',\n'
  write_encoded textColor "${TEXT_COLOR:-#111111}"; printf ',\n'
  write_encoded yesButtonBg "${BTN_YES_BG:-#1b4332}"; printf ',\n'
  write_encoded yesButtonColor "${BTN_YES_COLOR:-#ffffff}"; printf ',\n'
  write_encoded noButtonBg "${BTN_NO_BG:-#FDF1D3}"; printf ',\n'
  write_encoded noButtonColor "${BTN_NO_COLOR:-#111111}"; printf '\n});\n'
  cat "$template"
} > "$temporary_target"

mv "$temporary_target" "$target"

exec nginx -g 'daemon off;'

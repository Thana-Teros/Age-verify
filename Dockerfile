FROM nginx:1.27-alpine

COPY nginx-main.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY age-verify.js /usr/share/nginx/html/age-verify.template.js
COPY index.html /usr/share/nginx/html/index.html
COPY entrypoint.sh /entrypoint.sh

RUN chmod 0555 /entrypoint.sh \
    && chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 8080
USER nginx
ENTRYPOINT ["/entrypoint.sh"]

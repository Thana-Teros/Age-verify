FROM nginx:alpine

COPY age-verify.js /usr/share/nginx/html/age-verify.js
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh
RUN echo "Age Verification Service" > /usr/share/nginx/html/index.html

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]

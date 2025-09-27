FROM nginx:1.25-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY QJOBc9N/ /usr/share/nginx/html/

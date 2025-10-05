FROM caddy:2-alpine

# Copy the Caddyfile for configuration
COPY Caddyfile /etc/caddy/Caddyfile

# Copy the website files to the appropriate directory
COPY ./QJOBc9N/ /usr/share/caddy/

EXPOSE 8080

# The Caddy server will start automatically when the container runs

FROM caddy:latest

COPY ./Caddyfile /etc/caddy/Caddyfile

COPY ./packages/components/storybook-static /usr/share/caddy/storybook

EXPOSE 80
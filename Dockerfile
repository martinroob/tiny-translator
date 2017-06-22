FROM nginx:1.13.1-alpine
LABEL maintainer "martinroob65@gmail.com" \
  description="A tiny little webapp to quick and dirty translate XLIFF 1.2, XLIFF 2.0 and XMB files"
EXPOSE 80
COPY ./dist/ /usr/share/nginx/html

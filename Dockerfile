FROM nginx:stable-alpine

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Clean default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy the correct built folder (IMPORTANT PART)
COPY dist/browser/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

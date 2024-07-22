FROM richarvey/nginx-php-fpm:latest 

# Copy the start script into the image
COPY start.sh /usr/local/bin/start.sh

# Image config
ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Laravel config
ENV APP_ENV staging
ENV APP_DEBUG true
ENV LOG_CHANNEL stderr

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1
HEALTHCHECK CMD curl --silent --fail http://localhost/health || exit 1


CMD ["/start.sh"]
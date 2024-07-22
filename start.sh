#!/usr/bin/env bash

# Update and install Composer dependencies
echo "Running composer install..."
composer install --no-dev --working-dir=/var/www/html

# Run Laravel migrations
echo "Running migrations..."
php artisan migrate --force

# Start PHP-FPM and Nginx
echo "Starting PHP-FPM and Nginx..."
php-fpm &
nginx -g 'daemon off;'

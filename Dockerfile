# Use a base image with PHP and Nginx
FROM richarvey/nginx-php-fpm:latest

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Set up environment variables
ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr

# Copy Nginx configuration
COPY conf/nginx/nginx-site.conf /etc/nginx/sites-available/default

# Expose port 80
EXPOSE 80

# Start the services
CMD ["sh", "-c", "php-fpm & nginx -g 'daemon off;'"]

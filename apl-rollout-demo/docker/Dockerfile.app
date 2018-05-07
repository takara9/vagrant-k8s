#
# PHP-FPM アプリケーション・コンテナ
#
FROM php:7-fpm

RUN apt-get update \
    && apt-get install -y libmcrypt-dev mysql-client \
    && apt-get install -y zip unzip git \
    && apt-get install -y vim

#RUN git clone -b php7 https://github.com/phpredis/phpredis.git /usr/src/php/ext/redis
#RUN git clone -b develop https://github.com/phpredis/phpredis.git /usr/src/php/ext/redis
RUN git clone https://github.com/phpredis/phpredis.git /usr/src/php/ext/redis

#RUN docker-php-ext-install mcrypt pdo_mysql session json mbstring redis
RUN docker-php-ext-install pdo_mysql session json mbstring redis


ADD ./etc/session.ini /usr/local/etc/php/conf.d/session.ini


RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer


#RUN composer create-project --prefer-dist laravel/laravel laravel \
#    && cd laravel \
#    && composer require predis/predis

WORKDIR /var/www

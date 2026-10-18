#!/bin/bash
set -e

echo "Installing bundle assets..."
php bin/console assets:install public --no-interaction > /dev/null

echo "Waiting for database..."
until php bin/console doctrine:query:sql "SELECT 1" > /dev/null 2>&1; do
    echo "Database is unavailable - sleeping"
    sleep 2
done

echo "Database is up - executing migrations"
php bin/console doctrine:migrations:migrate --no-interaction

if [ "$APP_ENV" = "dev" ]; then
    echo "Loading fixtures..."
    php bin/console doctrine:fixtures:load --no-interaction || true
fi

exec "$@"
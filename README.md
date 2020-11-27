# app
This the monorepo for the main Weclaraline app

# How to start a local Postgres database for development

docker run -d \
    --rm \
    -e POSTGRES_PASSWORD=password \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v $(PWD)/.pgdata:/var/lib/postgresql/data \
    -p 5432:5432 \
    postgres:11
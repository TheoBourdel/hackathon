# Lancer le client & le server

`docker compose up`

# Jouer les migrations

`docker compose exec server sh`
`cd src`
`npx sequelize-cli db:migrate`

# Mettre à jour les dépendances

`docker compose exec client sh`
`npm i`

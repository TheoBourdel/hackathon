# Features
- Détection de problème physique & psychologique (SMS) - Amilcar
- Envoi de conseilles par SMS si un problème a été détecté - Amine
- Chat en temps réel - Marouane
- Détection des émotions dans un audio - Théo
- Gestion des rapports (CRUD, PDF) - Théo & Marouane
- Gestion de la liste des message par utilisateurs - Marouane

# Authors
- marouaneTalbi : Marouane
- Amilcar-afk : Amilcar
- acherigui1 : Amine
- TheoBourdel : Théo

# Install

# Lancer le client & le server

`docker compose up`

# Jouer les migrations

`docker compose exec server sh`
`cd src`
`npx sequelize-cli db:migrate`

# Mettre à jour les dépendances

`docker compose exec client sh`
`npm i`

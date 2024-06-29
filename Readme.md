# Install
1. `git clone https://github.com/TheoBourdel/hackathon.git`
2. `cd hackathon`
3. `docker compose build`
4. `docker compose up`
5. `docker compose exec client sh` & `npm i`
6. `docker compose exec server sh` & `npm i` & `cd src` & `npx sequelize-cli db:migrate`
7. restart docker compose and it's done !

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

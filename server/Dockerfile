FROM node:21

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

COPY --chown=node:node . .

EXPOSE 8000

CMD ["npm", "start"]
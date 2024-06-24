const { WebSocketServer } = require('ws');
// const db = require('./db');

const wss = new WebSocketServer({ port: 8080 });



module.exports = wss;
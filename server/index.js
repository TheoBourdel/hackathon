import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database.js';
import userRoutes from './src/routes/userRoute.js';
import messageRoutes from './src/routes/messageRoute.js';
import reportRoutes from './src/routes/reportRoute.js';
import http from 'http';
import { socketHandler } from './src/ws/socket.js';
import { Server } from 'socket.io';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json()); // Pour parser les requêtes JSON

app.get('/api', (req, res) => {
  res.send({ data: 'Hello from the server!' });
});

app.use('/api', userRoutes);
app.use('/api', messageRoutes);
app.use('/api', reportRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

socketHandler(io);

const startServer = async () => {
  try {
    await connectDatabase();
    console.log('Database connected successfully.');

    // Utilisation de `server.listen` au lieu de `app.listen`
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
  }
};

startServer();

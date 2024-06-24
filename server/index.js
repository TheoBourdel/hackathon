import express from 'express';
import cors from 'cors';
// import { connectDatabase } from './src/db/conn.js';
import { connectDatabase } from './src/db/conn.js';

const app = express();
const port = 8000;

app.use(cors());

app.get('/api', (req, res) => {
  res.send({ data: 'Hello from the server!' });
});

const startServer = async () => {
  try {
    // Connect to the database
    await connectDatabase();
    console.log('Database connected successfully.');

    // Start the server
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
  }
};

startServer();

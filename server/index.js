import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database.js';
import userRoutes from './src/routes/userRoute.js';
import messageRoutes from './src/routes/messageRoute.js';
import reportRoutes from './src/routes/reportRoute.js';
import http from 'http';
import { socketHandler } from './src/ws/socket.js';
import { Server } from 'socket.io';
import MistralClient from '@mistralai/mistralai';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json()); // Pour parser les requêtes JSON

const apiKey = "Jb1Pf2nx0UVg9DPXQVi70wFTiTguJP2a";
console.log(apiKey);

const client = new MistralClient(apiKey);

app.post('/api/chat-mistral-bot', async (req, res) => {
  try {
    const chatResponse = await client.chat({
      model: 'mistral-large-latest',
      messages: [
        {
          role: 'system',
          content: `You are an AI trained to analyze text and categorize both the mental and physical state of the author into four categories:
                    "Rien à signaler" (no issues detected), "Urgent" (depression, burnout, etc.), "Très urgent" (suicidal tendencies, etc.)
                    in french. Additionally, provide a brief description (in French, 255 characters max) of the mental or physical state based on 
                    the following message. Structure the response as follows:
                    Catégorie : <category here> 
                    Description : <description here> (150 characters max)
                    Type : <physique/psychologique or physique - psychologique>
                    Detect if the problem is psychological (trauma, depression) by labeling it "psychologique," 
                    or if the problem is physical (broken bone, stomach ache) by labeling it "physique." (il faut que ca fasse absolument en dessous 250 caratere max)`
                          
        },
        
        { role: 'user', content: req.body.message }
      ],
    });
    const responseContent = chatResponse.choices[0].message.content;
    console.log("Content: " + responseContent);
    res.json({message: responseContent});
  } catch(e) {
    console.error(e);
    res.sendStatus(500);
  }
})
app.post('/api/message-mistral-bot', async (req, res) => {

  try {
    const messageResponse = await client.chat({
      model: 'mistral-large-latest',
      messages: [
        {
          role: 'system',
          content: 'on a detecter ce message anormale,donne moi trois conseille pour ce probleme mentale (50 caratere max) :'+req.body.message 
        },
        { role: 'user', content: req.body.message  }
      ],
    });

    const responseContent = messageResponse.choices[0].message.content;
    res.json({message: responseContent});
  } catch(e) {
    console.error(e);
    res.sendStatus(500);
  }
})
app.post('/api/vocal-mistral-bot', async (req, res) => {

  try {
    const vocalResponse = await client.chat({
      model: 'mistral-large-latest',
      messages: [
        {
          role: 'system',
          content: `Je vais te fournir un rapport d'émotion sous forme de chaîne de caractères. 
          Ce rapport contient le nom de chaque émotion accompagné d'un score. En fonction des scores des émotions les plus élevés, 
          j'aimerais que tu détermines si l'état émotionnel général est "nothing to report", "alarming state" ou "very alarming state". 
          Je souhaite également que tu me fournisses une description détaillée de l'état mental de la personne basée sur ces émotions.
           Ne mentionne pas "alarming state" si tu détermines que c'est un "very alarming state".
          Tu dois également analyser et essayer de détecter si le problème est physique ou psychologique et me structurer la reponse dans ce format la: Type: <Physique / Psychologique> sans developper la repense.(250 caratere max)` 
        },
        { role: 'user', content: "Voici le rapport d'émotion : " + JSON.stringify(req.body.humeReport) }
      ],
  });

    const responseContent = vocalResponse.choices[0].message.content;
    res.json({message: responseContent});
  } catch(e) {
    console.error(e);
    res.sendStatus(500);
  }
})

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

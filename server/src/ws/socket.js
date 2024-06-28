import messageController from "../controllers/messageController.js";

const ROOM = 'global_room';

export const socketHandler =  (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.join(ROOM);

    socket.on('message', async (message) => {
      await messageController.createMessage(message)
      io.to(ROOM).emit('message', message);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

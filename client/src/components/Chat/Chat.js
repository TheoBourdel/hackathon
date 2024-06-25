import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Button, TextInput } from 'flowbite-react';
import UserModal from '../Modal/modalUser';

const socket = io('http://localhost:8000'); 

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userType, setUserType] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const room = 'global_room'; 

  useEffect(() => {
    if (userType) {
      socket.emit('joinRoom', room);
    }

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, [userType]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = { userId: userType === 'doctor' ? 1 : 2, content: message };
      socket.emit('message', newMessage);
      setMessage('');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Application</h1>
      {userType ? (
        <>
          <div className="chat-window border p-4 rounded">
            <div className="messages overflow-y-auto h-64">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message p-2 my-2 rounded max-w-xs break-words ${
                    msg.userId === (userType === 'doctor' ? 1 : 2) ? 'bg-gray-200 self-end text-right' : 'bg-blue-200 self-start text-left'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex mt-4">
            <TextInput
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 mr-2"
            />
            <Button type="submit" gradientDuoTone="greenToBlue">Send</Button>
          </form>
        </>
      ) : (
        <UserModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          setUserType={setUserType}
        />
      )}
    </div>
  );
};

export default Chat;

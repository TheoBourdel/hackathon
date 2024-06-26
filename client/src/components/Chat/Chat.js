import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { Button, TextInput } from 'flowbite-react';
import UserModal from '../Modal/modalUser';
import messageService from '../../services/messageService';
import VerifMentalHealth from './MistralAi/VerifMentalHealth';

const socket = io('http://localhost:8000'); 

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userType, setUserType] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const room = 'global_room'; 

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (userType) {
      socket.emit('joinRoom', room);
    }
    messageService.getMessages().then(setMessages);
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, [userType]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message && message.trim()) {
      let reportId;
      if (userType !== 'doctor') {
        reportId = await VerifMentalHealth(message);
      }

      const newMessage = { userId: userType === 'doctor' ? 1 : 2, content: message, reportId: reportId };
      try {
        await messageService.createMessage(newMessage);
        socket.emit('message', newMessage);
        setMessage('');
      } catch (error) {
        console.error('Failed to send message', error);
      }
    }
  };

  return (
    <div className="p-0">
      <div className='mb-4'> 
        <h1 className='text-custom-black text-xl font-semibold'>Chat</h1>
        {
          userType && <p>conversation avec {userType === 'doctor' ? 'Le client' : 'Le medcin'}</p>
        }
      </div>
      {userType ? (
        <>
          <div className="chat-window border p-4 rounded bg-gray-50 h-5/6">
            <div className="messages overflow-y-auto h-64 flex flex-col">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message p-2 my-2 rounded max-w-xs break-words ${
                    msg.userId === (userType === 'doctor' ? 1 : 2) 
                      ? 'bg-gray-200 self-end text-right ml-auto' 
                      : 'bg-custom-orange text-white self-start text-left mr-auto'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              <div ref={messagesEndRef} />
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
            <Button type="submit" className="bg-custom-orange">Send</Button>
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

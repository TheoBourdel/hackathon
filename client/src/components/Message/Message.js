import React, { useEffect, useState } from 'react';
import userService from '../../services/userService';
import { Button } from 'flowbite-react';
import { format } from 'date-fns';
import FormModal from './FormModal';

const Messages = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isUserSelectionned, setIsUserSelectionned] = useState(true);
  const [user, setUser] = useState();
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await userService.getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = async (userId) => {
    try {
      const userMessages = await userService.getUserMessages(userId);
      const user = await userService.getUser(userId);

      if(user && userMessages) {
        setUser(user)
        setMessages(userMessages);
        setIsUserSelectionned(false)
        setSelectedUser(userId);
      }

    } catch (error) {
      console.error('Error fetching messages for user', error);
    }
  };

  return (
    <>
    <div className="flex justify-between  ">
        <div className='mb-4'>
            <h1 className='text-custom-black text-xl font-semibold'>Messages</h1>
            <p>Liste des utilisateurs</p>
        </div>
        <div className="">
            <Button type="submit" disabled={isUserSelectionned} className="bg-custom-orange" onClick={openModal} >Generer le rapport</Button>
        </div>
    </div>
    <FormModal isOpen={modalIsOpen} onRequestClose={closeModal}  currentuser={user} currentMessages={messages} />

    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-50 p-4 border-r">
        <div className="user-list">
          {users.map((user) => (
            <div
              key={user.id}
              className="user p-2 my-2 mx-2  border-b border-gray-400 flex items-center cursor-pointer"
              onClick={() => handleUserClick(user.id)}
            >
              <img
                src={`https://ui-avatars.com/api/?name=${user.firstname}`}
                alt="profile"
                className="w-10 h-10 rounded-full mr-2"
              />
              <span className="font-semibold">{user.firstname}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/3 pl-4 bg-gray-00 ">
        <div className="messages-card p-4 border rounded h-3/4">
          <h2 className="text-xl font-bold mb-2">Messages</h2>
          {selectedUser ? (
            messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message p-2 my-2 rounded max-w-xs break-words
                      bg-custom-orange text-white self-start text-left mr-auto`}
                >
                  {msg.content}
                  <div className="timestamp text-xs text-white-300">
                    {format(new Date(msg.timestamp), 'MMMM dd, yyyy, h:mm a')}
                  </div>
                </div>
              ))
            ) : (
              <p>No messages</p>
            )
          ) : (
            <p>Selectionner un utilisateur pour voir ses messages</p>
          )}
        </div>
  
      </div>
    </div>
    </>
  );
};

export default Messages;

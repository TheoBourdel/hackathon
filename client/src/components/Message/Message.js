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
  const [selectedMessages, setSelectedMessages] = useState([]);

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

  const handleFormSubmit = (formData) => {
  };

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
              <p>Liste des messages par utilisateurs</p>
          </div>
          <div className="">
              <Button type="submit" disabled={isUserSelectionned} className="bg-custom-orange" onClick={openModal} >Generer le rapport</Button>
          </div>
      </div>
      <FormModal setSelectedMessages={setSelectedMessages} isOpen={modalIsOpen} onRequestClose={closeModal} onSubmit={handleFormSubmit} currentuser={user} currentMessages={messages} />

    <div className="flex-1 flex flex-row">
      <div className="w-1/3 p-4">
        <div className="user-list flex flex-col gap-4 justify-center">
          {users.map((user, index) => (
            <React.Fragment key={user.id}>
              <div
                className={`p-4 rounded-2xl flex items-center cursor-pointer flex flex-row gap-2 hover:bg-gray-100 ${selectedUser === user.id ? 'bg-gray-100' : ''}`}              
                onClick={() => handleUserClick(user.id)}
              >
                <div className='p-2 bg-gray-200 rounded-xl'>{user.firstname.charAt(0).toUpperCase()}{user.lastname.charAt(0).toUpperCase()}</div>
                <div className='flex flex-col'>
                  <span>{user.firstname} {user.lastname}</span>
                  <span className='text-gray-400 text-sm font-light'>{user.createdAt.split('T')[0]}</span>
                </div>
              </div>
              {index < users.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </div>
      </div>
        <div className="p-4 border-l w-2/3">
          <h2 className="text-xl font-bold">Messages</h2>
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
    </>
  );
};

export default Messages;

import React, { useEffect, useState } from 'react';
import { Button, Select, TextInput, Textarea, Drawer, Label } from 'flowbite-react';
import rapportService from '../../services/rapportService';

const FormModal = ({ isOpen, onRequestClose, onSubmit, currentuser, currentMessages, setSelectedMessages }) => {
  const [category, setCategory] = useState('normal');
  const [messages, setMessages] = useState(currentMessages);
  const [user, setUser] = useState();
  const [selectedMessages, setSelectedMessagesForm] = useState([]);
  const [description, setDescription] = useState();

  const handleCheckboxChange = (message) => {
    const isSelected = selectedMessages.some(selectedMessage => selectedMessage.content === message.content);

    if (isSelected) {
      setSelectedMessagesForm(selectedMessages.filter(selectedMessage => selectedMessage.content !== message.content));
      setSelectedMessages(selectedMessages.filter(selectedMessage => selectedMessage.content !== message.content));
    } else {
      setSelectedMessagesForm([...selectedMessages, message]);
      setSelectedMessages([...selectedMessages, message]);
    }
  };

  useEffect(() => {
    if (currentuser) {
      setUser(currentuser);
    }

    if (currentMessages) {
      setMessages(currentMessages);
    }
  }, [currentuser, currentMessages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const report = {
      userId: user.id,
      title: "Rapport de Performance",
      description: description,
      category: category,
      status: "Non traité"
    }

    const r = await rapportService.createRpport(report);
  };

  return (
    <Drawer open={isOpen} onClose={onRequestClose}>
      <Drawer.Header title='Génère un rapport' titleIcon={() => <></>}></Drawer.Header>
      <Drawer.Items>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 mt-3">
            <Label htmlFor="user" className="mb-2 block">
              Utilisateur
            </Label>
            {user && (
              <TextInput
                value={user.firstname}
                disabled
              />
            )}
          </div>
          <div className="mb-6">
            <Label htmlFor="category" className="mb-2 block">
              Catégorie
            </Label>
            <Select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Urgent">Urgent</option>
              <option value="Très urgent">Très Urgent</option>
            </Select>
          </div>
          {messages.length !== 0 && (
              <div className="mb-6">
                <Label htmlFor="messages" className="mb-2 block">
                  Messages
                </Label>
                <div className="mt-1 block w-full max-h-40 overflow-y-auto border rounded-md">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`p-2 cursor-pointer flex items-center justify-between ${
                        selectedMessages.some(selectedMessage => selectedMessage.content === message.content)
                          ? 'bg-blue-100 border-blue-500'
                          : 'bg-white border-gray-300'
                      } border-b hover:bg-gray-100`}
                    >
                      <label className="flex items-center space-x-3 w-full">
                        <input
                          type="checkbox"
                          checked={selectedMessages.some(selectedMessage => selectedMessage.content === message.content)}
                          onChange={() => handleCheckboxChange(message)}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="text-gray-700">{message.content}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
          )}
          <div className="mb-6">
              <Label htmlFor="description" className="mb-2 block">
                Description
              </Label>
              <Textarea id="description" onChange={(e) => setDescription(e.target.value)} />
            </div>
          <div className="flex justify-end">
            <Button type="button" onClick={onRequestClose} color="gray" className="mr-2">
              Cancel
            </Button>
            <Button type="submit" className="bg-custom-orange">
              Generer
            </Button>
          </div>
        </form>
      </Drawer.Items>
    </Drawer>
  );
};

export default FormModal;

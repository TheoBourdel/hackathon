import React, { useEffect, useState } from 'react';
import { Button, Modal, Select, TextInput, Textarea } from 'flowbite-react';
import rapportService from '../../services/rapportService';

const FormModal = ({ isOpen, onRequestClose, onSubmit, currentuser, currentMessages }) => {
  const [category, setCategory] = useState('normal');
  const [messages, setMessages] = useState(currentMessages);
  const [user, setUser] = useState();
  const [selectedMessages, setSelectedMessagesForm] = useState([]);
  const [description, setDescription] = useState();

  const handleCheckboxChange = (message) => {
    const isSelected = selectedMessages.some(selectedMessage => selectedMessage.content === message.content);

    if (isSelected) {
      setSelectedMessagesForm(selectedMessages.filter(selectedMessage => selectedMessage.content !== message.content));
    } else {
      setSelectedMessagesForm([...selectedMessages, message]);
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
      status: "Non traité",
      messages: selectedMessages
    }

    await rapportService.createRpport(report);
    onRequestClose();
  };

  return (
    <Modal show={isOpen} onClose={onRequestClose}>
      <Modal.Header>
        Select Category
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {user && (
              <TextInput
                value={user.firstname}
                disabled
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            )}

            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mt-4">
              Category
            </label>
            <Select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
              <option value="tres urgent">Très Urgent</option>
            </Select>

            {messages.length !== 0 && (
              <div className="p-4">
                <label htmlFor="messages" className="block text-sm font-medium text-gray-700 mt-4">
                  Les Messages
                </label>
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

            <div className="p-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              />
            </div>
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
      </Modal.Body>
    </Modal>
  );
};

export default FormModal;

import React from 'react';
import { Modal, Button } from 'flowbite-react';

const UserModal = ({ isOpen, onRequestClose, setUserType }) => {
  const handleUserSelection = (type) => {
    setUserType(type);
    onRequestClose();
  };

  return (
    <Modal show={isOpen} onClose={onRequestClose}  size="md">
      <Modal.Header>
        Selectionner votre profile
      </Modal.Header>
      <Modal.Body >
        <div className="flex  justify-between">
          <Button onClick={() => handleUserSelection('doctor')} className="bg-custom-orange">Doctor</Button>
          <Button onClick={() => handleUserSelection('client')} className=" bg-custom-blue ml-2">Client</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;

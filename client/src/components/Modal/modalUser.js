import React from 'react';
import { Modal, Button } from 'flowbite-react';

const UserModal = ({ isOpen, onRequestClose, setUserType }) => {
  const handleUserSelection = (type) => {
    setUserType(type);
    onRequestClose();
  };

  return (
    <Modal show={isOpen} onClose={onRequestClose}>
      <Modal.Header>
        Select Your User Type
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <Button onClick={() => handleUserSelection('doctor')} gradientDuoTone="purpleToBlue">Doctor</Button>
          <Button onClick={() => handleUserSelection('client')} gradientDuoTone=" purpleToBlue">Client</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;

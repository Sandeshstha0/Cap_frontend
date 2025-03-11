import LandingPage from '@/Components/globalComponent/LandingPage';
import { Modal } from 'antd';
import React from 'react';

const ModalOpen = ({ isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose} // Close the modal when the user clicks outside or presses ESC
      footer={null} // Remove default footer
      closeIcon={null} // Hide the close icon
      centered // Center the modal
      width={1400} // Set width of modal
      className="rounded-lg shadow-lg"
    >
      <div className="p-6">
        <LandingPage />
        
        {/* Close button floating on the right */}
        <button
          onClick={onClose}
          className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-600 transition ml-auto block"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ModalOpen;

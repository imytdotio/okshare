import React, { useEffect, useRef } from 'react';

const ConfirmationModal = ({ onConfirm, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleConfirm();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div ref={modalRef} className="bg-white p-4 rounded-3xl">
        <p className="mb-4">Are you sure you want to delete all content in this space?</p>
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white p-2 rounded-3xl w-1/2 mr-2"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-300 text-black p-2 rounded-3xl w-1/2 ml-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

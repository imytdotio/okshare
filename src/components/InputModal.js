import React, { useState, useEffect, useRef } from 'react';

const InputModal = ({ onAddContent, onClose }) => {
  const [content, setContent] = useState('');
  const [isImage, setIsImage] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSubmit();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleSubmit = () => {
    if (content.trim()) {
      onAddContent(content, isImage ? 1 : 0);
      setContent('');
      onClose();
    }
  };

  const toggleInputType = () => {
    setIsImage(!isImage);
    setContent('');
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div ref={modalRef} className="bg-white p-4 rounded w-11/12">
        <button
          className="w-full bg-gray-300 text-black p-2 mb-4 rounded"
          onClick={toggleInputType}
        >
          {isImage ? 'Switch to Text' : 'Switch to Image URL'}
        </button>
        <textarea
          className="w-full p-2 border rounded mb-4"
          placeholder={isImage ? 'Enter image URL...' : 'Input any text...'}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="bg-black text-white p-2 w-full rounded"
          onClick={handleSubmit}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default InputModal;

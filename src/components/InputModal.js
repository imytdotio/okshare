import React, { useState, useEffect, useRef } from 'react';
import { FaImage } from 'react-icons/fa';

const InputModal = ({ onAddContent, onClose }) => {
  const [content, setContent] = useState('');
  const [isImage, setIsImage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const modalRef = useRef(null);
  const imgbbApiKeyLink = 'https://api.imgbb.com/1/upload?key=' + process.env.REACT_APP_IMGBB_API_KEY;

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && !isImage) {
        handleSubmit();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isImage]);

  const handleSubmit = () => {
    if (content.trim()) {
      onAddContent(content, isImage ? 1 : 0);
      setContent('');
      onClose();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await fetch(imgbbApiKeyLink, {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        if (result.success) {
          setContent(result.data.url);
          setIsImage(true);
        } else {
          alert('Image upload failed');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Image upload failed');
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div ref={modalRef} className="bg-white p-2 rounded-3xl w-96">
        {!isImage && !isUploading && (
          <>
            <div className="h-60 bg-gray-300 rounded-3xl border border-dashed border-black flex flex-col justify-center items-center cursor-pointer mb-2"
              onClick={() => document.getElementById('fileInput').click()}
            >
              <FaImage className="text-white text-5xl" />
              <p className="text-white mt-2">Upload Image</p>
            </div>
            <textarea
              className="w-full p-2 border rounded-3xl mb-2"
              placeholder="Input any text..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </>
        )}
        {isUploading && <p className="text-center mb-2">Uploading...</p>}
        {isImage && !isUploading && (
          <div className="h-60">
            <img src={content} alt="Uploaded" className="w-full h-full object-cover rounded-3xl mb-2" />
          </div>
        )}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
        {(content && !isUploading) && (
          <button
            className="bg-black text-white p-2 w-full rounded-3xl mt-2"
            onClick={handleSubmit}
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
};

export default InputModal;

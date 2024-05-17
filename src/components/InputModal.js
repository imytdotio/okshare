import React, { useState, useEffect, useRef } from 'react';

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

  const toggleInputType = () => {
    setIsImage(!isImage);
    setContent('');
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
        <button
          className="w-full bg-gray-300 text-black p-2 mb-2 rounded-3xl"
          onClick={toggleInputType}
        >
          {isImage ? 'Switch to Text' : 'Switch to Image URL'}
        </button>
        {isImage ? (
          <>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border rounded-3xl mb-2"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            {isUploading && <p className="text-center">Uploading...</p>}
            {content && !isUploading && (
              <button
                className="bg-black text-white p-2 w-full rounded-3xl mt-2"
                onClick={handleSubmit}
              >
                Upload
              </button>
            )}
          </>
        ) : (
          <>
            <textarea
              className="w-full p-2 border rounded-3xl mb-2"
              placeholder="Input any text..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              className="bg-black text-white p-2 w-full rounded-3xl"
              onClick={handleSubmit}
            >
              Upload
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default InputModal;

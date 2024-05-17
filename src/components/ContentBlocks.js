import React from 'react';
import { FaCopy, FaDownload } from 'react-icons/fa';

const ContentBlocks = ({ contents, onAddClick }) => {
  const handleTextClick = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
    });
  };

  const handleImageClick = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {contents.map((item, index) => (
        <div
          key={index}
          className={`relative bg-white ${item.type === 1 ? 'p-0 hover:cursor-pointer' : 'p-4 hover:cursor-pointer'} rounded-3xl h-40 shadow flex transition-all duration-200`}
          onClick={() => item.type === 0 ? handleTextClick(item.content) : handleImageClick(item.content)}
        >
          {item.type === 1 ? (
            <img src={item.content} alt={`Content ${index}`} className="w-full h-full object-cover rounded-3xl" />
          ) : (
            <p className="overflow-hidden text-ellipsis line-clamp-3">
              {item.content}
            </p>
          )}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
            <div className="absolute inset-0 bg-black opacity-40 rounded-3xl"></div>
            {item.type === 0 ? (
              <FaCopy className="text-white text-2xl z-10" />
            ) : (
              <FaDownload className="text-white text-2xl z-10" />
            )}
          </div>
        </div>
      ))}
      <button
        className="bg-gray-300 p-4 h-40 rounded-3xl shadow flex justify-center items-center w-full border border-black border-dashed"
        onClick={onAddClick}
      >
        <span className="text-3xl">+</span>
      </button>
    </div>
  );
};

export default ContentBlocks;

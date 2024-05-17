import React from 'react';
import { FaCopy } from 'react-icons/fa';

const ContentBlocks = ({ contents, onAddClick }) => {
  const handleTextClick = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {contents.map((item, index) => (
        <div
          key={index}
          className={`relative bg-white ${item.type === 1 ? 'p-0' : 'p-4 hover:cursor-pointer'} rounded-3xl h-40 shadow flex hover:bg-gray-300 transition-all duration-200`}
          onClick={() => item.type === 0 && handleTextClick(item.content)}
        >
          {item.type === 1 ? (
            <img src={item.content} alt={`Content ${index}`} className="w-full h-full object-cover rounded-3xl" />
          ) : (
            <p className="overflow-hidden text-ellipsis line-clamp-3">
              {item.content}
            </p>
          )}
          {item.type === 0 && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
              <FaCopy className="text-white text-2xl" />
            </div>
          )}
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

import React from 'react';

const ContentBlocks = ({ contents, onAddClick }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {contents.map((item, index) => (
        <div
          key={index}
          className={`bg-white ${item.type === 1 ? 'p-0' : 'p-4'} rounded-3xl h-40 shadow flex`}
        >
          {item.type === 1 ? (
            <img src={item.content} alt={`Content ${index}`} className="w-full h-full object-cover rounded-3xl" />
          ) : (
            <p>{item.content}</p>
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

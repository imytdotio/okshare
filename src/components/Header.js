import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ initialSpaceId }) => {
  const [spaceId, setSpaceId] = useState(initialSpaceId || '');
  const navigate = useNavigate();

  const handleFetch = () => {
    if (spaceId) {
      navigate(`/${spaceId}`);
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="bg-black text-white p-2 flex flex-col items-center rounded-3xl">
      <div className="text-2xl cursor-pointer mb-1" onClick={handleHomeClick}>
        OK Share
      </div>
      <div className="flex items-center w-full">
        <input
          type="text"
          className="py-2 px-4 rounded-3xl w-full text-black"
          placeholder="Enter space ID"
          value={spaceId}
          onChange={(e) => setSpaceId(e.target.value)}
        />
        <button
          className="bg-gray-600 p-2 px-3 rounded-3xl ml-2"
          onClick={handleFetch}
        >
          <span className="text-white">→</span>
        </button>
      </div>
    </div>
  );
};

export default Header;

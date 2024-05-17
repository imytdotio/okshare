import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Space from './Space';

const App = () => {
  return (
    <div className="bg-[#f1f5f9] min-h-screen py-4 px-2">
      <Header />
      <Routes>
        <Route path="/:spaceId" element={<Space />} />
        <Route path="/" element={<div className="p-4 text-center">Enter a space ID in the input above to get started.</div>} />
      </Routes>
    </div>
  );
};

export default App;

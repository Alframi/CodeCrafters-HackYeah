import React from 'react';
import { Template } from '../Template/Template';
import { Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Template />} />
    </Routes>
  );
};

export default App;

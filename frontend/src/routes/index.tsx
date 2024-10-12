import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from '../pages/Inicio';

const Rotas: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;

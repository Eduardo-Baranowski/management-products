import React from 'react';
import Rotas from './routes';
import GlobalStyle from './styles/global';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <>
      <Rotas />
      <GlobalStyle />
    </>
  );
}

export default App;

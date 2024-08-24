import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from '../src/pages/login/index';
import Index from './pages/table';
import History from './pages/history';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Index/>}/>
        <Route path="/history" element={<History/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

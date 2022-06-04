import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import HomePage from './routes/Home.js';
import ProfilePage from './routes/Profile.js';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import ProjectDetails from './routes/ProjectDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter forceRefresh={true}>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='home' element={<HomePage />} />
        <Route path='profile/:username' element={<ProfilePage />} />
        <Route path='project/:id' element={<ProjectDetails />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    
  </BrowserRouter>
);

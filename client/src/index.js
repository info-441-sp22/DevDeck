import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import HomePage from './routes/Home.js';
import ProfilePage from './routes/Profile.js';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import ProjectDetails from './routes/ProjectDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='home' element={<HomePage />} />
        <Route path='profile/:username' element={<ProfilePage />} />
        <Route path='project/:id' element={<ProjectDetails />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

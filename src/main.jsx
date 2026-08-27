import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ProjectDetail from './ProjectDetail';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Projects />} />
          {/* Aquí se pueden agregar más rutas como /sobre-mi y /contacto en el futuro */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

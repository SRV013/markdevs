import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout/MainLayout';
import { Home } from '@/pages/Home/Home';
import { Projects } from '@/pages/Projects/Projects';
import { Contact } from '@/pages/Contact/Contact';
import { About } from '@/pages/About/About';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/sobre-mi" element={<About />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

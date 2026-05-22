import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Home from './components/views/Home';
import ClaimForm from './components/views/ClaimForm';
import ClaimStatus from './components/views/ClaimStatus';
import Login from './components/views/Login';
import AdminDashboard from './components/views/AdminDashboard';

// Creamos un componente intermedio para poder usar el hook useNavigate dentro del contexto del Router
const AppRoutes = () => {
  const navigate = useNavigate();
  // Estado para simular si el operador inició sesión o no
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="app-main-wrapper d-flex flex-column min-vh-100 justify-content-between">
      <Routes>
        {/* Vistas del Ciudadano */}
        <Route 
          path="/" 
          element={
            <Home 
              alHacerClicIniciar={() => navigate('/nuevo-reclamo')} 
              alHacerClicVerMapa={() => navigate('/seguir-reclamo')} 
            />
          } 
        />
        <Route path="/nuevo-reclamo" element={<ClaimForm onClickBack={() => navigate('/')} />} />
        <Route path="/seguir-reclamo" element={<ClaimStatus onClickBack={() => navigate('/')} />} />

        {/* Vista de Control Administrativo Protegida */}
        <Route 
          path="/admin" 
          element={
            isAuthenticated ? (
              <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
            ) : (
              <Login 
                onLoginSuccess={() => setIsAuthenticated(true)} 
                onClickBack={() => navigate('/')} 
              />
            )
          } 
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Footer formal y discreto para acceder al login administrativo durante la demo */}
      {window.location.pathname !== '/admin' && (
        <footer className="text-center py-3 bg-light border-top" style={{ fontSize: "0.8rem" }}>
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            className="text-muted fw-medium"
            onClick={() => navigate('/admin')}
          >
            Acceso Administración Interna
          </span>
        </footer>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
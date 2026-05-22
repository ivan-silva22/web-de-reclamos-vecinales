import React from "react";
import { Container, Button } from "react-bootstrap";
import { ShieldLock, BoxArrowRight } from "react-bootstrap-icons";


const AdminNavbar = ({ onLogout }) => {
  return (
    <nav className="navbar admin-navbar mb-4">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Identidad del Sistema */}
        <div className="d-flex align-items-center gap-2">
          <ShieldLock size={22} className="text-white" />
          <h5 className="mb-0 fw-bold navbar-title">
            PANEL DE CONTROL • GESTIÓN INTERNA
          </h5>
        </div>

        {/* Acciones del Administrador */}
        <div className="d-flex align-items-center gap-3">
          <span className="badge bg-light text-dark px-3 py-1.5 fw-semibold small d-none d-sm-inline">
            Módulo Administrativo
          </span>
          <Button
            variant="outline-light"
            size="sm"
            className="btn-logout d-flex align-items-center gap-2 fw-semibold px-3 py-1.5"
            onClick={onLogout}
          >
            <BoxArrowRight size={16} />
            Cerrar Sesión
          </Button>
        </div>
      </Container>
    </nav>
  );
};

export default AdminNavbar;
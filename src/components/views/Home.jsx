import React from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { PlusCircle, Search } from "react-bootstrap-icons";

const Home = ({ alHacerClicIniciar, alHacerClicVerMapa }) => {
  return (
    /* Cambiamos a align-items-start para que las cards suban */
    <Container fluid className="claim-container d-flex align-items-start justify-content-center min-vh-100 bg-light">
      
      <Card className="border-0 bg-white text-dark p-4 text-center home-card shadow-sm">
        <Card.Body className="p-0">
          
          <div className="mb-4">
            <h4 className="fw-bold text-dark" style={{ fontSize: "1.5rem" }}>
              Gestión Ciudadana
            </h4>
            <p className="text-muted" style={{ fontSize: "0.95rem" }}>
              Tu canal directo para reportar problemas en tu barrio.
            </p>
          </div>

          <hr className="text-muted my-3" />

          {/* Botones */}
          <div className="d-flex flex-column gap-2 mt-3">
            <Button
              variant="primary"
              className="btn-submit w-100"
              onClick={alHacerClicIniciar}
            >
              <PlusCircle size={20} />
              Crear Nuevo Reclamo
            </Button>

            <Button
              variant="light"
              className="btn-back w-100"
              onClick={alHacerClicVerMapa}
            >
              <Search size={18} />
              Consultar Estado
            </Button>
          </div>
          
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
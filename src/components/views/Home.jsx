import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import { PlusCircle, Search } from "react-bootstrap-icons";

const Home = ({ alHacerClicIniciar, alHacerClicVerMapa }) => {
  return (
    <Container fluid className="claim-container bg-light">
      <Card className="border-0 bg-white text-dark text-center home-card shadow-sm">
        <Card.Body className="p-0 d-flex flex-column h-100">
          
          <div className="mb-5">
            <h4 className="fw-bold text-dark" style={{ fontSize: "1.6rem" }}>
              Gestión Ciudadana
            </h4>
            <p className="text-muted mt-2" style={{ fontSize: "1rem" }}>
              Tu canal directo para reportar problemas en tu barrio.
            </p>
          </div>

          <div className="mt-auto d-flex flex-column gap-3">
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
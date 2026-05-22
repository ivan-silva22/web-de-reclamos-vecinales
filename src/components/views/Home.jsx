import React from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { PlusCircle, Search } from "react-bootstrap-icons";

const Home = ({ alHacerClicIniciar, alHacerClicVerMapa }) => {
  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 py-4 bg-light">
      <Card className="border-0 bg-white text-dark p-4 text-center home-card">
        <Card.Body>
          {/* Encabezado Institucional */}
          <div className="mb-4">
            <h3 className="fw-bold text-dark mt-1" style={{ fontSize: "1.65rem" }}>
              Gestión Ciudadana
            </h3>
            <p className="text-muted small px-1 mt-3">
              Tu canal directo para reportar problemas en tu barrio y seguir las
              soluciones en tiempo real.
            </p>
          </div>

          <hr className="text-muted my-4" style={{ opacity: "0.1" }} />

          {/* Botones de Acción */}
          <Row className="g-3">
            <Col xs={12}>
              <Button
                variant="primary"
                size="lg"
                className="w-100 py-3 fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2 btn-submit"
                onClick={alHacerClicIniciar}
              >
                <PlusCircle size={18} />
                Crear Nuevo Reclamo
              </Button>
            </Col>

            <Col xs={12}>
              <Button
                variant="outline-secondary"
                size="lg"
                className="w-100 py-3 fw-semibold text-dark border-secondary d-flex align-items-center justify-content-center gap-2"
                onClick={alHacerClicVerMapa}
                style={{ borderRadius: "6px", fontSize: "1rem" }}
              >
                <Search size={16} />
                Consultar Estado de Reclamos
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
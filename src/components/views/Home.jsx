import React from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
// Importamos los íconos oficiales de React Bootstrap
import { PlusCircle, Search } from "react-bootstrap-icons";

const Home = ({ alHacerClicIniciar, alHacerClicVerMapa }) => {
  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 py-4 bg-light">
      <Card
        className="shadow-sm border-0 bg-white text-dark p-4 text-center"
        style={{
          maxWidth: "450px",
          borderRadius: "16px",
          borderTop: "6px solid #003776",
        }}
      >
        <Card.Body>
          {/* Encabezado Institucional */}
          <div className="mb-4">
            <h3
              className="fw-bold text-dark mt-1"
              style={{ fontSize: "1.75rem" }}
            >
              Gestión Ciudadana
            </h3>
            <p className="text-muted small px-2 mt-3">
              Tu canal directo para reportar problemas en tu barrio y seguir las
              soluciones en tiempo real.
            </p>
          </div>

          <hr className="text-muted my-4" style={{ opacity: "0.15" }} />

          {/* Botones de Acción (Estilo Formal con Íconos) */}
          <Row className="g-3">
            <Col xs={12}>
              <Button
                variant="primary"
                size="lg"
                className="w-100 py-3 fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2"
                onClick={alHacerClicIniciar}
                style={{
                  backgroundColor: "#003776",
                  borderColor: "#003776",
                  borderRadius: "8px",
                  fontSize: "1.05rem",
                }}
              >
                <PlusCircle size={20} />
                Crear Nuevo Reclamo
              </Button>
            </Col>

            <Col xs={12}>
              <Button
                variant="outline-secondary"
                size="lg"
                className="w-100 py-3 fw-semibold text-dark border-secondary d-flex align-items-center justify-content-center gap-2"
                onClick={alHacerClicVerMapa}
                style={{
                  borderRadius: "8px",
                  fontSize: "1.05rem",
                  opacity: "0.8",
                }}
              >
                <Search size={18} />
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
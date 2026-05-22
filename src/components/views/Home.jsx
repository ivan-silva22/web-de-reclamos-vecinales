import React from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { PlusCircle, Search } from "react-bootstrap-icons";

const Home = ({ alHacerClicIniciar, alHacerClicVerMapa }) => {
  return (
    // CAMBIO CLAVE: Cambiamos 'align-items-center' por 'align-items-start' e incrementamos el padding superior (pt-5)
    <Container className="d-flex align-items-start justify-content-center min-vh-100 pt-5 pb-4 bg-light">
      {/* Añadimos un estilo inline mt-4 o mt-md-5 para calibrar la altura exacta del rebote superior */}
      <Card className="border-0 bg-white text-dark p-4 text-center home-card mt-4" style={{ marginTop: "12vh" }}>
        <Card.Body className="d-flex flex-column justify-content-between">
          
          {/* Encabezado Institucional */}
          <div className="mb-3">
            <h3 className="fw-bold text-dark mt-1" style={{ fontSize: "1.65rem" }}>
              Gestión Ciudadana
            </h3>
            <p className="text-muted small px-2 mt-3">
              Tu canal directo para reportar problemas en tu barrio y seguir las
              soluciones en tiempo real.
            </p>
          </div>

          <hr className="text-muted my-3" style={{ opacity: "0.1" }} />

          {/* Botones de Acción */}
          <Row className="g-3">
            <Col xs={12}>
              <Button
                variant="primary"
                size="lg"
                className="w-100 py-3 fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2 btn-submit"
                onClick={alHacerClicIniciar}
                style={{ fontSize: "0.95rem" }}
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
                style={{ borderRadius: "6px", fontSize: "0.95rem" }}
              >
                <Search size={16} />
                Consultar Estado
              </Button>
            </Col>
          </Row>
          
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
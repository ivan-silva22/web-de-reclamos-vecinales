import React from "react";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { PlusCircle, Search } from "react-bootstrap-icons";

const Home = ({ alHacerClicIniciar, alHacerClicVerMapa }) => {
  return (
    <Container className="d-flex align-items-start justify-content-center min-vh-100 pt-4 pb-4 bg-light">
      {/* CORRECCIÓN: Cambiamos el 12vh rígido por un margen adaptable en móviles (mt-3 mt-sm-5) */}
      <Card className="border-0 bg-white text-dark p-4 text-center home-card mt-3 mt-sm-5 shadow-sm">
        <Card.Body className="d-flex flex-column justify-content-between p-0">
          
          {/* Encabezado Institucional */}
          <div className="mb-2">
            <h4 className="fw-bold text-dark mt-1" style={{ fontSize: "1.45rem", letterSpacing: "-0.3px" }}>
              Gestión Ciudadana
            </h4>
            <p className="text-muted small px-1 mt-2.5" style={{ fontSize: "0.82rem", lineHeight: "1.4" }}>
              Tu canal directo para reportar problemas en tu barrio y seguir las
              soluciones en tiempo real.
            </p>
          </div>

          <hr className="text-muted my-2.5" style={{ opacity: "0.08" }} />

          {/* Botones de Acción */}
          <Row className="g-2.5">
            <Col xs={12}>
              <Button
                variant="primary"
                size="lg"
                className="w-100 py-3 fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2 btn-submit text-white"
                onClick={alHacerClicIniciar}
                style={{ fontSize: "0.92rem" }}
              >
                <PlusCircle size={16} />
                Crear Nuevo Reclamo
              </Button>
            </Col>

            <Col xs={12}>
              <Button
                variant="light"
                size="lg"
                className="w-100 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2 btn-back"
                onClick={alHacerClicVerMapa}
                style={{ fontSize: "0.92rem" }}
              >
                <Search size={14} />
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
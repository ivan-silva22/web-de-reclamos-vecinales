import React, { useState } from "react";
import { Container, Button, Card, Form, InputGroup } from "react-bootstrap";
import { ChevronLeft, Search, GeoAlt, CalendarEvent, InfoCircle } from "react-bootstrap-icons";

const ClaimStatus = ({ onClickBack }) => {
  const [claimCode, setClaimCode] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Simulamos una respuesta de la base de datos para la demo
    if (claimCode.trim() !== "") {
      setSearchResult({
        code: claimCode.toUpperCase(),
        date: "22/05/2026",
        category: "Alumbrado Público",
        address: "Av. San Martín 450",
        status: "En Proceso",
        details: "Cuadrilla técnica asignada para el recambio de luminarias LED."
      });
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 py-4 status-container">
      <Card className="shadow-sm border-0 bg-white text-dark p-3 w-100 status-card">
        <Card.Body>
          
          {/* Back Button */}
          <div className="d-flex mb-3">
            <Button
              variant="light"
              className="text-decoration-none text-secondary d-flex align-items-center gap-2 small px-3 py-1.5 btn-back text-white"
              onClick={onClickBack}
            >
              <ChevronLeft size={14} /> Volver al inicio
            </Button>
          </div>

          {/* Header */}
          <div className="mb-4">
            <h4 className="fw-bold text-dark mb-1 status-title">
              Seguimiento de Reclamo
            </h4>
            <p className="text-muted small mb-0">
              Ingrese el código otorgado al presentar su solicitud para conocer su estado.
            </p>
          </div>

          {/* Search Form */}
          <Form onSubmit={handleSearch} className="mb-4">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Ej: REC-1234"
                value={claimCode}
                onChange={(e) => setClaimCode(e.target.value)}
                required
                className="status-input"
              />
              <Button type="submit" variant="primary" className="btn-search px-3">
                <Search size={16} />
              </Button>
            </InputGroup>
          </Form>

          {/* Simulated Result Box */}
          {searchResult && (
            <div className="result-box p-3 animate__animated animate__fadeIn">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                <span className="fw-bold text-secondary small">CÓDIGO: {searchResult.code}</span>
                <span className="status-badge in-progress">{searchResult.status}</span>
              </div>

              <div className="mb-2 small d-flex align-items-center gap-2 text-dark">
                <CalendarEvent size={14} className="text-muted" />
                <span><strong>Fecha de alta:</strong> {searchResult.date}</span>
              </div>

              <div className="mb-2 small d-flex align-items-center gap-2 text-dark">
                <InfoCircle size={14} className="text-muted" />
                <span><strong>Categoría:</strong> {searchResult.category}</span>
              </div>

              <div className="mb-3 small d-flex align-items-center gap-2 text-dark">
                <GeoAlt size={14} className="text-muted" />
                <span><strong>Ubicación:</strong> {searchResult.address}</span>
              </div>

              <div className="p-2 bg-white rounded border small text-muted">
                <strong>Actualización interna:</strong> {searchResult.details}
              </div>
            </div>
          )}

        </Card.Body>
      </Card>
    </Container>
  );
};

export default ClaimStatus;
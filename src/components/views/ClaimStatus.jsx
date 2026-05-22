import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Button, Card, Form, InputGroup } from "react-bootstrap";
import { ChevronLeft, Search, GeoAlt, CalendarEvent, InfoCircle } from "react-bootstrap-icons";

const ClaimStatus = ({ onClickBack }) => {
  // Inicializamos react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [searchResult, setSearchResult] = useState(null);

  // React Hook Form nos pasa la data limpia si cumple con el formato requerido
  const onSubmit = (data) => {
    // Simulamos la búsqueda usando el código transformado a mayúsculas
    const cleanCode = data.claimCode.trim().toUpperCase();

    setSearchResult({
      code: cleanCode,
      date: "22/05/2026",
      category: "Alumbrado Público",
      address: "Av. San Martín 450",
      status: "En Proceso",
      details: "Cuadrilla asignada para el recambio de luminarias."
    });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 py-4 status-container">
      <Card className="border-0 bg-white text-dark p-3 w-100 status-card" style={{ maxWidth: "550px" }}>
        <Card.Body>
          
          <div className="d-flex mb-3">
            <Button variant="light" className="btn-back d-flex align-items-center gap-2" onClick={onClickBack}>
              <ChevronLeft size={14} /> Volver al inicio
            </Button>
          </div>

          <div className="mb-4">
            <h4 className="fw-bold mb-1 status-title">Seguimiento de Reclamo</h4>
            <p className="text-muted small mb-0">Ingrese el código de su solicitud.</p>
          </div>

          <Form onSubmit={handleSubmit(onSubmit)} noValidate className="mb-4">
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Ej: REC-1234"
                className="status-input"
                {...register("claimCode", { 
                  required: "El código es obligatorio para buscar.",
                  pattern: {
                    value: /^[a-zA-Z]{3}-[0-9]{4}$/,
                    message: "Formato inválido. Debe ser como 'REC-1234'"
                  }
                })}
                isInvalid={!!errors.claimCode}
              />
              <Button type="submit" variant="primary" className="btn-search px-3 text-white">
                <Search size={16} />
              </Button>

              {/* El feedback de error se acopla abajo del inputgroup */}
              <Form.Control.Feedback type="invalid" className="d-block mt-1 small">
                {errors.claimCode?.message}
              </Form.Control.Feedback>
            </InputGroup>
          </Form>

          {/* Tarjeta de Resultados */}
          {searchResult && (
            <div className="result-box p-3 border rounded shadow-sm bg-light">
              <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                <span className="fw-bold text-secondary small">CÓDIGO: {searchResult.code}</span>
                <span className="status-badge in-progress px-2 py-1 rounded bg-warning text-dark fw-semibold small">
                  {searchResult.status}
                </span>
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
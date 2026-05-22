import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Button, Card, Form, InputGroup } from "react-bootstrap";
import { ChevronLeft, Search, GeoAlt, CalendarEvent, InfoCircle } from "react-bootstrap-icons";

const ClaimStatus = ({ onClickBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [searchResult, setSearchResult] = useState(null);

  const onSubmit = (data) => {
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
    <Container className="d-flex align-items-start justify-content-center min-vh-100 pt-4 pb-4 bg-light status-container">
      {/* CORRECCIÓN: Removido el marginTop inline exagerado para que entre el cuadro de resultados sin desbordar */}
      <Card className="border-0 bg-white text-dark p-3 p-sm-4 text-center status-card mt-3 mt-sm-5">
        <Card.Body className="d-flex flex-column justify-content-between text-start p-0">
          
          <div>
            {/* Botón Volver */}
            <div className="d-flex mb-2.5">
              <Button variant="light" className="btn-back d-flex align-items-center gap-1.5 py-1 px-2.5" onClick={onClickBack} style={{ fontSize: "0.8rem" }}>
                <ChevronLeft size={12} /> Volver al inicio
              </Button>
            </div>

            {/* Encabezado */}
            <div className="mb-3.5">
              <h5 className="fw-bold mb-1 status-title" style={{ fontSize: "1.35rem" }}>Seguimiento de Reclamo</h5>
              <p className="text-muted small mb-0" style={{ fontSize: "0.8rem" }}>Ingrese el código de su solicitud.</p>
            </div>

            {/* Formulario de Búsqueda */}
            <Form onSubmit={handleSubmit(onSubmit)} noValidate className="mb-3">
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Ej: REC-1234"
                  className="status-input"
                  {...register("claimCode", { 
                    required: "El código es obligatorio.",
                    pattern: {
                      value: /^[a-zA-Z]{3}-[0-9]{4}$/,
                      message: "Formato inválido. Ejemplo: 'REC-1234'"
                    }
                  })}
                  isInvalid={!!errors.claimCode}
                  style={{ fontSize: "0.88rem" }} /* Reducido sutilmente para mobile */
                />
                <Button type="submit" variant="primary" className="btn-search px-3 text-white d-flex align-items-center justify-content-center">
                  <Search size={14} />
                </Button>

                <Form.Control.Feedback type="invalid" className="d-block mt-1 small text-start" style={{ fontSize: "0.75rem" }}>
                  {errors.claimCode?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form>
          </div>

          {/* Tarjeta de Resultados Optimizada */}
          {searchResult && (
            <div className="result-box p-3 border rounded shadow-sm bg-light mt-1 text-start" style={{ fontSize: "0.82rem" }}>
              <div className="d-flex justify-content-between align-items-center mb-2.5 border-bottom pb-2">
                <span className="fw-bold text-secondary" style={{ fontSize: "0.72rem" }}>CÓDIGO: {searchResult.code}</span>
                <span className="status-badge in-progress px-2 py-0.5 rounded bg-warning text-dark fw-semibold" style={{ fontSize: "0.7rem" }}>
                  {searchResult.status}
                </span>
              </div>

              {/* CORRECCIÓN: Añadido text-truncate o flex-wrap para evitar roturas si las direcciones son largas */}
              <div className="mb-2 d-flex align-items-center gap-2 text-dark">
                <CalendarEvent size={13} className="text-secondary opacity-70" />
                <span><strong>Fecha:</strong> {searchResult.date}</span>
              </div>

              <div className="mb-2 d-flex align-items-center gap-2 text-dark">
                <InfoCircle size={13} className="text-secondary opacity-70" />
                <span><strong>Categoría:</strong> {searchResult.category}</span>
              </div>

              <div className="mb-2.5 d-flex align-items-start gap-2 text-dark">
                <GeoAlt size={13} className="text-secondary opacity-70 mt-0.5" />
                <span className="text-wrap"><strong>Ubicación:</strong> {searchResult.address}</span>
              </div>

              <div className="p-2 bg-white rounded border text-muted" style={{ fontSize: "0.78rem", lineHeight: "1.3" }}>
                <strong>Actualización:</strong> {searchResult.details}
              </div>
            </div>
          )}
          
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ClaimStatus;
import React, { useState } from "react";
import { Container, Button, Card, Form, Row, Col } from "react-bootstrap";
import { Person, Telephone, GeoAlt, CardText, FileEarmarkImage, ChevronLeft, CheckCircleFill } from "react-bootstrap-icons";

const ClaimForm = ({ onClickBack }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    category: "",
    address: "",
    description: "",
    imageFile: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [claimCode, setClaimCode] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedCode = `REC-${randomNum}`;
    setClaimCode(generatedCode);
    setSubmitted(true);
    console.log("Submitted data:", { ...formData, code: generatedCode });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 py-4 claim-container">
      <Card className="border-0 bg-white text-dark p-3 w-100 claim-card">
        <Card.Body>
          
          {submitted ? (
            <div className="text-center py-4">
              <CheckCircleFill size={52} className="text-success mb-3" />
              <h4 className="fw-bold text-dark mb-2">¡Reclamo Registrado!</h4>
              <p className="text-muted small mb-4">
                La solicitud fue enviada correctamente.
              </p>

              <div className="success-box p-3 mb-4">
                <span className="text-secondary small fw-semibold d-block mb-2">
                  CÓDIGO DE SEGUIMIENTO ÚNICO
                </span>
                <div className="generated-code mb-2">
                  {claimCode}
                </div>
                <Form.Text className="text-muted d-block" style={{ fontSize: "0.78rem" }}>
                  Use este código para consultar el avance de su reclamo desde el menú principal.
                </Form.Text>
              </div>

              <Button variant="primary" className="w-100 py-2.5 fw-semibold btn-submit" onClick={onClickBack}>
                Volver al Inicio
              </Button>
            </div>
          ) : (
            <>
              <div className="d-flex mb-3">
                <Button variant="light" className="btn-back d-flex align-items-center gap-2" onClick={onClickBack}>
                  <ChevronLeft size={14} /> Volver al inicio
                </Button>
              </div>

              <div className="mb-4">
                <h4 className="fw-bold mb-1 claim-title">Nueva Solicitud de Reclamo</h4>
                <p className="text-muted small mb-0">Complete los campos para registrar la situación.</p>
              </div>

              <Form onSubmit={handleSubmit}>
                {/* Solución Responsiva: En móviles va uno abajo del otro, en escritorio divididos */}
                <Row className="g-3 mb-3">
                  <Form.Group as={Col} xs={12} md={6} controlId="formFullName">
                    <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1">
                      <Person size={14} /> Nombre completo
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="Ej: Juan Pérez"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="claim-input"
                    />
                  </Form.Group>

                  <Form.Group as={Col} xs={12} md={6} controlId="formPhoneNumber">
                    <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1">
                      <Telephone size={14} /> Teléfono celular
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="phoneNumber"
                      placeholder="Ej: 3865XXXXXX"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      className="claim-input"
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formCategory">
                  <Form.Label className="small fw-semibold text-secondary">Tipo de problema</Form.Label>
                  <Form.Select name="category" value={formData.category} onChange={handleChange} required className="claim-input">
                    <option value="">Seleccione una categoría...</option>
                    <option value="alumbrado">Alumbrado Público (Luz quemada / Falta de poste)</option>
                    <option value="bacheo">Bacheo y Calzada (Pozos / Rotura de asfalto)</option>
                    <option value="residuos">Higiene Urbana (Basurales / Fallas en recolección)</option>
                    <option value="cloacas">Agua y Cloacas (Pérdidas de agua / Desbordes)</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1">
                    <GeoAlt size={14} /> Dirección del inconveniente
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Ej: Av. San Martín 450 o Esquina Belgrano"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="claim-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1">
                    <CardText size={14} /> Detalles del problema
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    placeholder="Escriba una breve referencia..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="claim-input"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formImage">
                  <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1">
                    <FileEarmarkImage size={14} /> Adjuntar fotografía (Opcional)
                  </Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handleFileChange} className="claim-input" />
                  <Form.Text className="text-muted claim-help-text">Subir una foto ayuda a priorizar la solución.</Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-2.5 fw-semibold shadow-sm btn-submit">
                  Presentar Reclamo
                </Button>
              </Form>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ClaimForm;
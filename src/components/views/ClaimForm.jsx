import React, { useState } from "react";
import { Container, Button, Card, Form, Row, Col } from "react-bootstrap";
import { Person, Telephone, GeoAlt, CardText, FileEarmarkImage, ChevronLeft } from "react-bootstrap-icons";


const ClaimForm = ({ onClickBack }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    category: "",
    address: "",
    description: "",
    imageFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 py-4 claim-container">
      <Card className="shadow-sm border-0 bg-white text-dark p-3 w-100 claim-card">
        <Card.Body>
          {/* Back Button Modernizado */}
          <div className="d-flex mb-3">
            <Button
              variant="light"
              className="text-decoration-none text-secondary d-flex align-items-center gap-2 small px-3 py-1.5 btn-back text-white"
              onClick={onClickBack}
            >
              <ChevronLeft size={14} /> Volver al inicio
            </Button>
          </div>

          {/* Form Header */}
          <div className="mb-4">
            <h4 className="fw-bold text-dark mb-1 claim-title">
              Nueva Solicitud de Reclamo
            </h4>
            <p className="text-muted small mb-0">
              Complete los campos para registrar la situación en su barrio.
            </p>
          </div>

          <Form onSubmit={handleSubmit}>
            {/* Section: Citizen Data */}
            <Row className="g-2 mb-3">
              <Form.Group as={Col} xs={6} controlId="formFullName">
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

              <Form.Group as={Col} xs={6} controlId="formPhoneNumber">
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

            {/* Section: Claim Category */}
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label className="small fw-semibold text-secondary">
                Tipo de problema
              </Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="claim-input"
              >
                <option value="">Seleccione una categoría...</option>
                <option value="alumbrado">Alumbrado Público (Luz quemada / Falta de poste)</option>
                <option value="bacheo">Bacheo y Calzada (Pozos / Rotura de asfalto)</option>
                <option value="residuos">Higiene Urbana (Basurales / Fallas en recolección)</option>
                <option value="cloacas">Agua y Cloacas (Pérdidas de agua / Desbordes)</option>
              </Form.Select>
            </Form.Group>

            {/* Section: Address */}
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

            {/* Section: Description */}
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1">
                <CardText size={14} /> Detalles del problema
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Escriba una breve referencia para ayudar a las cuadrillas..."
                value={formData.description}
                onChange={handleChange}
                required
                className="claim-input"
              />
            </Form.Group>

            {/* Section: Attach Image */}
            <Form.Group className="mb-4" controlId="formImage">
              <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1">
                <FileEarmarkImage size={14} /> Adjuntar fotografía (Opcional)
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="claim-input"
              />
              <Form.Text className="text-muted claim-help-text">
                Subir una foto ayuda a priorizar la solución del reclamo.
              </Form.Text>
            </Form.Group>

            {/* Submit Button */}
            <Button
              variant="primary"
              type="submit"
              className="w-100 py-2.5 fw-semibold shadow-sm btn-submit"
            >
              Presentar Reclamo
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ClaimForm;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Button, Card, Form } from "react-bootstrap";
import { ChevronLeft, CheckCircleFill } from "react-bootstrap-icons";

const ClaimForm = ({ onClickBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [submitted, setSubmitted] = useState(false);
  const [claimCode, setClaimCode] = useState("");

  const onSubmit = (data) => {
    // Lógica para enviar el formulario
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedCode = `REC-${randomNum}`;
    setClaimCode(generatedCode);
    setSubmitted(true);
  };

  return (
    <Container fluid className="claim-container bg-light">
      <Card 
        className="border-0 bg-white text-dark shadow-sm claim-card"
        style={{ maxWidth: "440px" }}
      >
        <Card.Body className="p-0">
          
          {submitted ? (
            <div className="text-center py-4">
              <CheckCircleFill size={48} className="text-success mb-3" />
              <h4 className="fw-bold mb-2">¡Reclamo Registrado!</h4>
              <p className="text-muted mb-4" style={{ fontSize: "1.05rem" }}>
                La solicitud fue enviada correctamente.
              </p>

              <div className="success-box p-4 bg-light border rounded">
                <span className="text-uppercase fw-bold text-secondary" style={{ fontSize: "0.8rem" }}>
                  Código de seguimiento
                </span>
                <div className="generated-code d-block my-2">
                  {claimCode}
                </div>
              </div>

              <Button 
                variant="primary" 
                className="btn-submit w-100 mt-4" 
                onClick={onClickBack}
              >
                Volver al Inicio
              </Button>
            </div>
          ) : (
            <>
              {/* Encabezado */}
              <div className="mb-4">
                <Button 
                  variant="link" 
                  className="p-0 text-decoration-none d-flex align-items-center mb-2 btn-back" 
                  onClick={onClickBack} 
                  
                >
                  <ChevronLeft size={18} /> Volver al Inicio
                </Button>
                <h4 className="fw-bold mb-1 mt-5">Nueva Solicitud</h4>
                <p className="text-muted" style={{ fontSize: "1.05rem" }}>
                  Complete los campos para registrar la situación.
                </p>
              </div>

              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Form.Group className="mb-3" controlId="formFullName">
                  <Form.Label className="fw-semibold text-secondary fs-6">Nombre completo</Form.Label>
                  <Form.Control type="text" placeholder="Ej: Juan Pérez" className="claim-input" {...register("fullName", { required: true })} isInvalid={!!errors.fullName} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhoneNumber">
                  <Form.Label className="fw-semibold text-secondary fs-6">Teléfono celular</Form.Label>
                  <Form.Control type="tel" placeholder="Ej: 3865XXXXXX" className="claim-input" {...register("phoneNumber", { required: true })} isInvalid={!!errors.phoneNumber} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCategory">
                  <Form.Label className="fw-semibold text-secondary fs-6">Tipo de problema</Form.Label>
                  <Form.Select className="claim-input" {...register("category", { required: true })} isInvalid={!!errors.category}>
                    <option value="">Seleccione una opción...</option>
                    <option value="alumbrado">Alumbrado Público</option>
                    <option value="bacheo">Bacheo y Calzada</option>
                    <option value="residuos">Higiene Urbana</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label className="fw-semibold text-secondary fs-6">Dirección</Form.Label>
                  <Form.Control type="text" placeholder="Ej: Av. San Martín 450" className="claim-input" {...register("address", { required: true })} isInvalid={!!errors.address} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label className="fw-semibold text-secondary fs-6">Detalles del problema</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Breve descripción..." className="claim-input" {...register("description", { required: true })} isInvalid={!!errors.description} />
                </Form.Group>

                {/* Campo de fotografía opcional */}
                <Form.Group className="mb-4" controlId="formImage">
                  <Form.Label className="fw-semibold text-secondary fs-6">
                    Foto del problema (opcional)
                  </Form.Label>
                  <Form.Control 
                    type="file" 
                    accept="image/*" 
                    className="claim-input" 
                    {...register("imageFile")}
                  />
                </Form.Group>

                <Button type="submit" className="btn-submit w-100">
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
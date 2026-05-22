import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Button, Card, Form, Row, Col } from "react-bootstrap";
import { Person, Telephone, GeoAlt, CardText, FileEarmarkImage, ChevronLeft, CheckCircleFill } from "react-bootstrap-icons";

const ClaimForm = ({ onClickBack }) => {
  // Inicializamos react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [submitted, setSubmitted] = useState(false);
  const [claimCode, setClaimCode] = useState("");

  // React Hook Form nos pasa los datos ya validados aquí
  const onSubmit = (data) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedCode = `REC-${randomNum}`;
    
    // Tratamiento especial opcional para el archivo adjunto
    const fileSelected = data.imageFile && data.imageFile.length > 0 ? data.imageFile[0] : null;

    const finalData = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      category: data.category,
      address: data.address,
      description: data.description,
      imageFile: fileSelected,
      code: generatedCode
    };

    setClaimCode(generatedCode);
    setSubmitted(true);
    console.log("Submitted data:", finalData);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 py-4 claim-container">
      <Card className="border-0 bg-white text-dark p-3 w-100 claim-card" style={{ maxWidth: "700px" }}>
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

              <Button variant="primary" className="w-100 py-2.5 fw-semibold btn-submit text-white" onClick={onClickBack}>
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

              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                
                <Row className="g-3 mb-3">
                  {/* Nombre Completo */}
                  <Form.Group as={Col} xs={12} md={6} controlId="formFullName">
                    <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1">
                      <Person size={14} /> Nombre completo
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ej: Juan Pérez"
                      className="claim-input"
                      {...register("fullName", { 
                        required: "El nombre completo es obligatorio.",
                        minLength: { value: 4, message: "Debe ingresar nombre y apellido válido." }
                      })}
                      isInvalid={!!errors.fullName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fullName?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Teléfono Celular */}
                  <Form.Group as={Col} xs={12} md={6} controlId="formPhoneNumber">
                    <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1">
                      <Telephone size={14} /> Teléfono celular
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Ej: 3865XXXXXX"
                      className="claim-input"
                      {...register("phoneNumber", { 
                        required: "El teléfono es obligatorio.",
                        pattern: {
                          value: /^[0-9]{10,14}$/,
                          message: "Ingrese un número válido (ej: 3865XXXXXX, sin 0 ni 15)."
                        }
                      })}
                      isInvalid={!!errors.phoneNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phoneNumber?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {/* Categoría */}
                <Form.Group className="mb-3" controlId="formCategory">
                  <Form.Label className="small fw-semibold text-secondary">Tipo de problema</Form.Label>
                  <Form.Select 
                    className="claim-input"
                    {...register("category", { required: "Debe seleccionar una categoría." })}
                    isInvalid={!!errors.category}
                  >
                    <option value="">Seleccione una categoría...</option>
                    <option value="alumbrado">Alumbrado Público (Luz quemada / Falta de poste)</option>
                    <option value="bacheo">Bacheo y Calzada (Pozos / Rotura de asfalto)</option>
                    <option value="residuos">Higiene Urbana (Basurales / Fallas en recolección)</option>
                    <option value="cloacas">Agua y Cloacas (Pérdidas de agua / Desbordes)</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.category?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Dirección */}
                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1">
                    <GeoAlt size={14} /> Dirección del inconveniente
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Av. San Martín 450 o Esquina Belgrano"
                    className="claim-input"
                    {...register("address", { 
                      required: "La ubicación del problema es obligatoria.",
                      minLength: { value: 5, message: "Aporte más precisión sobre la dirección." }
                    })}
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Detalles del Problema */}
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1">
                    <CardText size={14} /> Detalles del problema
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Escriba una breve referencia..."
                    className="claim-input"
                    {...register("description", { 
                      required: "Los detalles son obligatorios para procesar el reclamo.",
                      minLength: { value: 10, message: "Por favor, describa un poco más la situación." }
                    })}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Input de Fotografía Opcional */}
                <Form.Group className="mb-4" controlId="formImage">
                  <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1">
                    <FileEarmarkImage size={14} /> Adjuntar fotografía (Opcional)
                  </Form.Label>
                  <Form.Control 
                    type="file" 
                    accept="image/*" 
                    className="claim-input" 
                    {...register("imageFile")}
                  />
                  <Form.Text className="text-muted claim-help-text">Subir una foto ayuda a priorizar la solución.</Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-2.5 fw-semibold shadow-sm btn-submit text-white">
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
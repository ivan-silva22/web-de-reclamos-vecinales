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
    // ALINEACIÓN PERFECTA: Modificado a 'align-items-start' con la separación 'pt-5' coordinada
    <Container className="d-flex align-items-start justify-content-center min-vh-100 pt-5 pb-4 bg-light claim-container">
      
      {/* DINAMISMO VISUAL: Si ya se envió, achica el max-width a 350px (look Home), sino usa 440px para albergar bien el formulario */}
      <Card 
        className="border-0 bg-white text-dark p-4 text-center claim-card mt-4" 
        style={{ 
          marginTop: "12vh", 
          maxWidth: submitted ? "350px" : "440px",
          transition: "max-width 0.3s ease" 
        }}
      >
        <Card.Body className="d-flex flex-column justify-content-between p-0 text-start">
          
          {submitted ? (
            // === VISTA DE RECLAMO REGISTRADO (CÓDIGO GENERADO) ===
            <div className="text-center py-2 d-flex flex-column justify-content-between h-100">
              <div>
                <CheckCircleFill size={48} className="text-success mb-3 mt-2" />
                <h4 className="fw-bold text-dark mb-2">¡Reclamo Registrado!</h4>
                <p className="text-muted small mb-4 px-2">
                  La solicitud fue enviada correctamente a la base de datos municipal.
                </p>

                <div className="success-box p-3 mb-4 bg-light rounded border">
                  <span className="text-secondary small fw-semibold d-block mb-2" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>
                    CÓDIGO DE SEGUIMIENTO ÚNICO
                  </span>
                  <div className="generated-code mb-2">
                    {claimCode}
                  </div>
                  <Form.Text className="text-muted d-block mt-2 px-1" style={{ fontSize: "0.78rem", lineHeight: "1.3" }}>
                    Use este código para consultar el avance de su reclamo desde el menú principal.
                  </Form.Text>
                </div>
              </div>

              <Button 
                variant="primary" 
                className="w-100 py-3 fw-semibold btn-submit text-white mt-3" 
                onClick={onClickBack}
                style={{ fontSize: "0.95rem" }}
              >
                Volver al Inicio
              </Button>
            </div>
          ) : (
            // === VISTA DEL FORMULARIO DE ALTA ===
            <>
              <div>
                {/* Botón Volver */}
                <div className="d-flex mb-3">
                  <Button variant="light" className="btn-back d-flex align-items-center gap-2" onClick={onClickBack}>
                    <ChevronLeft size={14} /> Volver al inicio
                  </Button>
                </div>

                {/* Encabezado */}
                <div className="mb-4">
                  <h4 className="fw-bold mb-1 claim-title">Nueva Solicitud de Reclamo</h4>
                  <p className="text-muted small mb-0">Complete los campos para registrar la situación.</p>
                </div>

                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                  
                  {/* Nombre Completo y Teléfono en columnas apilables */}
                  <Row className="g-3 mb-3">
                    <Form.Group as={Col} xs={12} controlId="formFullName">
                      <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1 mb-1">
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
                        style={{ fontSize: "0.95rem" }}
                      />
                      <Form.Control.Feedback type="invalid" style={{ fontSize: "0.8rem" }}>
                        {errors.fullName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} xs={12} controlId="formPhoneNumber">
                      <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1 mb-1">
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
                            message: "Ingrese un número válido (sin 0 ni 15)."
                          }
                        })}
                        isInvalid={!!errors.phoneNumber}
                        style={{ fontSize: "0.95rem" }}
                      />
                      <Form.Control.Feedback type="invalid" style={{ fontSize: "0.8rem" }}>
                        {errors.phoneNumber?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  {/* Categoría */}
                  <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label className="small fw-semibold text-secondary mb-1">Tipo de problema</Form.Label>
                    <Form.Select 
                      className="claim-input"
                      {...register("category", { required: "Debe seleccionar una categoría." })}
                      isInvalid={!!errors.category}
                      style={{ fontSize: "0.95rem" }}
                    >
                      <option value="">Seleccione una categoría...</option>
                      <option value="alumbrado">Alumbrado Público (Luz quemada)</option>
                      <option value="bacheo">Bacheo y Calzada (Pozos)</option>
                      <option value="residuos">Higiene Urbana (Basurales)</option>
                      <option value="cloacas">Agua y Cloacas (Pérdidas)</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" style={{ fontSize: "0.8rem" }}>
                      {errors.category?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Dirección */}
                  <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1 mb-1">
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
                      style={{ fontSize: "0.95rem" }}
                    />
                    <Form.Control.Feedback type="invalid" style={{ fontSize: "0.8rem" }}>
                      {errors.address?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Detalles del Problema */}
                  <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1 mb-1">
                      <CardText size={14} /> Detalles del problema
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2} /* Bajamos de 3 a 2 para mantener la esbeltez vertical */
                      placeholder="Escriba una breve referencia..."
                      className="claim-input"
                      {...register("description", { 
                        required: "Los detalles son obligatorios.",
                        minLength: { value: 10, message: "Por favor, describa un poco más." }
                      })}
                      isInvalid={!!errors.description}
                      style={{ fontSize: "0.95rem" }}
                    />
                    <Form.Control.Feedback type="invalid" style={{ fontSize: "0.8rem" }}>
                      {errors.description?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Input de Fotografía Opcional */}
                  <Form.Group className="mb-4" controlId="formImage">
                    <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1 mb-1">
                      <FileEarmarkImage size={14} /> Adjuntar fotografía (Opcional)
                    </Form.Label>
                    <Form.Control 
                      type="file" 
                      accept="image/*" 
                      className="claim-input" 
                      {...register("imageFile")}
                      style={{ fontSize: "0.9rem" }}
                    />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 py-3 fw-semibold shadow-sm btn-submit text-white"
                    style={{ fontSize: "0.95rem" }}
                  >
                    Presentar Reclamo
                  </Button>
                </Form>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ClaimForm;
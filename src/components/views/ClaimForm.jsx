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
    // CAMBIO CLAVE: pt-4 en móviles y pt-sm-5 en pantallas más grandes para calibrar el inicio del scroll
    <Container className="d-flex align-items-start justify-content-center min-vh-100 pt-4 pt-sm-5 pb-4 bg-light claim-container">
      
      {/* OPTIMIZACIÓN MÓVIL: Cambiamos p-4 fijo por p-3 en móviles (p-sm-4 en PC) y reducimos el margen superior a mt-2 en pantallas chicas */}
      <Card 
        className="border-0 bg-white text-dark p-3 p-sm-4 text-center claim-card mt-2 mt-sm-4 shadow-sm" 
        style={{ 
          marginTop: "6vh", 
          maxWidth: submitted ? "340px" : "410px", // Anchos súper delgados y móviles
          width: "90%",
          transition: "all 0.3s ease",
          borderRadius: "14px"
        }}
      >
        <Card.Body className="d-flex flex-column justify-content-between p-0 text-start">
          
          {submitted ? (
            // === VISTA DE RECLAMO REGISTRADO (CÓDIGO COMPACTO) ===
            <div className="text-center py-1 d-flex flex-column justify-content-between h-auto">
              <div>
                <CheckCircleFill size={42} className="text-success mb-2 mt-1" />
                <h5 className="fw-bold text-dark mb-1" style={{ fontSize: "1.3rem" }}>¡Reclamo Registrado!</h5>
                <p className="text-muted small mb-3 px-1" style={{ fontSize: "0.82rem" }}>
                  La solicitud fue enviada correctamente.
                </p>

                {/* Caja de éxito ultra compacta */}
                <div className="success-box p-2.5 mb-3 bg-light rounded border">
                  <span className="text-secondary small fw-bold d-block mb-1" style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}>
                    CÓDIGO DE SEGUIMIENTO ÚNICO
                  </span>
                  <div className="generated-code mb-1" style={{ fontSize: "1.6rem", fontWeight: "700", color: "#212529", letterSpacing: "1px" }}>
                    {claimCode}
                  </div>
                  <Form.Text className="text-muted d-block mt-1 px-1" style={{ fontSize: "0.75rem", lineHeight: "1.2" }}>
                    Guarde este código para consultar el avance del reclamo.
                  </Form.Text>
                </div>
              </div>

              <Button 
                variant="primary" 
                className="w-100 py-2.5 fw-semibold btn-submit text-white mt-2" 
                onClick={onClickBack}
                style={{ fontSize: "0.9rem", borderRadius: "8px" }}
              >
                Volver al Inicio
              </Button>
            </div>
          ) : (
            // === VISTA DEL FORMULARIO DE ALTA COMPACTADO ===
            <>
              <div>
                {/* Botón Volver */}
                <div className="d-flex mb-2">
                  <Button variant="light" className="btn-back d-flex align-items-center gap-1 py-1 px-2" onClick={onClickBack} style={{ fontSize: "0.8rem" }}>
                    <ChevronLeft size={12} /> Volver
                  </Button>
                </div>

                {/* Encabezado */}
                <div className="mb-3">
                  <h5 className="fw-bold mb-0 claim-title" style={{ fontSize: "1.35rem" }}>Nueva Solicitud</h5>
                  <p className="text-muted small mb-0" style={{ fontSize: "0.8rem" }}>Complete los campos para registrar la situación.</p>
                </div>

                <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                  
                  {/* Nombre Completo */}
                  <Form.Group className="mb-2" controlId="formFullName">
                    <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1 mb-1" style={{ fontSize: "0.8rem" }}>
                      <Person size={13} /> Nombre completo
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ej: Juan Pérez"
                      className="claim-input py-2"
                      {...register("fullName", { 
                        required: "El nombre es obligatorio.",
                        minLength: { value: 4, message: "Ingrese nombre y apellido." }
                      })}
                      isInvalid={!!errors.fullName}
                      style={{ fontSize: "0.88rem", borderRadius: "6px" }}
                    />
                    <Form.Control.Feedback type="invalid" style={{ fontSize: "0.75rem" }}>
                      {errors.fullName?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Teléfono Celular */}
                  <Form.Group className="mb-2" controlId="formPhoneNumber">
                    <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1 mb-1" style={{ fontSize: "0.8rem" }}>
                      <Telephone size={13} /> Teléfono celular
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Ej: 3865XXXXXX"
                      className="claim-input py-2"
                      {...register("phoneNumber", { 
                        required: "El teléfono es obligatorio.",
                        pattern: {
                          value: /^[0-9]{10,14}$/,
                          message: "Número inválido (sin 0 ni 15)."
                        }
                      })}
                      isInvalid={!!errors.phoneNumber}
                      style={{ fontSize: "0.88rem", borderRadius: "6px" }}
                    />
                    <Form.Control.Feedback type="invalid" style={{ fontSize: "0.75rem" }}>
                      {errors.phoneNumber?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Categoría */}
                  <Form.Group className="mb-2" controlId="formCategory">
                    <Form.Label className="small fw-semibold text-secondary mb-1" style={{ fontSize: "0.8rem" }}>Tipo de problema</Form.Label>
                    <Form.Select 
                      className="claim-input py-2"
                      {...register("category", { required: "Seleccione una categoría." })}
                      isInvalid={!!errors.category}
                      style={{ fontSize: "0.88rem", borderRadius: "6px" }}
                    >
                      <option value="">Seleccione una opción...</option>
                      <option value="alumbrado">Alumbrado Público</option>
                      <option value="bacheo">Bacheo y Calzada</option>
                      <option value="residuos">Higiene Urbana</option>
                      <option value="cloacas">Agua y Cloacas</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" style={{ fontSize: "0.75rem" }}>
                      {errors.category?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Dirección */}
                  <Form.Group className="mb-2" controlId="formAddress">
                    <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1 mb-1" style={{ fontSize: "0.8rem" }}>
                      <GeoAlt size={13} /> Dirección del inconveniente
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ej: Av. San Martín 450"
                      className="claim-input py-2"
                      {...register("address", { 
                        required: "La ubicación es obligatoria.",
                        minLength: { value: 5, message: "Aporte más precisión." }
                      })}
                      isInvalid={!!errors.address}
                      style={{ fontSize: "0.88rem", borderRadius: "6px" }}
                    />
                    <Form.Control.Feedback type="invalid" style={{ fontSize: "0.75rem" }}>
                      {errors.address?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Detalles del Problema */}
                  <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1 mb-1" style={{ fontSize: "0.8rem" }}>
                      <CardText size={13} /> Detalles del problema
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Breve referencia del problema..."
                      className="claim-input py-1.5"
                      {...register("description", { 
                        required: "Los detalles son obligatorios.",
                        minLength: { value: 10, message: "Describa un poco más." }
                      })}
                      isInvalid={!!errors.description}
                      style={{ fontSize: "0.88rem", borderRadius: "6px" }}
                    />
                    <Form.Control.Feedback type="invalid" style={{ fontSize: "0.75rem" }}>
                      {errors.description?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Input de Fotografía Opcional */}
                  <Form.Group className="mb-3.5" controlId="formImage">
                    <Form.Control 
                      type="file" 
                      accept="image/*" 
                      className="claim-input py-1.5" 
                      {...register("imageFile")}
                      style={{ fontSize: "0.82rem", borderRadius: "6px" }}
                    />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 py-2.5 fw-semibold shadow-sm btn-submit text-white"
                    style={{ fontSize: "0.92rem", borderRadius: "8px" }}
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
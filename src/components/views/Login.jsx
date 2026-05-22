import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Button, Card, Form, Alert } from "react-bootstrap";
import { ShieldLock, Key, Person, ChevronLeft } from "react-bootstrap-icons";

const Login = ({ onLoginSuccess, onClickBack }) => {
  // Inicializamos react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Estado para controlar errores de credenciales
  const [loginError, setLoginError] = useState("");

  const onSubmit = (data) => {
    setLoginError("");
    
    if (data.username === "admin" && data.password === "alberdi2026") {
      onLoginSuccess();
    } else {
      setLoginError("Credenciales incorrectas. Verifique los datos de acceso.");
    }
  };

  return (
    // SOLUCIÓN CLAVE: Añadimos 'px-3' para dar el margen lateral exacto en celulares y evitar que la tarjeta toque los bordes
    <Container className="d-flex align-items-center justify-content-center min-vh-100 py-4 px-3 login-container bg-light">
      
      {/* OPTIMIZACIÓN: Ajustamos padding interno 'p-3 p-sm-4' y reducimos sutilmente el maxWidth para pantallas móviles */}
      <Card 
        className="border-0 bg-white text-dark p-3 p-sm-4 w-100 login-card shadow-sm" 
        style={{ 
          maxWidth: "390px", 
          borderRadius: "14px"
        }}
      >
        <Card.Body className="p-0">
          
          {/* Botón Volver Compacto */}
          <div className="d-flex mb-3">
            <Button 
              variant="light" 
              className="btn-back d-flex align-items-center gap-1 py-1 px-2" 
              onClick={onClickBack}
              style={{ fontSize: "0.8rem" }}
            >
              <ChevronLeft size={12} /> Volver
            </Button>
          </div>

          <div className="text-center mb-4">
            <ShieldLock size={32} className="mb-2" style={{ color: "#003776" }} />
            <h5 className="fw-bold login-title mb-1" style={{ fontSize: "1.35rem" }}>Acceso Interno</h5>
            <p className="text-muted small mb-0" style={{ fontSize: "0.8rem" }}>Sistema de gestión y control.</p>
          </div>

          {/* Error global de credenciales */}
          {loginError && (
            <Alert variant="danger" className="py-2 px-3 small border-0 mb-3" style={{ fontSize: "0.8rem", borderRadius: "6px" }}>
              {loginError}
            </Alert>
          )}

          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            
            {/* Input de Usuario */}
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1 mb-1" style={{ fontSize: "0.8rem" }}>
                <Person size={13} /> Usuario de gestión
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: admin"
                className="login-input py-2"
                {...register("username", { 
                  required: "El usuario es obligatorio.",
                  minLength: { value: 3, message: "Debe tener al menos 3 caracteres." }
                })}
                isInvalid={!!errors.username}
                style={{ fontSize: "0.88rem", borderRadius: "6px" }}
              />
              <Form.Control.Feedback type="invalid" style={{ fontSize: "0.75rem" }}>
                {errors.username?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Input de Contraseña */}
            <Form.Group className="mb-3.5" controlId="formPassword">
              <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1 mb-1" style={{ fontSize: "0.8rem" }}>
                <Key size={13} /> Contraseña de seguridad
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                className="login-input py-2"
                {...register("password", { 
                  required: "La contraseña es obligatoria.",
                  minLength: { value: 6, message: "Debe tener al menos 6 caracteres." }
                })}
                isInvalid={!!errors.password}
                style={{ fontSize: "0.88rem", borderRadius: "6px" }}
              />
              <Form.Control.Feedback type="invalid" style={{ fontSize: "0.75rem" }}>
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 py-2.5 fw-semibold shadow-sm btn-login text-white mt-2"
              style={{ fontSize: "0.92rem", borderRadius: "8px" }}
            >
              Ingresar al Panel
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
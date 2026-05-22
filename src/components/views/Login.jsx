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

  // Este estado solo queda para controlar si el backend simulado rebota las credenciales
  const [loginError, setLoginError] = useState("");

  // React Hook Form pasa los datos limpios directamente acá si las validaciones básicas pasaron
  const onSubmit = (data) => {
    setLoginError("");
    
    if (data.username === "admin" && data.password === "alberdi2026") {
      onLoginSuccess();
    } else {
      setLoginError("Credenciales incorrectas. Verifique los datos de acceso.");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 py-4 login-container">
      <Card className="border-0 bg-white text-dark p-3 w-100 login-card" style={{ maxWidth: "420px" }}>
        <Card.Body>
          
          <div className="d-flex mb-3">
            <Button variant="light" className="btn-back d-flex align-items-center gap-2" onClick={onClickBack}>
              <ChevronLeft size={14} /> Volver
            </Button>
          </div>

          <div className="text-center mb-4">
            <ShieldLock size={36} className="mb-2" style={{ color: "#003776" }} />
            <h4 className="fw-bold login-title mb-1">Acceso Interno</h4>
            <p className="text-muted small mb-0">Sistema de gestión y control.</p>
          </div>

          {/* Error global de credenciales */}
          {loginError && <Alert variant="danger" className="py-2 small">{loginError}</Alert>}

          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            
            {/* Input de Usuario */}
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1">
                <Person size={14} /> Usuario de gestión
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: admin"
                className="login-input"
                {...register("username", { 
                  required: "El usuario es obligatorio.",
                  minLength: { value: 3, message: "Debe tener al menos 3 caracteres." }
                })}
                isInvalid={!!errors.username} // Se pone rojo si hay error
              />
              <Form.Control.Feedback type="invalid" className="small">
                {errors.username?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Input de Contraseña */}
            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1">
                <Key size={14} /> Contraseña de seguridad
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                className="login-input"
                {...register("password", { 
                  required: "La contraseña es obligatoria.",
                  minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres." }
                })}
                isInvalid={!!errors.password} // Se pone rojo si hay error
              />
              <Form.Control.Feedback type="invalid" className="small">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 py-2.5 fw-semibold shadow-sm btn-login text-white">
              Ingresar al Panel
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
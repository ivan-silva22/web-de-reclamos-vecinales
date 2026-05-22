import React, { useState } from "react";
import { Container, Button, Card, Form, Alert } from "react-bootstrap";
import { ShieldLock, Key, Person, ChevronLeft } from "react-bootstrap-icons";

const Login = ({ onLoginSuccess, onClickBack }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (credentials.username === "admin" && credentials.password === "alberdi2026") {
      onLoginSuccess();
    } else {
      setError("Credenciales incorrectas. Verifique los datos de acceso.");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 py-4 login-container">
      <Card className="border-0 bg-white text-dark p-3 w-100 login-card">
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

          {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1">
                <Person size={14} /> Usuario de gestión
              </Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Ej: admin"
                value={credentials.username}
                onChange={handleChange}
                required
                className="login-input"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label className="small fw-semibold text-secondary d-flex align-items-center gap-1">
                <Key size={14} /> Contraseña de seguridad
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="••••••••"
                value={credentials.password}
                onChange={handleChange}
                required
                className="login-input"
              />
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
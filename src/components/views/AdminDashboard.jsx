import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Badge,
} from "react-bootstrap";
import {
  CheckCircle,
  ListTask,
  Clock,
  Check2All,
} from "react-bootstrap-icons";
import AdminNavbar from "./AdminNavbar";

const AdminDashboard = () => {
  // Datos simulados para la demo
  const [claims, setClaims] = useState([
    {
      id: "REC-001",
      citizen: "Juan Pérez",
      category: "Alumbrado",
      address: "Av. San Martín 450",
      status: "Pendiente",
    },
    {
      id: "REC-002",
      citizen: "María Sosa",
      category: "Bacheo",
      address: "Esquina Belgrano",
      status: "Pendiente",
    },
    {
      id: "REC-003",
      citizen: "Carlos Gómez",
      category: "Agua/Cloacas",
      address: "9 de Julio 120",
      status: "Resuelto",
    },
  ]);

  const handleResolveClaim = (id) => {
    setClaims(
      claims.map((claim) =>
        claim.id === id ? { ...claim, status: "Resuelto" } : claim,
      ),
    );
  };

  const totalClaims = claims.length;
  const pendingClaims = claims.filter((c) => c.status === "Pendiente").length;
  const resolvedClaims = claims.filter((c) => c.status === "Resuelto").length;

  return (
    <div className="dashboard-container bg-light min-vh-100">
      {/* Top Header Institucional */}
      <AdminNavbar onLogout={() => alert("Función de cierre de sesión no implementada en la demo")} />
      
      {/* MEJORA: pt-3 en móvil y pt-4 en PC para no dejar un espacio muerto gigante arriba */}
      <Container className="pt-3 pt-sm-4 pb-5">
        
        {/* Panel de Estadísticas Rápidas (Compacto y responsivo) */}
        <Row className="g-2 g-sm-3 mb-3 mb-sm-4">
          <Col xs={4} sm={4}>
            <Card className="stat-card border-0 shadow-sm p-1 p-sm-2 bg-white" style={{ borderRadius: "10px" }}>
              <Card.Body className="d-flex align-items-center justify-content-between p-2">
                <div>
                  <h6 className="text-muted small mb-0 fw-semibold d-none d-sm-block" style={{ fontSize: "0.75rem" }}>Total Recibidos</h6>
                  <h6 className="text-muted small mb-0 fw-semibold d-block d-sm-none" style={{ fontSize: "0.68rem" }}>Total</h6>
                  <h4 className="fw-bold mb-0 text-dark mt-sm-1" style={{ fontSize: "1.4rem" }}>{totalClaims}</h4>
                </div>
                <ListTask size={20} className="text-secondary opacity-50 d-none d-xs-block" />
              </Card.Body>
            </Card>
          </Col>
          
          <Col xs={4} sm={4}>
            <Card className="stat-card border-0 shadow-sm p-1 p-sm-2 bg-white" style={{ borderRadius: "10px" }}>
              <Card.Body className="d-flex align-items-center justify-content-between p-2">
                <div>
                  <h6 className="text-muted small mb-0 fw-semibold d-none d-sm-block" style={{ fontSize: "0.75rem" }}>Pendientes</h6>
                  <h6 className="text-muted small mb-0 fw-semibold d-block d-sm-none" style={{ fontSize: "0.68rem" }}>Pend.</h6>
                  <h4 className="fw-bold mb-0 text-warning mt-sm-1" style={{ fontSize: "1.4rem" }}>{pendingClaims}</h4>
                </div>
                <Clock size={18} className="text-warning opacity-70 d-none d-xs-block" />
              </Card.Body>
            </Card>
          </Col>

          <Col xs={4} sm={4}>
            <Card className="stat-card border-0 shadow-sm p-1 p-sm-2 bg-white" style={{ borderRadius: "10px" }}>
              <Card.Body className="d-flex align-items-center justify-content-between p-2">
                <div>
                  <h6 className="text-muted small mb-0 fw-semibold d-none d-sm-block" style={{ fontSize: "0.75rem" }}>Solucionados</h6>
                  <h6 className="text-muted small mb-0 fw-semibold d-block d-sm-none" style={{ fontSize: "0.68rem" }}>Listos</h6>
                  <h4 className="fw-bold mb-0 text-success mt-sm-1" style={{ fontSize: "1.4rem" }}>{resolvedClaims}</h4>
                </div>
                <Check2All size={20} className="text-success opacity-70 d-none d-xs-block" />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Tabla Central de Reclamos */}
        {/* MEJORA: p-2 en móviles, p-3 en PC. Bordes suavizados para look moderno */}
        <div className="table-container p-2 p-sm-3 bg-white border shadow-sm" style={{ borderRadius: "12px", overflow: "hidden" }}>
          <div className="mb-2.5 py-1 px-1">
            <h6 className="fw-bold text-dark mb-0" style={{ fontSize: "1.05rem", letterSpacing: "-0.2px" }}>
              Solicitudes Ciudadanas
            </h6>
          </div>

          <Table responsive className="custom-table mb-0 align-middle" style={{ fontSize: "0.85rem" }}>
            <thead className="bg-light text-secondary" style={{ fontSize: "0.78rem" }}>
              <tr>
                <th className="py-2.5">Código</th>
                <th className="py-2.5">Vecino</th>
                <th className="py-2.5">Problema</th>
                <th className="py-2.5">Dirección</th>
                <th className="py-2.5">Estado</th>
                <th className="py-2.5 text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim.id} style={{ borderBottom: "1px solid #f1f3f5" }}>
                  <td className="fw-bold text-secondary py-2.5">{claim.id}</td>
                  <td className="text-dark py-2.5 fw-medium">{claim.citizen}</td>
                  <td className="py-2.5 text-muted">{claim.category}</td>
                  <td className="py-2.5 text-muted text-nowrap">{claim.address}</td>
                  <td className="py-2.5">
                    {/* Estilo de los Badges compactados */}
                    <Badge
                      bg={claim.status === "Pendiente" ? "warning" : "success"}
                      text={claim.status === "Pendiente" ? "dark" : "white"}
                      className="px-2 py-1 fw-semibold"
                      style={{ fontSize: "0.72rem", borderRadius: "4px" }}
                    >
                      {claim.status}
                    </Badge>
                  </td>
                  <td className="text-center py-2.5">
                    {claim.status === "Pendiente" ? (
                      <Button
                        variant="success"
                        size="sm"
                        className="btn-action-success d-inline-flex align-items-center gap-1 fw-medium px-2 py-1"
                        style={{ fontSize: "0.78rem", borderRadius: "5px", whiteSpace: "nowrap" }}
                        onClick={() => handleResolveClaim(claim.id)}
                      >
                        <CheckCircle size={12} /> Resolver
                      </Button>
                    ) : (
                      <span className="text-muted small fst-italic" style={{ fontSize: "0.78rem" }}>
                        Finalizado
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default AdminDashboard;
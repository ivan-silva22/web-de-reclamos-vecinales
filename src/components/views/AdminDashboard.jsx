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
  ShieldLock,
} from "react-bootstrap-icons";
import AdminNavbar from "./AdminNavbar";


const AdminDashboard = () => {
  // Simulamos datos de la base de datos para la demo
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

  // Función para simular resolver un reclamo en tiempo real durante la demo
  const handleResolveClaim = (id) => {
    setClaims(
      claims.map((claim) =>
        claim.id === id ? { ...claim, status: "Resuelto" } : claim,
      ),
    );
  };

  // Cálculos dinámicas para los paneles superiores
  const totalClaims = claims.length;
  const pendingClaims = claims.filter((c) => c.status === "Pendiente").length;
  const resolvedClaims = claims.filter((c) => c.status === "Resuelto").length;

  return (
    <div className="dashboard-container">
      {/* Top Header Institucional */}
      <AdminNavbar onLogout={() => alert("Función de cierre de sesión no implementada en la demo")} />
      <Container className="pb-5">
        {/* Panel de Estadísticas Rápidas */}
        <Row className="g-3 mb-4">
          <Col xs={12} sm={4}>
            <Card className="stat-card stat-border-total shadow-sm p-2">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="text-muted small mb-1 fw-semibold">
                    Total Recibidos
                  </h6>
                  <h3 className="fw-bold mb-0 text-dark">{totalClaims}</h3>
                </div>
                <ListTask size={30} className="text-secondary opacity-50" />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={4}>
            <Card className="stat-card stat-border-pending shadow-sm p-2">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="text-muted small mb-1 fw-semibold">
                    Pendientes de Acción
                  </h6>
                  <h3 className="fw-bold mb-0 text-dark">{pendingClaims}</h3>
                </div>
                <Clock size={30} className="text-warning opacity-70" />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={4}>
            <Card className="stat-card stat-border-resolved shadow-sm p-2">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="text-muted small mb-1 fw-semibold">
                    Solucionados
                  </h6>
                  <h3 className="fw-bold mb-0 text-dark">{resolvedClaims}</h3>
                </div>
                <Check2All size={30} className="text-success opacity-70" />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Tabla Central de Reclamos */}
        <div className="table-container p-3 bg-white border">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-dark mb-0">
              Listado de Solicitudes Ciudadanas
            </h5>
          </div>

          <Table responsive className="custom-table mb-0 align-middle">
            <thead>
              <tr>
                <th>Código</th>
                <th>Vecino</th>
                <th>Tipo de Problema</th>
                <th>Dirección</th>
                <th>Estado</th>
                <th className="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim.id}>
                  <td className="fw-bold text-secondary">{claim.id}</td>
                  <td>{claim.citizen}</td>
                  <td>{claim.category}</td>
                  <td>{claim.address}</td>
                  <td>
                    <Badge
                      className={
                        claim.status === "Pendiente"
                          ? "badge-pending"
                          : "badge-resolved"
                      }
                    >
                      {claim.status}
                    </Badge>
                  </td>
                  <td className="text-center">
                    {claim.status === "Pendiente" ? (
                      <Button
                        variant="success"
                        size="sm"
                        className="btn-action-success d-inline-flex align-items-center gap-1.5 fw-semibold shadow-sm"
                        onClick={() => handleResolveClaim(claim.id)}
                      >
                        <CheckCircle size={13} /> Marcar Solucionado
                      </Button>
                    ) : (
                      <span className="text-muted small fst-italic">
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

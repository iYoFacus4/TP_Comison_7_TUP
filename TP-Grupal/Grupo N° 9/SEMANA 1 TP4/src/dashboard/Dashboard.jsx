import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";
import ProgressRing from "../components/ProgressRing";
import BarChart from "../components/BarChart";

export default function Dashboard(){
  const [stats, setStats] = useState(null);
  const [rows,  setRows ] = useState([]);
  const [percent, setPercent] = useState(45);

  useEffect(() => {
    const t = setTimeout(() => {
      setStats([
        { title: "Earning",  value: "$ 628",   icon: "💳" },
        { title: "Share",    value: "2434",    icon: "🔗" },
        { title: "Likes",    value: "1259",    icon: "👍"  },
        { title: "Rating",   value: "8,5",     icon: "⭐"  },
      ]);
      setRows([
        { id: 1, name: "Juan Pérez", email: "juan@mail.com", role: "Admin" },
        { id: 2, name: "Ana Díaz",   email: "ana@mail.com",  role: "User"  },
        { id: 3, name: "Luis ENS",   email: "luis@mail.com", role: "User"  },
      ]);
      setPercent(45);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const bars = [20, 55, 35, 48, 42, 65, 30, 40, 38]; // valores demo

  return (
    <>
      {/* fila superior de tarjetas */}
      <Row className="g-3 mb-3">
        {(stats ?? []).map((s, i) => (
          <Col sm={6} lg={3} key={i}>
            <div className="card-appear" style={{ "--i": `${0.05 * i}s` }}>
              <StatCard title={s.title} value={s.value} icon={s.icon} />
            </div>
          </Col>
        ))}
      </Row>

      <Row className="g-3">
        {/* panel de barras */}
        <Col lg={8}>
          <Card className="shadow-sm glass card-appear" style={{ "--i": ".1s" }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Card.Title className="mb-0">Result</Card.Title>
                <Button size="sm" variant="outline-primary">Check Now</Button>
              </div>
              <BarChart values={bars} labels={["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP"]}/>
            </Card.Body>
          </Card>

          {/* tabla demo (puede ser otro gráfico en tu grupo) */}
          <Card className="mt-3 shadow-sm glass card-appear" style={{ "--i": ".15s" }}>
            <Card.Body>
              <Card.Title className="mb-3">Usuarios</Card.Title>
              <DataTable rows={rows}/>
            </Card.Body>
          </Card>
        </Col>

        {/* lateral derecho: anillo + lista */}
        <Col lg={4}>
          <Card className="shadow-sm glass card-appear" style={{ "--i": ".12s" }}>
            <Card.Body className="d-flex flex-column align-items-center">
              <ProgressRing value={percent}/>
              <div className="text-center mt-2 mb-3 small text-muted">Completion</div>
              <ListGroup variant="flush" className="w-100 small">
                <ListGroup.Item className="glass-subtle">Lorem ipsum</ListGroup.Item>
                <ListGroup.Item className="glass-subtle">Lorem ipsum</ListGroup.Item>
                <ListGroup.Item className="glass-subtle">Lorem ipsum</ListGroup.Item>
                <ListGroup.Item className="glass-subtle">Lorem ipsum</ListGroup.Item>
              </ListGroup>
              <Button className="mt-3" size="sm" variant="outline-primary">Check Now</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

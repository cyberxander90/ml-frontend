import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./app.scss";

function App() {
  const bootstrapLayout = {
    xs: 12,
    sm: { span: 10, offset: 1 },
    lg: { span: 8, offset: 2 }
  };

  return (
    <Container fluid>
      <Row className="app__top-bar">
        <Col {...bootstrapLayout}>Header</Col>
      </Row>
      <Row className="app__content">
        <Col {...bootstrapLayout}>Content</Col>
      </Row>
    </Container>
  );
}

export default App;

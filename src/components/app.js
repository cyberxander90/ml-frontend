import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Offline } from 'react-detect-offline';

import './app.scss';
import Header from 'components/header';
import Routes from 'components/routes';
import LoadingBar from 'components/loading-bar';
import ErrorBoundary from 'components/error-boundary';

function App() {
  const bootstrapLayout = {
    xs: 12,
    sm: { span: 10, offset: 1 },
    lg: { span: 8, offset: 2 }
  };

  return (
    <ErrorBoundary>
      <Offline polling={false}>
        <div className="alert-important">
          You are offline, please try to reconnect
        </div>
      </Offline>
      <Container fluid className="app">
        <Row className="app__top-bar">
          <Col {...bootstrapLayout}>
            <Header />
          </Col>
        </Row>
        <LoadingBar />
        <Row className="app__content">
          <Col {...bootstrapLayout}>
            <Routes />
          </Col>
        </Row>
      </Container>
    </ErrorBoundary>
  );
}

export default App;

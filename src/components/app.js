import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './app.scss';
import Header from 'components/header';
import Routes from 'components/routes';
import LoadingBar from 'components/loading-bar';

class App extends React.Component {
  state = { v: 'app-initial' };
  render() {
    const bootstrapLayout = {
      xs: 12,
      sm: { span: 10, offset: 1 },
      lg: { span: 8, offset: 2 }
    };

    return (
      <Container fluid className={`app ${this.state.v}`}>
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
    );
  }
}

export default App;

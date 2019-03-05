import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Offline } from 'react-detect-offline';
import { withLocalize, Translate } from 'react-localize-redux';

import './app.scss';
import Header from 'components/header';
import Routes from 'components/routes';
import LoadingBar from 'components/loading-bar';
import ErrorBoundary from 'components/error-boundary';

class App extends React.Component {
  // use this to select other language to text translations
  renderLanguageSelector() {
    const { languages, setActiveLanguage } = this.props;
    return (
      <ul className="selector">
        {languages.map(lang => (
          <li key={lang.code}>
            <button type="button" onClick={() => setActiveLanguage(lang.code)}>
              {lang.name}
            </button>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const bootstrapLayout = {
      xs: 12,
      sm: { span: 10, offset: 1 },
      lg: { span: 8, offset: 2 }
    };

    return (
      <ErrorBoundary>
        <Offline polling={false}>
          <div className="alert-important">
            <Translate id="offline" />
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
}

export default withLocalize(App);

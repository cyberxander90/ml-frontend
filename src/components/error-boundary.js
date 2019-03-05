import React from 'react';
import { Translate } from 'react-localize-redux';

import Error from 'components/error';

class ErrorBoundary extends React.Component {
  constructor() {
    super(...arguments);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Translate>
          {({ translate }) => <Error status={translate('error.unexpected')} />}
        </Translate>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

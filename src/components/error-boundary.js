import React from 'react';

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
      return <Error status="Something went wrong" />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

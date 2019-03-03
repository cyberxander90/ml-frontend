import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  searchText: PropTypes.string
};

const defaultProps = {
  searchText: ''
};

function EmptyResults({ searchText }) {
  const message = searchText ? `No results for '${searchText}'` : 'No results';
  return <div>{message}</div>;
}

EmptyResults.propTypes = propTypes;
EmptyResults.defaultProps = defaultProps;

export default EmptyResults;

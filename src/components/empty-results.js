import React from 'react';

function EmptyResults({ searchText }) {
  const message = searchText ? `No results for '${searchText}'` : 'No results';
  return <div>{message}</div>;
}

export default EmptyResults;

import React from 'react';
import Image from 'react-bootstrap/Image';

import './empty-results.scss';

function EmptyResults() {
  return (
    <div className="empty-results">
      <Image
        src="/assets/empty-results.png"
        alt="empty-results"
        className="empty-results__img"
      />
      <div>
        <h3>No results</h3>
        <ul className="empty-results__options">
          <li>Revisa la ortografía de la palabra.</li>
          <li>Utiliza palabras más genéricas o menos palabras.</li>
        </ul>
      </div>
    </div>
  );
}

export default EmptyResults;

import React from 'react';
import Image from 'react-bootstrap/Image';
import { Translate } from 'react-localize-redux';

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
        <h3>
          <Translate id="emptyResults.header" />
        </h3>
        <ul className="empty-results__options">
          <li>
            <Translate id="emptyResults.li1" />
          </li>
          <li>
            <Translate id="emptyResults.li2" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default React.memo(EmptyResults);

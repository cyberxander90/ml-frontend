import React from 'react';
import Image from 'react-bootstrap/Image';
import { Translate } from 'react-localize-redux';

import './error.scss';

function Error({ status, message }) {
  const errorStatus = status || <Translate id="error.unexpected" />;

  return (
    <div className="error">
      <Image src="/assets/sad.png" alt="sad" className="error__img" />
      <span className="error__status">{errorStatus}</span>
      <span className="error__message">{message}</span>
    </div>
  );
}

export default Error;

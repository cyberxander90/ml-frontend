import React from 'react';
import Image from 'react-bootstrap/Image';

import './error.scss';

function Error({ status, message }) {
  return (
    <div className="error">
      <Image src="/assets/sad.png" alt="sad" className="error__img" />
      <span className="error__status">{status}</span>
      <span className="error__message">{message}</span>
    </div>
  );
}

export default Error;

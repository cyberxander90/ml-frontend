import React from 'react';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';

function Price({ className, amount, currency, description, freeShipping }) {
  const tooltip = <Tooltip>{description}</Tooltip>;

  return (
    <div className={`price ${className || ''}`}>
      <OverlayTrigger placement="top" overlay={tooltip}>
        <span className="pointer">{currency} </span>
      </OverlayTrigger>
      {amount}
      {freeShipping && <Image src="/assets/free-shipping.png" />}
    </div>
  );
}

export default Price;

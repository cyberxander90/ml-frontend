import React from 'react';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';

import './price.scss';

function Price({ className, amount, currency, description, freeShipping }) {
  const descriptionTooltip = <Tooltip>{description}</Tooltip>;
  const freeShippingTooltip = <Tooltip>Free Shipping</Tooltip>;

  return (
    <div className={`price ${className || ''}`}>
      <OverlayTrigger placement="top" overlay={descriptionTooltip}>
        <span className="cursor-default">{currency} </span>
      </OverlayTrigger>
      {amount}
      {freeShipping && (
        <OverlayTrigger placement="top" overlay={freeShippingTooltip}>
          <Image
            src="/assets/free-shipping.png"
            className="price__free-shipping"
          />
        </OverlayTrigger>
      )}
    </div>
  );
}

export default Price;

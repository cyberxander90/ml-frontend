import React from 'react';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

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

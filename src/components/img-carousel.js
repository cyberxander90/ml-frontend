import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import shortId from 'shortid';

import './img-carousel.scss';

function ImgCarousel({ images, imgClassName, ...otherProps }) {
  const imgs = (images || []).map(image => ({
    id: shortId.generate(),
    image
  }));

  return (
    <Carousel {...otherProps}>
      {imgs.map(({ id, image }, index) => (
        <Carousel.Item key={id}>
          <div className="carousel__img-container">
            <Image
              className={`d-block w-100 carousel__img ${imgClassName}`}
              src={image}
              alt={`Slide ${index}`}
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default React.memo(ImgCarousel);

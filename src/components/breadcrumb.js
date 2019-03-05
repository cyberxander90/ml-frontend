import React from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import './breadcrumb.scss';

const propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  )
};

const defaultProps = {
  items: []
};

function renderBreadcrumbItem(item, isLast) {
  return (
    <li key={item.id} className="bread-crumb__item">
      {isLast ? (
        <span className="bread-crumb__current-page">{item.text}</span>
      ) : (
        <span className="bread-crumb__link">{item.text}</span>
      )}
    </li>
  );
}

function Breadcrumb(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const items = props.items.map(item => {
    let result = { id: shortId.generate() };
    if (typeof item === 'string') {
      return { text: item, ...result };
    }
    return { ...item, ...result };
  });

  return (
    <nav aria-label="breadcrumb" className="bread-crumb">
      <ol>
        {items.map((item, index) =>
          renderBreadcrumbItem(item, index === items.length - 1)
        )}
      </ol>
    </nav>
  );
}

Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;

export default Breadcrumb;

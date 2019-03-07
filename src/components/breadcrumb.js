import React from 'react';
import shortId from 'shortid';
import './breadcrumb.scss';

const defaultProps = {
  items: []
};

function renderBreadcrumbItem(item, isLast) {
  // todo: breadcrumb should be links to categories
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
  // map array of string to array of {type: str}
  const items = props.items.map(item => {
    let result = { id: shortId.generate() };
    return typeof item === 'string'
      ? { text: item, ...result }
      : { ...item, ...result };
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

Breadcrumb.defaultProps = defaultProps;

export default React.memo(Breadcrumb);

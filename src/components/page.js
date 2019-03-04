import React from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';

import {
  TITLE,
  DESCRIPTION,
  SITE_URL,
  SITE_IMG,
  TITLE_LENGTH,
  DESCRIPTION_LENGTH,
  TWITTER,
  FACEBOOK_APP_ID
} from 'constant';

const getMetaTags = ({
  pathname,
  title,
  description,
  image,
  contentType,
  twitter,
  published,
  updated,
  category,
  tags,
  noCrawl
}) => {
  const result = [
    { itemprop: 'name', content: title },
    { itemprop: 'description', content: description },
    { itemprop: 'image', content: image },
    { name: 'description', content: description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: twitter || TWITTER },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:creator', content: twitter || TWITTER },
    { name: 'twitter:image:src', content: image },
    { property: 'og:title', content: title },
    { property: 'og:type', content: contentType || 'website' },
    { property: 'og:url', content: SITE_URL + pathname },
    { property: 'og:image', content: image },
    { property: 'og:description', content: description },
    { property: 'og:site_name', content: TITLE },
    { property: 'fb:app_id', content: FACEBOOK_APP_ID }
  ];

  [
    { name: 'article:published_time', content: published },
    { name: 'article:modified_time', content: updated },
    { name: 'article:section', content: category },
    { name: 'article:tag', content: tags }
  ].forEach(item => {
    if (item.content) {
      result.push(item);
    }
  });

  if (noCrawl) {
    result.push({ name: 'robots', content: 'noindex, nofollow' });
  }

  return result;
};

function Page({
  children,
  location,
  itemScope,
  itemType,
  title,
  description,
  image,
  ...restProps
}) {
  // html attrs
  const htmlAttributes = {
    lang: 'en',
    itemscope: itemScope,
    itemtype: itemType || 'http://schema.org/WebPage'
  };

  // title / description / image
  title = (title ? `${title} / ${TITLE}` : TITLE).substring(0, TITLE_LENGTH);

  // canonical link
  const link = [
    {
      rel: 'canonical',
      href: `${SITE_URL}${location.pathname}${location.search}`
    }
  ];

  // meta tags
  const meta = getMetaTags({
    ...restProps,
    pathname: location.pathname,
    title,
    description: (description || DESCRIPTION).substring(0, DESCRIPTION_LENGTH),
    image: image || SITE_IMG
  });

  return (
    <React.Fragment>
      <Helmet
        htmlAttributes={htmlAttributes}
        title={title}
        link={link}
        meta={meta}
      />
      {children}
    </React.Fragment>
  );
}

export default withRouter(Page);

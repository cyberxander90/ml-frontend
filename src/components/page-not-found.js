import React from 'react';
import { Translate } from 'react-localize-redux';

import Error from 'components/error';

function PageNotFound() {
  return (
    <Translate>
      {({ translate }) => <Error status={translate('error.pageNotFound')} />}
    </Translate>
  );
}

export default PageNotFound;

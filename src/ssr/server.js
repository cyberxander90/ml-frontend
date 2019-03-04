import express from 'express';
import path from 'path';
import Loadable from 'react-loadable';

import loader from './loader';

const app = express();
const PORT = process.env.PORT || 3000;

// route to homepage, static assets, and capture everything else
app.use(express.Router().get('/', loader));
app.use(express.static(path.resolve(__dirname, '../../build')));
app.use(loader);

Loadable.preloadAll().then(() => {
  // eslint-disable-next-line no-console
  app.listen(PORT, console.log(`App listening on port ${PORT}!`));
});

// babel and configurations
// https://medium.com/@cereallarceny/server-side-rendering-in-create-react-app-with-all-the-goodies-without-ejecting-4c889d7db25e

const md5File = require('md5-file');
const path = require('path');
const ignoreStyles = require('ignore-styles');

const register = ignoreStyles.default;

const extensions = ['.gif', '.jpeg', '.jpg', '.png', '.svg'];

register(ignoreStyles.DEFAULT_EXTENSIONS, (mod, filename) => {
  if (!extensions.find(f => filename.endsWith(f))) {
    return ignoreStyles.noOp();
  } else {
    const hash = md5File.sync(filename).slice(0, 8);
    const bn = path.basename(filename).replace(/(\.\w{3})$/, `.${hash}$1`);
    mod.exports = `/static/media/${bn}`;
  }
});

// Set up babel to do its thing... env for the latest toys, react-app for CRA
require('@babel/polyfill');
require('@babel/register')({
  ignore: [/\/(build|node_modules)\//],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    'dynamic-import-node',
    'react-loadable/babel'
  ],
  extensions: ['.es6', '.es', '.jsx', '.js', '.mjs']
});

// load up the server entry point
require('./server');

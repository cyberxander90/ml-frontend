import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { Frontload, frontloadServerRender } from 'react-frontload';
import Loadable from 'react-loadable';
import Helmet from 'react-helmet';
import serializeJavascript from 'serialize-javascript';
import { LocalizeProvider } from 'react-localize-redux';
import initializer from 'translations/initializer';

import buildStore from 'build-store';
import App from '../components/app';
import assetManifestJson from '../../build/asset-manifest.json';

// read the html index build file
const getHtmlIndexContent = onComplete =>
  fs.readFile(
    path.resolve(__dirname, '../../build/index.html'),
    'utf8',
    onComplete
  );

// get the collection of bundle scripts to load on the initial render
const getAssetScripts = requiredAssets =>
  Object.keys(assetManifestJson)
    .filter(
      assetName =>
        assetName.startsWith(`${requiredAssets}.`) && assetName.endsWith('js')
    )
    .filter(assetName => assetManifestJson[assetName]);

// get the collection of bundle styles to load on the initial render
const getAssetStyles = () =>
  Object.values(assetManifestJson).filter(asset => asset.endsWith('.css'));

// handle error
const handleError = (res, error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  return res.status(500).end();
};

// handle a redirection in Redux Router
const handleRedirection = (res, url) => {
  res.writeHead(302, { Location: url });
  return res.end();
};

// build the react tree to load the app from server
const renderReactTree = (url, modules, context, store) => {
  var result = renderToString(
    <Loadable.Capture report={m => modules.push(m)}>
      <Provider store={store}>
        <StaticRouter location={url} context={context}>
          <Frontload>
            <LocalizeProvider initialize={initializer}>
              <App />
            </LocalizeProvider>
          </Frontload>
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  );
  return result;
};

// build the full html content
// todo: we could use some html parser to improve this process
const buildHtml = ({
  initialHtmlContent,
  helmet,
  reactTreeContent,
  assetsScripts,
  assetsStyles,
  state
}) => {
  let result = initialHtmlContent.replace(
    '<html>',
    `<html ${helmet.htmlAttributes.toString()}>`
  );
  result = result.replace(/<title>.*?<\/title>/g, helmet.title.toString());
  result = result.replace('</head>', `${helmet.meta.toString()}</head>`);
  result = result.replace(
    '</head>',
    assetsStyles
      .map(asset => `<link rel="stylesheet" href="${asset}"/>`)
      .join('') + '</head>'
  );
  result = result.replace(
    '<div id="root"></div>',
    `<div id="root">${reactTreeContent}</div><script>window.__PRELOADED_STATE__ = ${state}</script>`
  );
  result = result.replace(
    '</body>',
    assetsScripts
      .map(asset => `<script type="text/javascript" src="${asset}"></script>`)
      .join('') + '</body>'
  );
  return result;
};

//
function loader(req, res) {
  getHtmlIndexContent((error, htmlContent) => {
    if (error) {
      return handleError(res, error);
    }

    const modules = [];
    const context = {};
    const store = buildStore(req.url);
    frontloadServerRender(() =>
      renderReactTree(req.url, modules, context, store)
    ).then(reactTreeContent => {
      if (context.url) {
        return handleRedirection(res, context.url);
      }

      res.send(
        buildHtml({
          initialHtmlContent: htmlContent,
          helmet: Helmet.renderStatic(), // recompute tags
          reactTreeContent,
          assetsScripts: getAssetScripts(modules),
          assetsStyles: getAssetStyles(),
          state: serializeJavascript(buildStore().getState())
        })
      );
    });
  });
}

export default loader;

import ReactDOMServer from 'react-dom/server';
import globalTranslations from 'translations/global.json';

const initializer = {
  languages: [{ name: 'English', code: 'en' }, { name: 'Spanish', code: 'es' }],
  translation: globalTranslations,
  options: {
    defaultLanguage: 'en',
    renderToStaticMarkup: ReactDOMServer.renderToStaticMarkup
  }
};

export default initializer;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { setDefault, get } from './storage/json';
import { addLocaleData, IntlProvider } from 'react-intl';

setDefault("settings", "language", "en");
var language = get("settings", "language");
var messages;
try {
    messages = require(`./translations/${language}/translations.json`);
} catch(err) {
    messages = require(`./translations/en/translations.json`)
    language = "en";
}
addLocaleData([{fields:messages,locale:language,pluralRuleFunction:function(e,a){return a?1===e?"one":"other":e>=0&&e<2?"one":"other"}}]);
ReactDOM.render(<IntlProvider locale={language} messages={messages}><App /></IntlProvider>, document.getElementById('root'));
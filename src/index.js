import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import './style/app.scss';
import './javascript/app.js';

import 'foundation-sites/dist/js/foundation.js';

// import 'foundation-sites/js/foundation.core.js';
// import 'foundation-sites/js/foundation.util.mediaQuery.js';
// import 'foundation-sites/js/foundation.util.keyboard.js';
// import 'foundation-sites/js/foundation.tabs.js';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

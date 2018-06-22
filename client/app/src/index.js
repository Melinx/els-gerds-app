import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css'
import 'react-s-alert/dist/s-alert-css-effects/genie.css'
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

import App from './App';
import api from 'api'
import logic from './logic'
import registerServiceWorker from './registerServiceWorker';
import HashRouter from 'react-router-dom/HashRouter';

api.token = function(token) {
    if (token) {
        return sessionStorage.setItem('app-token', token)
    }
    return sessionStorage.getItem('app-token')
},

logic.eaterId = function(eaterId) {
    if (eaterId) {
        return sessionStorage.setItem('eaterId', eaterId)
    }
    return sessionStorage.getItem('eaterId')
}


ReactDOM.render(
   <HashRouter>
<App />
</ HashRouter>, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import 'bootstrap/dist/css/bootstrap.css';

const store = configureStore({
  currentLimit: 10,
  currentSkip: 0,
  totalPages: 1,
  socialFeed: [],
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

let persistor = persistStore(store);

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
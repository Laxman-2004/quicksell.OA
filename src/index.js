import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

// Create the root element for rendering React components
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application within a Redux Provider to connect it to the Redux store
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
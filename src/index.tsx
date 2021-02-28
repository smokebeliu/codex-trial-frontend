import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import 'rsuite/dist/styles/rsuite-default.css'

import configureStore from './stores/StoreConfig';
import CarsContainer from "./scenes/Cars/Cars.container";

export const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CarsContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

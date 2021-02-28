import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './RootReducer';
import rootSaga from './RootSaga';

import sagaMiddleware from './SagaMiddleware';

export default () => {
  const middleware = [sagaMiddleware];
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...middleware],
    devTools: process.env.NODE_ENV !== 'production'
  });
  let sagasManager = sagaMiddleware.run(rootSaga);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept(() => {
      // eslint-disable-next-line global-require
      const newRootReducer = require('./RootReducer').default;
      store.replaceReducer(newRootReducer);

      // eslint-disable-next-line global-require
      const newYieldedSagas = require('./RootSaga').default;
      sagasManager.cancel();
      sagasManager.toPromise().then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }

  return store;
};

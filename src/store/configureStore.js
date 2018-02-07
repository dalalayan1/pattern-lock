import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';


const logger = createLogger();
export default function configureStore(initialState={}) {
  const store = createStore(
          rootReducer,
          initialState,
          compose(applyMiddleware(logger))
          );

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
}

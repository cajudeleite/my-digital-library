import { createStore, applyMiddleware, compose } from 'redux';

import { dataMiddleware } from '../middleware/data';

import reducer from 'src/reducers';

// la fonction me retourne mon objet store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(dataMiddleware),
)

const store = createStore(reducer, enhancer);

// que je peux exporter pour m'en servir ailleurs
export default store;

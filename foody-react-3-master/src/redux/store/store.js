import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducers from '../rootReducer';

const middleware = applyMiddleware(thunk);
const enhancer = composeWithDevTools(middleware);
const store = createStore(rootReducers, enhancer);

export default store;

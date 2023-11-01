import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/reducer'; // Crearemos esto en un momento

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

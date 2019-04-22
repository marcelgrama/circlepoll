import { createStore } from 'redux';
import middlewares from './middlewares';
import reducers from '../reducers/';

const initialState = {};
const store = createStore(reducers, initialState, middlewares);

export default store;

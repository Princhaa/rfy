import { createStore } from 'redux';
import rfyApp from './reducer';
let store = createStore(rfyApp);

export default store;
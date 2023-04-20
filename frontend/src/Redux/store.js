import { applyMiddleware, legacy_createStore } from 'redux';
import { authReducer } from './reducer';
import thunk from 'redux-thunk';

export const store = legacy_createStore(authReducer, applyMiddleware(thunk));

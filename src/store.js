import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import axios from 'axios'

const loggerMiddleware = createLogger();
const user = localStorage.getItem('qiuser') ? JSON.parse(localStorage.getItem('qiuser')) : null;
const persistedState = user
    ? { user: user }
    : {}

if (user) {
    if (user.token) {
        axios.defaults.headers.common['X-Apikey'] = user.token;
    } else {
        axios.defaults.headers.common['X-Apikey'] = null;
    }
}

export const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )   
);
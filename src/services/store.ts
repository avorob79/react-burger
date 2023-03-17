import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { webSocketMiddleware } from './middleware';
import { rootReducer } from './reducers';
import { refreshToken as refresh } from '../utils/burgerFetch';
import { getCookie } from '../utils/cookie';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_DISCONNECT,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_GET_MESSAGE
} from './constants';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const wsUrl = "wss://norma.nomoreparties.space/orders";

const wsActions = {
  wsConnect: WS_CONNECTION_START,
  wsDisconnect: WS_CONNECTION_DISCONNECT,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_CONNECTION_GET_MESSAGE
};

const refreshToken = () => {
  return refresh("auth/token", ({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: getCookie("refreshToken")
    })
  }));
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, webSocketMiddleware(wsUrl, wsActions, refreshToken)));

export const store = createStore(rootReducer, enhancer);
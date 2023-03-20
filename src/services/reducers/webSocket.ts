import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_GET_MESSAGE,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED
} from '../constants';
import { TWsConnection } from '../actions/webSocket';
import { IOrder } from '../types';

export interface IWebSocketState {
  wsConnected: boolean;
  orders: Array<IOrder>;
  total: number | null;
  totalToday: number | null;
  error: any;
}

const initialState: IWebSocketState = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null,
  error: null
};

export const webSocketReducer = (state = initialState, action: TWsConnection): IWebSocketState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return ({
        ...state,
        wsConnected: true,
        orders: [],
        total: null,
        totalToday: null,
        error: null,
      });
    }
    case WS_CONNECTION_GET_MESSAGE: {
      return ({
        ...state,
        orders: [...action.payload.orders],
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        error: null
      });
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };
    }
    case WS_CONNECTION_CLOSED: {
      return ({
        ...state,
        wsConnected: false,
        orders: [],
        total: null,
        totalToday: null,
        error: null
      });
    }
    default: {
      return state;
    }
  }
};
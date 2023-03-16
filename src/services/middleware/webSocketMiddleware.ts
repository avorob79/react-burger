import { Middleware, MiddlewareAPI } from 'redux';
import { TAppDispatch, TRootState } from '../types';
import { TWsConnection } from '../actions/webSocket';
import { WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_GET_MESSAGE, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_CONNECTION_DISCONNECT } from '../constants';
import { wsProtectedConnectionStart, wsConnectionDisconnect } from '../actions/webSocket';
import { getUser } from '../actions/auth';
import { getCookie } from '../../utils/cookie';

export const webSocketMiddleware = (wsUrl: string): Middleware => {
  return (store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TWsConnection) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const { success, ...rest } = JSON.parse(data);
          //{"success":false,"message":"Invalid or missing token"}
          if (success) {
            dispatch({ type: WS_CONNECTION_GET_MESSAGE, payload: rest });
          } else if (rest.message === "Invalid or missing token") {
            dispatch(wsConnectionDisconnect());
            dispatch(getUser())
              .then(() => {
                const accessToken = getCookie("token");
                if (!!accessToken) {
                  dispatch(wsProtectedConnectionStart(accessToken));
                }
              });
          }
        };

        socket.onerror = (event: Event) => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        socket.onclose = (event: Event) => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };

        if (type === WS_CONNECTION_DISCONNECT) {
          socket.close()
        }
      }

      next(action);
    };
  };
};
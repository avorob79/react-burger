import { Middleware, MiddlewareAPI } from 'redux';

export type TWsActions = {
  wsConnect: string;
  wsDisconnect: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export const webSocketMiddleware = (wsUrl: string, wsActions: TWsActions, refreshToken: () => Promise<string>): Middleware => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsConnect, wsDisconnect, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsConnect) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const { success, ...rest } = JSON.parse(data);
          if (success) {
            dispatch({ type: onMessage, payload: rest });
          } else if (rest.message === "Invalid or missing token") {
            dispatch({ type: wsDisconnect });
            refreshToken()
              .then((result) => {
                dispatch({ type: wsConnect, payload: result });
              });
          }
        };

        socket.onerror = (event: Event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onclose = (event: Event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsDisconnect) {
          socket.close()
        }
      }

      next(action);
    };
  };
};
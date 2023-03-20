import { WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_GET_MESSAGE, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_CONNECTION_DISCONNECT } from '../constants';
import { IOrdersMessage } from '../types'

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string | Event;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload?: string | Event;
}

export interface IWsConnectionGetMessage {
  readonly type: typeof WS_CONNECTION_GET_MESSAGE;
  readonly payload: IOrdersMessage;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload?: string | Event;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
  readonly payload?: string | Event;
}

export interface IWsConnectionDisconnect {
  readonly type: typeof WS_CONNECTION_DISCONNECT;
  readonly payload?: string;
}

export type TWsConnection =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionGetMessage
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsConnectionDisconnect;

export const wsConnectionStart = (): IWsConnectionStart => ({
  type: WS_CONNECTION_START,
  payload: "/all"
});

export const wsProtectedConnectionStart = (accessToken: string): IWsConnectionStart => ({
  type: WS_CONNECTION_START,
  payload: `?token=${accessToken}`
});

export const wsConnectionDisconnect = (): IWsConnectionDisconnect => ({
  type: WS_CONNECTION_DISCONNECT
});
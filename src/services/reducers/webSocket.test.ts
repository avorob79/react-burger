import { webSocketReducer, IWebSocketState } from './webSocket';
import * as types from '../constants';

let state: IWebSocketState = {
  wsConnected: false,
  orders: [],
  total: null,
  totalToday: null,
  error: null
};

const message = {
  orders: [{
    _id: "64145e57936b17001be6b789",
    ingredients: [
      "60d3b41abdacab0026a733c6",
      "60d3b41abdacab0026a733ca",
      "60d3b41abdacab0026a733d4",
      "60d3b41abdacab0026a733c6"
    ],
    status: "done",
    name: "Астероидный краторный метеоритный бургер",
    createdAt: "2023-03-17T12:34:31.515Z",
    updatedAt: "2023-03-17T12:34:31.952Z",
    number: 44547
  },
  {
    _id: "63e5453e936b17001be5b4ea",
    ingredients: [
      "60d3b41abdacab0026a733c6",
      "60d3b41abdacab0026a733ca",
      "60d3b41abdacab0026a733d4",
      "60d3b41abdacab0026a733cd",
      "60d3b41abdacab0026a733c6"
    ],
    status: "done",
    name: "Астероидный space краторный метеоритный бургер",
    createdAt: "2023-02-09T19:10:54.575Z",
    updatedAt: "2023-02-09T19:10:54.991Z",
    number: 40311
  }],
  total: 45078,
  totalToday: 161
};

const errorMessage = "Error message";

describe("WebSocket reducer", () => {
  it("Should return the initial state", () => {
    // @ts-ignore
    expect(webSocketReducer(undefined, {})).toEqual(state)
  })

  it("Should handle WS_CONNECTION_SUCCESS", () => {
    expect(webSocketReducer(state, { type: types.WS_CONNECTION_SUCCESS })).toEqual(
      state = {
        ...state,
        wsConnected: true,
        orders: [],
        total: null,
        totalToday: null,
        error: null,
      }
    )
  })

  it("Should handle WS_CONNECTION_GET_MESSAGE", () => {
    expect(webSocketReducer(state, { type: types.WS_CONNECTION_GET_MESSAGE, payload: message })).toEqual(
      state = {
        ...state,
        orders: message.orders,
        total: message.total,
        totalToday: message.totalToday,
        error: null
      })
  })

  it("Should handle WS_CONNECTION_ERROR", () => {
    expect(webSocketReducer(state, { type: types.WS_CONNECTION_ERROR, payload: errorMessage })).toEqual(
      {
        ...state,
        wsConnected: false,
        error: errorMessage,
      })
  })

  it("Should handle WS_CONNECTION_CLOSED", () => {
    expect(webSocketReducer(state, { type: types.WS_CONNECTION_CLOSED })).toEqual(
      {
        ...state,
        wsConnected: false,
        orders: [],
        total: null,
        totalToday: null,
        error: null
      }
    )
  })
})
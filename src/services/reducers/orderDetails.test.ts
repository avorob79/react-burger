import { orderDetailsReducer, IOrderDetailsState } from './orderDetails';
import * as types from '../constants';
import { IOrder } from '../types';

let state: IOrderDetailsState = {
  order: null,
  orderRequest: false,
  orderError: null
};

const order: IOrder = {
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
};

const errorMessage = "Error message";

describe("OrderDetails reducer", () => {
  it("Should return the initial state", () => {
    // @ts-ignore
    expect(orderDetailsReducer(undefined, {})).toEqual(state)
  })

  it("Should handle GET_ORDER_DETAILS_REQUEST", () => {
    expect(orderDetailsReducer(state, { type: types.GET_ORDER_DETAILS_REQUEST })).toEqual(
      state = {
        ...state,
        orderRequest: true
      }
    )
  })

  it("Should handle GET_ORDER_DETAILS_ERROR", () => {
    expect(orderDetailsReducer(state, { type: types.GET_ORDER_DETAILS_ERROR, error: errorMessage })).toEqual({
      ...state,
      orderRequest: false,
      orderError: errorMessage
    })
  })

  it("Should handle GET_ORDER_DETAILS_SUCCESS", () => {
    expect(orderDetailsReducer(state, { type: types.GET_ORDER_DETAILS_SUCCESS, order: order })).toEqual(
      state = {
        ...state,
        order: order,
        orderRequest: false,
        orderError: null
      })
  })

  it("Should handle RESET_ORDER_DETAILS", () => {
    expect(orderDetailsReducer(state, { type: types.RESET_ORDER_DETAILS })).toEqual(
      {
        ...state,
        order: null,
        orderError: null
      }
    )
  })
})
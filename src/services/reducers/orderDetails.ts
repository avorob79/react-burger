import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_ERROR,
  RESET_ORDER_DETAILS
} from '../constants';
import { TOrderDetails } from '../actions/orderDetails';
import { IOrder } from '../types';

export interface IOrderDetailsState {
  order: IOrder | null;
  orderRequest: boolean;
  orderError: string | null;
}

const initialState: IOrderDetailsState = {
  order: null,
  orderRequest: false,
  orderError: null
};

export const orderDetailsReducer = (state = initialState, action: TOrderDetails): IOrderDetailsState => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderRequest: false,
        orderError: null
      };
    }
    case GET_ORDER_DETAILS_ERROR: {
      return {
        ...state,
        orderRequest: false,
        orderError: action.error
      };
    }
    case RESET_ORDER_DETAILS: {
      return {
        ...state,
        order: null,
        orderError: null
      };
    }
    default: {
      return state;
    }
  }
};
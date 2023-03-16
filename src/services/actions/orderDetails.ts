import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_ERROR,
  RESET_ORDER_DETAILS
} from '../constants';
import { setError } from './app';
import { burgerFetch } from '../../utils/burgerFetch';
import { IOrder, TAppDispatch } from '../types';

export interface IGetOrderDetailsRequest {
  readonly type: typeof GET_ORDER_DETAILS_REQUEST;
}

export interface IGetOrderDetailsSuccess {
  readonly type: typeof GET_ORDER_DETAILS_SUCCESS;
  readonly order: IOrder;
}

export interface IGetOrderDetailsError {
  readonly type: typeof GET_ORDER_DETAILS_ERROR;
  readonly error: string;
}

export interface IResetOrderDetails {
  readonly type: typeof RESET_ORDER_DETAILS;
}

export type TOrderDetails =
  | IGetOrderDetailsRequest
  | IGetOrderDetailsSuccess
  | IGetOrderDetailsError
  | IResetOrderDetails;

export const resetOrderDetails = (): IResetOrderDetails => ({
  type: RESET_ORDER_DETAILS
});

interface IResponse {
  success: boolean;
  orders: ReadonlyArray<IOrder>;
}

export const getOrderDetails = (id: string) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: GET_ORDER_DETAILS_REQUEST
    });

    return burgerFetch<IResponse>("orders/" + id)
      .then(result => {
        dispatch({
          type: GET_ORDER_DETAILS_SUCCESS,
          order: result.orders?.[0]
        });
      })
      .catch(e => {
        dispatch({
          type: GET_ORDER_DETAILS_ERROR,
          error: e.message
        });
        dispatch(setError(e.message));
      });
  };
};
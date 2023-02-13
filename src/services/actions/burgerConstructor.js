import { v4 as uuidv4 } from 'uuid';
import { setError } from './app';
import { burgerFetch } from '../../utils/burgerFetch';
import { getCookie } from '../../utils/cookie';

export const SET_BUN = 'SET_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const REPLACE_INGREDIENT = 'REPLACE_INGREDIENT';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';

export const RESET_ORDER_DETAILS = 'RESET_ORDER_DETAILS';

export const setBun = (bun) => ({
  type: SET_BUN,
  bun: bun
});

export const addIngredient = (ingredient) => ({
  type: ADD_INGREDIENT,
  ingredient: ingredient,
  key: uuidv4()
});

export const removeIngredient = (key) => ({
  type: REMOVE_INGREDIENT,
  key: key
});

export const replaceIngredient = (fromIndex, toIndex) => ({
  type: REPLACE_INGREDIENT,
  fromIndex: fromIndex,
  toIndex: toIndex
});

export const resetOrderDetails = () => ({
  type: RESET_ORDER_DETAILS
});

export function getOrder(ids) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });

    burgerFetch("orders",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + getCookie("token")
        },
        body: JSON.stringify({ ingredients: ids })
      })
      .then(result => dispatch({
        type: GET_ORDER_SUCCESS,
        order: result.order.number
      }))
      .catch(e => {
        dispatch({
          type: GET_ORDER_ERROR,
          error: e.message
        });
        dispatch(setError(e.message));
      });
  };
}
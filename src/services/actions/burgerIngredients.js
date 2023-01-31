import { setError } from './app';
import { burgerFetch } from '../../utils/burgerFetch';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export const SET_BUN_COUNTER = 'SET_BUN_COUNTER';
export const RESET_BUN_COUNTER = 'RESET_BUN_COUNTER';
export const INCREASE_INGREDIENT_COUNTER = 'INCREASE_INGREDIENT_COUNTER';
export const DECREASE_INGREDIENT_COUNTER = 'DECREASE_INGREDIENT_COUNTER';

export const setBunCounter = (id) => ({
  type: SET_BUN_COUNTER,
  id: id
});

export const resetBunCounter = (id) => ({
  type: RESET_BUN_COUNTER,
  id: id
});

export const increaseIngredientCounter = (id) => ({
  type: INCREASE_INGREDIENT_COUNTER,
  id: id
});

export const decreaseIngredientCounter = (id) => ({
  type: DECREASE_INGREDIENT_COUNTER,
  id
});

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });

    burgerFetch("ingredients")
      .then(result => dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: result.data
      }))
      .catch(e => {
        dispatch({
          type: GET_INGREDIENTS_ERROR,
          error: e.message
        });
        dispatch(setError(e.message));
      });
  };
}
import { setError } from './App';
import { burgerFetch } from '../../utils/burgerFetch';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export const SET_BUN_COUNTER = 'SET_BUN_COUNTER';
export const INCREASE_INGREDIENT_COUNTER = 'INCREASE_INGREDIENT_COUNTER';
export const DECREASE_INGREDIENT_COUNTER = 'DECREASE_INGREDIENT_COUNTER';

export const SET_DETAILS = 'SET_DETAILS';
export const RESET_DETAILS = 'RESET_DETAILS';

export const setBunCounter = (id) => ({
  type: SET_BUN_COUNTER,
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

export const setDetails = (details) => ({
  type: SET_DETAILS,
  details: details
});

export const resetDetails = () => ({
  type: RESET_DETAILS,
  details: null
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
          type: GET_INGREDIENTS_ERROR
        });
        dispatch(setError(e.message));
      });
  };
}
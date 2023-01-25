import { setError } from './App';
import { burgerFetch } from '../../utils/burgerFetch';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export const SET_BUN_COUNT = 'SET_BUN_COUNT';
export const INCREASE_INGREDIENT_COUNT = 'INCREASE_INGREDIENT_COUNT';
export const DECREASE_INGREDIENT_COUNT = 'DECREASE_INGREDIENT_COUNT';

export const SET_DETAILS = 'SET_DETAILS';
export const RESET_DETAILS = 'RESET_DETAILS';

export const setBunCount = (id) => ({
  type: SET_BUN_COUNT,
  id: id
});

export const increaseIngredientCount = (id) => ({
  type: INCREASE_INGREDIENT_COUNT,
  id: id
});

export const decreaseIngredientCount = (id) => ({
  type: DECREASE_INGREDIENT_COUNT,
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
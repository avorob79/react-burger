import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  SET_BUN_COUNT,
  INCREASE_INGREDIENT_COUNT,
  DECREASE_INGREDIENT_COUNT,
  SET_DETAILS,
  RESET_DETAILS
} from '../actions/BurgerIngredients';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,

  counts: {},

  details: null
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredientsRequest: false,
      };
    }
    case SET_BUN_COUNT: {
      const counts = {...state.counts};
      state.ingredients.filter(item => item.type === "bun" && !!counts[item._id]).forEach(item => counts[item._id] = 0);
      counts[action.id] = (counts[action.id] || 0) + 2;
      return {
        ...state,
        counts: counts
      };
    }
    case INCREASE_INGREDIENT_COUNT: {
      return {
        ...state,
        counts: {
          ...state.counts,
          [action.id]: (state.counts[action.id] || 0) + 1
        }
      };
    }
    case DECREASE_INGREDIENT_COUNT: {
      return {
        ...state,
        counts: {
          ...state.counts,
          [action.id]: state.counts[action.id] - 1
        }
      };
    }
    case SET_DETAILS: {
      return {
        ...state,
        details: action.details,
      };
    }
    case RESET_DETAILS: {
      return {
        ...state,
        details: null
      };
    }
    default: {
      return state;
    }
  }
};
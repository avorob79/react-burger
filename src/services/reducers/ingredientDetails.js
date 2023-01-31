import {
  SET_INGREDIENT_DETAILS,
  RESET_INGREDIENT_DETAILS
} from '../actions/ingredientDetails';

const initialState = {
  details: null
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS: {
      return {
        ...state,
        details: action.details,
      };
    }
    case RESET_INGREDIENT_DETAILS: {
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
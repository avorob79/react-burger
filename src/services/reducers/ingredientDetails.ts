import {
  SET_INGREDIENT_DETAILS,
  RESET_INGREDIENT_DETAILS
} from '../constants';
import { TIngredientDetails } from '../actions/ingredientDetails';
import { IIngredient } from '../types';

export interface IIngredientDetailsState {
  details: IIngredient | null;
}

const initialState: IIngredientDetailsState = {
  details: null
};

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetails): IIngredientDetailsState => {
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
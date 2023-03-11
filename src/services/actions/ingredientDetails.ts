import { SET_INGREDIENT_DETAILS, RESET_INGREDIENT_DETAILS } from '../constants';
import { IIngredient } from '../types';

export interface ISetIngredientDetails {
  readonly type: typeof SET_INGREDIENT_DETAILS;
  readonly details: IIngredient;
}

export interface IResetIngredientDetails {
  readonly type: typeof RESET_INGREDIENT_DETAILS;
  readonly details: null;
}

export type TIngredientDetails =
  | ISetIngredientDetails
  | IResetIngredientDetails;

export const setIngredientDetails = (details: any): ISetIngredientDetails => ({
  type: SET_INGREDIENT_DETAILS,
  details: details
});

export const resetIngredientDetails = (): IResetIngredientDetails => ({
  type: RESET_INGREDIENT_DETAILS,
  details: null
});
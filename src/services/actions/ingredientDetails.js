export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const RESET_INGREDIENT_DETAILS = 'RESET_INGREDIENT_DETAILS';

export const setIngredientDetails = (details) => ({
  type: SET_INGREDIENT_DETAILS,
  details: details
});

export const resetIngredientDetails = () => ({
  type: RESET_INGREDIENT_DETAILS,
  details: null
});
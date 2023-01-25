import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burgerConstructor';
import { burgerIngredientsReducer } from './burgerIngredients';
import { ingredientDetailsReducer } from './ingredientDetails';
import { appReducer } from './app';

export const rootReducer = combineReducers({
  app: appReducer,
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer
});
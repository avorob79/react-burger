import { combineReducers } from 'redux';
import { appReducer } from './app';
import { burgerConstructorReducer } from './burgerConstructor';
import { burgerIngredientsReducer } from './burgerIngredients';
import { ingredientDetailsReducer } from './ingredientDetails';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  app: appReducer,
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  auth: authReducer
});
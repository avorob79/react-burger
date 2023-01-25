import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './BurgerConstructor';
import { burgerIngredientsReducer } from './BurgerIngredients';
import { appReducer } from './App';

export const rootReducer = combineReducers({
  app: appReducer,
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer
});
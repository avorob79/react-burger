import { combineReducers } from 'redux';
import { appReducer } from './app';
import { burgerConstructorReducer } from './burgerConstructor';
import { burgerIngredientsReducer } from './burgerIngredients';
import { authReducer } from './auth';
import { orderDetailsReducer } from './orderDetails';
import { webSocketReducer } from './webSocket';

export const rootReducer = combineReducers({
  app: appReducer,
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  auth: authReducer,
  orderDetails: orderDetailsReducer,
  webSocket: webSocketReducer
});
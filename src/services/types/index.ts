import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '../store';
import { TApp } from '../actions/app';
import { TBurgerConstructor } from '../actions/burgerConstructor';
import { TBurgerIngredients } from '../actions/burgerIngredients';
import { TAuth } from '../actions/auth';
import { TOrderDetails } from '../actions/orderDetails';
import { TWsConnection } from '../actions/webSocket';
import { IIngredient, IIngredientExt, IIngredientsDictionary, IUser, IOrder, IOrdersMessage } from './data';

export type { IIngredient, IIngredientExt, IIngredientsDictionary, IUser, IOrder, IOrdersMessage };

export type TRootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TApp
  | TBurgerConstructor
  | TBurgerIngredients
  | TAuth
  | TOrderDetails
  | TWsConnection;

export type TAppDispatch = ThunkDispatch<TRootState, never, TApplicationActions>;
export type TAppThunk<ReturnType = void> = ThunkAction<Promise<ReturnType>, TRootState, never, TApplicationActions>;
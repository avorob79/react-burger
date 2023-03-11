import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '../store';
import { TApp } from '../actions/app';
import { TBurgerConstructor } from '../actions/burgerConstructor';
import { TBurgerIngredients } from '../actions/burgerIngredients';
import { TIngredientDetails } from '../actions/ingredientDetails';
import { TAuth } from '../actions/auth';
import { IIngredient, IIngredientExt, IUser } from './data';

export type { IIngredient, IIngredientExt, IUser };

export type TRootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TApp
  | TBurgerConstructor
  | TBurgerIngredients
  | TIngredientDetails
  | TAuth;

export type TAppDispatch = ThunkDispatch<TRootState, never, TApplicationActions>;
export type TAppThunk<ReturnType = void> = ThunkAction<Promise<ReturnType>, TRootState, never, TApplicationActions>;
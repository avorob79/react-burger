import { TRootState } from './types';

export const errors = (state: TRootState) => state.app.errors;

export const user = (state: TRootState) => state.auth.user;

export const ingredients = (state: TRootState) => state.burgerIngredients.ingredients;
export const counters = (state: TRootState) => state.burgerIngredients.counters;

export const bun = (state: TRootState) => state.burgerConstructor.bun;
export const selectedIngredients = (state: TRootState) => state.burgerConstructor.ingredients;
export const orderRequest = (state: TRootState) => state.burgerConstructor.orderRequest;
export const orderDetails = (state: TRootState) => state.burgerConstructor.orderDetails;
export const order = (state: TRootState) => state.burgerConstructor.order;
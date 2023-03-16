import { TRootState } from './types';

export const errors = (state: TRootState) => state.app.errors;

export const user = (state: TRootState) => state.auth.user;

export const ingredients = (state: TRootState) => state.burgerIngredients.ingredients;
export const ingredientsDictionary = (state: TRootState) => state.burgerIngredients.ingredientsDictionary;
export const counters = (state: TRootState) => state.burgerIngredients.counters;

export const bun = (state: TRootState) => state.burgerConstructor.bun;
export const selectedIngredients = (state: TRootState) => state.burgerConstructor.ingredients;
export const orderRequest = (state: TRootState) => state.burgerConstructor.orderRequest;
export const orderInfo = (state: TRootState) => state.burgerConstructor.orderInfo;
export const order = (state: TRootState) => state.burgerConstructor.order;

export const orderDetails = (state: TRootState) => state.orderDetails.order;
export const orderDetailsRequest = (state: TRootState) => state.orderDetails.orderRequest;
export const orderDetailsError = (state: TRootState) => state.orderDetails.orderError;

export const orders = (state: TRootState) => state.webSocket.orders;
export const ordersTotal = (state: TRootState) => state.webSocket.total;
export const ordersTotalToday = (state: TRootState) => state.webSocket.totalToday;
export const errors = (state) => state.app.errors;

export const user = (state) => state.auth.user;

export const ingredients = (state) => state.burgerIngredients.ingredients;
export const counters = (state) => state.burgerIngredients.counters;

export const bun = (state) => state.burgerConstructor.bun;
export const selectedIngredients = (state) => state.burgerConstructor.ingredients;
export const orderRequest = (state) => state.burgerConstructor.orderRequest;
export const orderDetails = (state) => state.burgerConstructor.orderDetails;
export const order = (state) => state.burgerConstructor.order;
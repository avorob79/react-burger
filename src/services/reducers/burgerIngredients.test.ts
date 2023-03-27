import { burgerIngredientsReducer, IBurgerIngredientsState } from './burgerIngredients';
import * as types from '../constants';
import { IIngredient } from '../types';

let state: IBurgerIngredientsState = {
  ingredients: [],
  ingredientsDictionary: {},
  ingredientsRequest: false,
  ingredientsError: null,

  counters: {}
};

const ingredients: ReadonlyArray<IIngredient> = [
  {
    _id: "60d3b41abdacab0026a733c6",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png"
  },
  {
    _id: "60d3b41abdacab0026a733cb",
    name: "Биокотлета из марсианской Магнолии",
    type: "main",
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png"
  },
  {
    _id: "60d3b41abdacab0026a733ce",
    name: "Соус традиционный галактический",
    type: "sauce",
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: "https://code.s3.yandex.net/react/code/sauce-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png"
  },
  {
    _id: "60d3b41abdacab0026a733d0",
    name: "Хрустящие минеральные кольца",
    type: "main",
    proteins: 808,
    fat: 689,
    carbohydrates: 609,
    calories: 986,
    price: 300,
    image: "https://code.s3.yandex.net/react/code/mineral_rings.png",
    image_mobile: "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/mineral_rings-large.png"
  }
];

const errorMessage = "Error message";

describe("BurgerIngredients reducer", () => {
  it("Should return the initial state", () => {
    // @ts-ignore
    expect(burgerIngredientsReducer(undefined, {})).toEqual(state)
  })

  it("Should handle GET_INGREDIENTS_REQUEST", () => {
    expect(burgerIngredientsReducer(state, { type: types.GET_INGREDIENTS_REQUEST })).toEqual(
      state = {
        ...state,
        ingredientsRequest: true
      }
    )
  })

  it("Should handle GET_INGREDIENTS_ERROR", () => {
    expect(burgerIngredientsReducer(state, { type: types.GET_INGREDIENTS_ERROR, error: errorMessage })).toEqual({
      ...state,
      ingredientsRequest: false,
      ingredientsError: errorMessage
    })
  })

  it("Should handle GET_INGREDIENTS_SUCCESS", () => {
    expect(burgerIngredientsReducer(state, { type: types.GET_INGREDIENTS_SUCCESS, ingredients: ingredients })).toEqual(
      state = {
        ...state,
        ingredients: ingredients,
        ingredientsDictionary: {
          [ingredients[0]._id]: ingredients[0],
          [ingredients[1]._id]: ingredients[1],
          [ingredients[2]._id]: ingredients[2],
          [ingredients[3]._id]: ingredients[3]
        },
        ingredientsRequest: false,
        ingredientsError: null
      })
  })

  it("Should handle SET_BUN_COUNTER", () => {
    expect(burgerIngredientsReducer(state, { type: types.SET_BUN_COUNTER, id: ingredients[0]._id })).toEqual(
      state = {
        ...state,
        counters: {
          ...state.counters,
          [ingredients[0]._id]: 2
        }
      }
    )
  })

  it("Should handle RESET_BUN_COUNTER", () => {
    expect(burgerIngredientsReducer(state, { type: types.RESET_BUN_COUNTER, id: ingredients[0]._id })).toEqual(
      state = {
        ...state,
        counters: {
          ...state.counters,
          [ingredients[0]._id]: 0
        }
      }
    )
  })

  it("Should handle INCREASE_INGREDIENT_COUNTER", () => {
    expect(burgerIngredientsReducer(state, { type: types.INCREASE_INGREDIENT_COUNTER, id: ingredients[1]._id })).toEqual(
      state = {
        ...state,
        counters: {
          ...state.counters,
          [ingredients[1]._id]: 1
        }
      }
    )
  })

  it("Should handle DECREASE_INGREDIENT_COUNTER", () => {
    expect(burgerIngredientsReducer(state, { type: types.DECREASE_INGREDIENT_COUNTER, id: ingredients[1]._id })).toEqual(
      state = {
        ...state,
        counters: {
          ...state.counters,
          [ingredients[1]._id]: 0
        }
      }
    )
  })

  it("Should handle RESET_COUNTERS", () => {
    expect(burgerIngredientsReducer(state, { type: types.RESET_COUNTERS })).toEqual(
      {
        ...state,
        counters: {}
      }
    )
  })
})
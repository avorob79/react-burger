import { v4 as uuidv4 } from 'uuid';
import { burgerConstructorReducer, IBurgerConstructorState } from './burgerConstructor';
import * as types from '../constants';
import { IIngredient } from '../types';

let state: IBurgerConstructorState = {
  bun: null,
  ingredients: [],

  order: null,
  orderRequest: false,
  orderError: null,
  orderInfo: false
};

const bun: IIngredient = {
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
};

const ingredients: ReadonlyArray<IIngredient> = [
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

const keys = [uuidv4(), uuidv4(), uuidv4()];
const order = 123456;
const errorMessage = "Error message";

describe("BurgerConstructor reducer", () => {
  it("Should return the initial state", () => {
    // @ts-ignore
    expect(burgerConstructorReducer(undefined, {})).toEqual(state)
  })

  it("Should handle SET_BUN", () => {
    expect(burgerConstructorReducer(state, { type: types.SET_BUN, bun: bun })).toEqual(
      state = {
        ...state,
        bun: bun
      }
    )
  })

  it("Should handle ADD_INGREDIENT", () => {
    expect(burgerConstructorReducer(state, { type: types.ADD_INGREDIENT, ingredient: ingredients[0], key: keys[0] })).toEqual(
      state = {
        ...state,
        ingredients: [{ ...ingredients[0], key: keys[0] }]
      }
    )
    expect(burgerConstructorReducer(state, { type: types.ADD_INGREDIENT, ingredient: ingredients[1], key: keys[1] })).toEqual(
      state = {
        ...state,
        ingredients: [{ ...ingredients[0], key: keys[0] }, { ...ingredients[1], key: keys[1] }]
      }
    )
    expect(burgerConstructorReducer(state, { type: types.ADD_INGREDIENT, ingredient: ingredients[2], key: keys[2] })).toEqual(
      state = {
        ...state,
        ingredients: [{ ...ingredients[0], key: keys[0] }, { ...ingredients[1], key: keys[1] }, { ...ingredients[2], key: keys[2] }]
      }
    )
  })

  it("Should handle REPLACE_INGREDIENT", () => {
    expect(burgerConstructorReducer(state, { type: types.REPLACE_INGREDIENT, fromIndex: 1, toIndex: 2 })).toEqual(
      state = {
        ...state,
        ingredients: [{ ...ingredients[0], key: keys[0] }, { ...ingredients[2], key: keys[2] }, { ...ingredients[1], key: keys[1] }]
      }
    )
  })

  it("Should handle REMOVE_INGREDIENT", () => {
    expect(burgerConstructorReducer(state, { type: types.REMOVE_INGREDIENT, key: keys[1] })).toEqual({
      ...state,
      ingredients: [{ ...ingredients[0], key: keys[0] }, { ...ingredients[2], key: keys[2] }]
    })
  })

  it("Should handle GET_ORDER_REQUEST", () => {
    expect(burgerConstructorReducer(state, { type: types.GET_ORDER_REQUEST })).toEqual(
      state = {
        ...state,
        orderRequest: true
      }
    )
  })

  it("Should handle GET_ORDER_ERROR", () => {
    expect(burgerConstructorReducer(state, { type: types.GET_ORDER_ERROR, error: errorMessage })).toEqual({
      ...state,
      orderRequest: false,
      orderError: errorMessage
    })
  })

  it("Should handle GET_ORDER_SUCCESS", () => {
    expect(burgerConstructorReducer(state, { type: types.GET_ORDER_SUCCESS, order: order })).toEqual(
      state = {
        ...state,
        order: order,
        orderRequest: false,
        orderError: null,
        orderInfo: true
      })
  })

  it("Should handle RESET_INGREDIENTS", () => {
    expect(burgerConstructorReducer(state, { type: types.RESET_INGREDIENTS })).toEqual({
      ...state,
      bun: null,
      ingredients: [],
    })
  })

  it("Should handle RESET_ORDER_INFO", () => {
    expect(burgerConstructorReducer(state, { type: types.RESET_ORDER_INFO })).toEqual({
      ...state,
      orderInfo: false
    })
  })
})
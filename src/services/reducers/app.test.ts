import { appReducer, IAppState } from './app';
import * as types from '../constants';

let state: IAppState = {
  errors: []
};

const message1 = "Error message 1";
const message2 = "Error message 2";

describe("App reducer", () => {
  it("Should return the initial state", () => {
    // @ts-ignore
    expect(appReducer(undefined, {})).toEqual(state)
  })

  it("Should handle SET_ERROR", () => {
    expect(appReducer(state, { type: types.SET_ERROR, message: message1 })).toEqual(
      state = {
        errors: [message1]
      }
    )
    expect(appReducer(state, { type: types.SET_ERROR, message: message2 })).toEqual(
      state = {
        errors: [message1, message2]
      }
    )
  })

  it("Should handle RESET_ERROR", () => {
    expect(appReducer(state, { type: types.RESET_ERROR })).toEqual(
      state = {
        errors: [message2]
      }
    )
    expect(appReducer(state, { type: types.RESET_ERROR })).toEqual({ errors: [] })
  })
})
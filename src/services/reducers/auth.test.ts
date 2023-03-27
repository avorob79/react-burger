import { authReducer, IAuthState } from './auth';
import * as types from '../constants';
import { IUser } from '../types';

const initialState: IAuthState = {
  user: null,

  loginRequest: false,
  loginError: null,

  logoutRequest: false,
  logoutError: null,

  registerRequest: false,
  registerError: null,

  forgotPasswordRequest: false,
  forgotPasswordError: null,

  resetPasswordRequest: false,
  resetPasswordError: null,

  refreshTokenRequest: false,
  refreshTokenError: null,

  getUserRequest: false,
  getUserError: null,

  updateUserRequest: false,
  updateUserError: null
};

const user: IUser = {
  email: "user@email.ru",
  name: "user"
};

const errorMessage = "Error message";

let state: IAuthState = initialState;

describe("Auth reducer", () => {
  it("Should return the initial state", () => {
    // @ts-ignore
    expect(authReducer(undefined, {})).toEqual(initialState)
  })

  it("Should handle LOGIN_REQUEST", () => {
    expect(authReducer(initialState, { type: types.LOGIN_REQUEST })).toEqual(
      state = {
        ...initialState,
        loginRequest: true
      }
    )
  })

  it("Should handle LOGIN_SUCCESS", () => {
    expect(authReducer(state, { type: types.LOGIN_SUCCESS, user: user })).toEqual({
      ...state,
      user: user,
      loginRequest: false,
      loginError: null
    })
  })

  it("Should handle LOGIN_ERROR", () => {
    expect(authReducer(state, { type: types.LOGIN_ERROR, error: errorMessage })).toEqual({
      ...state,
      loginRequest: false,
      loginError: errorMessage
    })
  })

  it("Should handle LOGOUT_REQUEST", () => {
    expect(authReducer(initialState, { type: types.LOGOUT_REQUEST })).toEqual(
      state = {
        ...initialState,
        logoutRequest: true
      }
    )
  })

  it("Should handle LOGOUT_SUCCESS", () => {
    expect(authReducer(state, { type: types.LOGOUT_SUCCESS })).toEqual({
      ...state,
      user: null,
      logoutRequest: false,
      logoutError: null
    })
  })

  it("Should handle LOGOUT_ERROR", () => {
    expect(authReducer(state, { type: types.LOGOUT_ERROR, error: errorMessage })).toEqual({
      ...state,
      logoutRequest: false,
      logoutError: errorMessage,
    })
  })

  it("Should handle REGISTER_REQUEST", () => {
    expect(authReducer(initialState, { type: types.REGISTER_REQUEST })).toEqual(
      state = {
        ...initialState,
        registerRequest: true
      }
    )
  })

  it("Should handle REGISTER_SUCCESS", () => {
    expect(authReducer(state, { type: types.REGISTER_SUCCESS, user: user })).toEqual({
      ...state,
      user: user,
      registerRequest: false,
      registerError: null
    })
  })

  it("Should handle REGISTER_ERROR", () => {
    expect(authReducer(state, { type: types.REGISTER_ERROR, error: errorMessage })).toEqual({
      ...state,
      registerRequest: false,
      registerError: errorMessage
    })
  })

  it("Should handle FORGOT_PASSWORD_REQUEST", () => {
    expect(authReducer(initialState, { type: types.FORGOT_PASSWORD_REQUEST })).toEqual(
      state = {
        ...initialState,
        forgotPasswordRequest: true
      }
    )
  })

  it("Should handle FORGOT_PASSWORD_SUCCESS", () => {
    expect(authReducer(state, { type: types.FORGOT_PASSWORD_SUCCESS })).toEqual({
      ...state,
      forgotPasswordRequest: false,
      forgotPasswordError: null
    })
  })

  it("Should handle FORGOT_PASSWORD_ERROR", () => {
    expect(authReducer(state, { type: types.FORGOT_PASSWORD_ERROR, error: errorMessage })).toEqual({
      ...state,
      forgotPasswordRequest: false,
      forgotPasswordError: errorMessage
    })
  })

  it("Should handle RESET_PASSWORD_REQUEST", () => {
    expect(authReducer(initialState, { type: types.RESET_PASSWORD_REQUEST })).toEqual(
      state = {
        ...initialState,
        resetPasswordRequest: true
      }
    )
  })

  it("Should handle RESET_PASSWORD_SUCCESS", () => {
    expect(authReducer(state, { type: types.RESET_PASSWORD_SUCCESS })).toEqual({
      ...state,
      resetPasswordRequest: false,
      resetPasswordError: null
    })
  })

  it("Should handle RESET_PASSWORD_ERROR", () => {
    expect(authReducer(state, { type: types.RESET_PASSWORD_ERROR, error: errorMessage })).toEqual({
      ...state,
      resetPasswordRequest: false,
      resetPasswordError: errorMessage
    })
  })

  it("Should handle GET_USER_REQUEST", () => {
    expect(authReducer(initialState, { type: types.GET_USER_REQUEST })).toEqual(
      state = {
        ...initialState,
        getUserRequest: true
      }
    )
  })

  it("Should handle GET_USER_SUCCESS", () => {
    expect(authReducer(state, { type: types.GET_USER_SUCCESS, user: user })).toEqual({
      ...state,
      user: user,
      getUserRequest: false,
      getUserError: null
    })
  })

  it("Should handle GET_USER_ERROR", () => {
    expect(authReducer(state, { type: types.GET_USER_ERROR, error: errorMessage })).toEqual({
      ...state,
      getUserRequest: false,
      getUserError: errorMessage
    })
  })

  it("Should handle UPDATE_USER_REQUEST", () => {
    expect(authReducer(initialState, { type: types.UPDATE_USER_REQUEST })).toEqual(
      state = {
        ...initialState,
        updateUserRequest: true
      }
    )
  })

  it("Should handle UPDATE_USER_SUCCESS", () => {
    expect(authReducer(state, { type: types.UPDATE_USER_SUCCESS, user: user })).toEqual({
      ...state,
      user: user,
      updateUserRequest: false,
      updateUserError: null
    })
  })

  it("Should handle UPDATE_USER_ERROR", () => {
    expect(authReducer(state, { type: types.UPDATE_USER_ERROR, error: errorMessage })).toEqual({
      ...state,
      updateUserRequest: false,
      updateUserError: errorMessage
    })
  })
})
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR
} from '../constants';
import { TAuth } from '../actions/auth';
import { IUser } from '../types';

export interface IAuthState {
  user: IUser | null;

  loginRequest: boolean;
  loginError: string | null;

  logoutRequest: boolean;
  logoutError: string | null;

  registerRequest: boolean;
  registerError: string | null;

  forgotPasswordRequest: boolean;
  forgotPasswordError: string | null;

  resetPasswordRequest: boolean;
  resetPasswordError: string | null;

  refreshTokenRequest: boolean;
  refreshTokenError: string | null;

  getUserRequest: boolean;
  getUserError: string | null;

  updateUserRequest: boolean;
  updateUserError: string | null;
}

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

export const authReducer = (state = initialState, action: TAuth): IAuthState => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.user,
        loginRequest: false,
        loginError: null
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        loginRequest: false,
        loginError: action.error
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        logoutRequest: false,
        logoutError: null,
      };
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        logoutRequest: false,
        logoutError: action.error,
      };
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        registerRequest: false,
        registerError: null,
      };
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        registerRequest: false,
        registerError: action.error
      };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordError: null
      };
    }
    case FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordError: action.error
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordError: null
      };
    }
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordError: action.error
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        getUserRequest: false,
        getUserError: null,
      };
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        getUserRequest: false,
        getUserError: action.error
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        updateUserRequest: false,
        updateUserError: null
      };
    }
    case UPDATE_USER_ERROR: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserError: action.error
      };
    }
    default: {
      return state;
    }
  }
};
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
import { setError } from './app';
import { burgerFetch, fetchWithRefresh } from '../../utils/burgerFetch';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
import { IUser, TAppDispatch } from '../types';

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly user: IUser;
}

export interface ILoginError {
  readonly type: typeof LOGIN_ERROR;
  readonly error: string;
}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutError {
  readonly type: typeof LOGOUT_ERROR;
  readonly error: string;
}

export interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
  readonly user: IUser;
}

export interface IRegisterError {
  readonly type: typeof REGISTER_ERROR;
  readonly error: string;
}

export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordError {
  readonly type: typeof FORGOT_PASSWORD_ERROR;
  readonly error: string;
}

export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordError {
  readonly type: typeof RESET_PASSWORD_ERROR;
  readonly error: string;
}

export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: IUser;
}

export interface IGetUserError {
  readonly type: typeof GET_USER_ERROR;
  readonly error: string;
}

export interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: IUser;
}

export interface IUpdateUserError {
  readonly type: typeof UPDATE_USER_ERROR;
  readonly error: string;
}

export type TAuth =
  | ILoginRequest
  | ILoginSuccess
  | ILoginError
  | ILogoutRequest
  | ILogoutSuccess
  | ILogoutError
  | IRegisterRequest
  | IRegisterSuccess
  | IRegisterError
  | IForgotPasswordRequest
  | IForgotPasswordSuccess
  | IForgotPasswordError
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordError
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserError
  | IUpdateUserRequest
  | IUpdateUserSuccess
  | IUpdateUserError;

interface IResultResponse {
  success: boolean;
}

interface IAuthResponse extends IResultResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

interface IMessageResponse extends IResultResponse {
  message: string;
}

interface IUserInfoResponse extends IResultResponse {
  user: IUser;
}

export const login = (email: string, password: string) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    return burgerFetch<IAuthResponse>("auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(result => {
      const accessToken = result.accessToken.split("Bearer ")[1];
      if (!!accessToken) {
        setCookie("token", accessToken);
      }
      if (!!result.refreshToken) {
        setCookie("refreshToken", result.refreshToken);
      }
      dispatch({
        type: LOGIN_SUCCESS,
        user: result.user
      });
    }).catch(e => {
      dispatch({
        type: LOGIN_ERROR,
        error: e.message
      });
      dispatch(setError(e.message));
    });
  };
};

export const logout = () => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    });

    return burgerFetch<IMessageResponse>("auth/logout", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: getCookie("refreshToken")
      })
    }).then(result => {
      deleteCookie("token");
      deleteCookie("refreshToken");
      dispatch({
        type: LOGOUT_SUCCESS
      });
    }).catch(e => {
      dispatch({
        type: LOGOUT_ERROR,
        error: e.message
      });
      dispatch(setError(e.message));
    });
  };
};

export const register = (name: string, email: string, password: string) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    return burgerFetch<IAuthResponse>("auth/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    }).then(result => {
      const accessToken = result.accessToken.split("Bearer ")[1];
      if (!!accessToken) {
        setCookie("token", accessToken);
      }
      if (!!result.refreshToken) {
        setCookie("refreshToken", result.refreshToken);
      }
      dispatch({
        type: REGISTER_SUCCESS,
        user: result.user
      })
    }).catch(e => {
      dispatch({
        type: REGISTER_ERROR,
        error: e.message
      });
      dispatch(setError(e.message));
    });
  };
};

export const forgotPassword = (email: string) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    });
    return burgerFetch<IMessageResponse>("password-reset", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email
      })
    }).then(result => {
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS
      });
    }).catch(e => {
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
        error: e.message
      });
      dispatch(setError(e.message));
    });
  };
};

export const resetPassword = (password: string, code: string) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    return burgerFetch<IMessageResponse>("password-reset/reset", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        token: code
      })
    }).then(result => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS
      });
    }).catch(e => {
      dispatch({
        type: RESET_PASSWORD_ERROR,
        error: e.message
      });
      dispatch(setError(e.message));
    });
  };
};

export const getUser = () => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: GET_USER_REQUEST
    });
    return fetchWithRefresh<IUserInfoResponse>("auth/user", ({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + getCookie("token")
      }
    }),
      "auth/token", ({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: getCookie("refreshToken")
        })
      })
    ).then(result => {
      dispatch({
        type: GET_USER_SUCCESS,
        user: result.user
      });
    }).catch(e => {
      dispatch({
        type: GET_USER_ERROR,
        error: e.message
      });
      dispatch(setError(e.message));
    });
  };
};

export const updateUser = (name: string, email: string, password: string) => {
  return function (dispatch: TAppDispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST
    });
    return fetchWithRefresh<IUserInfoResponse>("auth/user", ({
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + getCookie("token")
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    }),
      "auth/token", ({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: getCookie("refreshToken")
        })
      })
    ).then(result => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        user: result.user
      });
    }).catch(e => {
      dispatch({
        type: UPDATE_USER_ERROR,
        error: e.message
      });
      dispatch(setError(e.message));
    });
  };
};
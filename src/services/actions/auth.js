import { setError } from './app';
import { burgerFetch } from '../../utils/burgerFetch';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_ERROR = 'REFRESH_TOKEN_ERROR';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

export function login(email, password) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    return burgerFetch("auth/login", {
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
}

export function logout() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    });
    return burgerFetch("auth/logout", {
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
}

export function register(name, email, password) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    return burgerFetch("auth/register", {
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
}

export function forgotPassword(email) {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    });
    return burgerFetch("password-reset", {
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
}

export function resetPassword(password, code) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    return burgerFetch("password-reset/reset", {
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
}

export function refreshToken() {
  return function (dispatch) {
    dispatch({
      type: REFRESH_TOKEN_REQUEST
    });
    return burgerFetch("auth/token", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: getCookie("refreshToken")
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
        type: REFRESH_TOKEN_SUCCESS
      });
    }).catch(e => {
      dispatch({
        type: REFRESH_TOKEN_ERROR,
        error: e.message
      });
      dispatch(setError(e.message));
    });
  };
}

export function getUser(isRefresh = false) {
  return function (dispatch) {
    if (!isRefresh) {
      dispatch({
        type: GET_USER_REQUEST
      });
    }
    return burgerFetch("auth/user", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + getCookie("token")
      }
    }).then(result => {
      dispatch({
        type: GET_USER_SUCCESS,
        user: result.user
      });
    }).catch(e => {
      if (!isRefresh && e.status === 403) {
        dispatch(refreshToken(getUser(false)))
          .then(() => {
            dispatch(getUser(true));
          });
      } else {
        dispatch({
          type: GET_USER_ERROR,
          error: e.message
        });
        dispatch(setError(e.message));
      }
    });
  };
}

export function updateUser(name, email, password, isRefresh = false) {
  return function (dispatch) {
    if (!isRefresh) {
      dispatch({
        type: UPDATE_USER_REQUEST
      });
    }
    return burgerFetch("auth/user", {
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
    }).then(result => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        user: result.user
      });
    }).catch(e => {
      if (!isRefresh && e.status === 403) {
        dispatch(refreshToken())
          .then(() => {
            dispatch(updateUser(name, email, password, true));
          });
      } else {
        dispatch({
          type: UPDATE_USER_ERROR,
          error: e.message
        });
        dispatch(setError(e.message));
      }
    });
  };
}
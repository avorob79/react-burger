import { setCookie } from './cookie';

const burgerUrl = "https://norma.nomoreparties.space/api/";

export const burgerFetch = (url, options = {}) =>
  fetch(burgerUrl + url, { ...options })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        const error = new Error(`Ошибка запроса данных. Код ошибки ${response.status} (${response.statusText})`);
        error.status = response.status;
        return Promise.reject(error);
      }
    })
    .then(result => result?.success ? result : Promise.reject(new Error("Получены поврежденые данные")));

export const fetchWithRefresh = (url, options, refreshUrl, refreshOptions) =>
  burgerFetch(url, options)
    .catch((error) => {
      if (error.status === 403) {
        return burgerFetch(refreshUrl, refreshOptions)
          .then((result) => {
            const accessToken = result.accessToken.split("Bearer ")[1];
            if (!!accessToken) {
              setCookie("token", accessToken);
            }
            if (!!result.refreshToken) {
              setCookie("refreshToken", result.refreshToken);
            }
            options.headers.Authorization = result.accessToken;
            return burgerFetch(url, options);
          });
      } else {
        return Promise.reject(error);
      }
    });
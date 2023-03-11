import { setCookie } from './cookie';
import { IUser } from '../services/types';

interface ITokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

const burgerUrl = "https://norma.nomoreparties.space/api/";

export function burgerFetch<T>(url: string, options: RequestInit = {}): Promise<T> | Promise<never> {
  return fetch(burgerUrl + url, { ...options })
    .then((response: Response) => {
      if (response.ok) {
        return response.json();
      } else {
        const error = new Error(`Ошибка запроса данных. Код ошибки ${response.status} (${response.statusText})`, { cause: { status: response.status } });
        return Promise.reject(error);
      }
    })
    .then(result => result?.success ? result : Promise.reject(new Error("Получены повреждённые данные")));
}

export function fetchWithRefresh<T>(url: string, options: RequestInit, refreshUrl: string, refreshOptions: RequestInit): Promise<T> | Promise<never> {
  return burgerFetch<T>(url, options)
    .catch((error: any) => {
      if (error.cause.status === 403) {
        return burgerFetch<ITokenResponse>(refreshUrl, refreshOptions)
          .then((result: ITokenResponse) => {
            const accessToken = result.accessToken.split("Bearer ")[1];
            if (!!accessToken) {
              setCookie("token", accessToken);
            }
            if (!!result.refreshToken) {
              setCookie("refreshToken", result.refreshToken);
            }
            return burgerFetch<T>(url, !!options ? { ...options, headers: { ...options.headers, Authorization: result.accessToken } } : options);
          });
      } else {
        return Promise.reject(error);
      }
    });
}
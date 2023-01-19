const burgerUrl = "https://norma.nomoreparties.space/api/";

export const burgerFetch = (url, options = {}) =>
  fetch(burgerUrl + url, { ...options })
    .then(response => response.ok ? response.json() : Promise.reject(new Error(`Ошибка запроса данных. Код ошибки ${response.status} (${response.statusText})`)))
    .then(result => result?.success ? result : Promise.reject(new Error("Получены поврежденые данные")));
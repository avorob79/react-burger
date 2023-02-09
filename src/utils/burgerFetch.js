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
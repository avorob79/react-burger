export const SET_ERROR = 'SET_ERROR';
export const RESET_ERROR = 'RESET_ERROR';

export const setError = (message) => ({
    type: SET_ERROR,
    message: message
  });
  
  export const resetError = () => ({
    type: RESET_ERROR
  });
import { SET_ERROR, RESET_ERROR } from '../constants';


export interface ISetError {
  readonly type: typeof SET_ERROR;
  readonly message: string;
}

export interface IResetError {
  readonly type: typeof RESET_ERROR;
}

export type TApp =
  | ISetError
  | IResetError;

export const setError = (message: string): ISetError => ({
  type: SET_ERROR,
  message: message
});

export const resetError = (): IResetError => ({
  type: RESET_ERROR
});
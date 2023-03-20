import { SET_ERROR, RESET_ERROR } from '../constants';
import { TApp } from '../actions/app';

export interface IAppState {
  errors: ReadonlyArray<string>;
}

const initialState: IAppState = {
  errors: []
};

export const appReducer = (state = initialState, action: TApp): IAppState => {
  switch (action.type) {
    case SET_ERROR: {
      return {
        ...state,
        errors: [...state.errors, action.message]
      };
    }
    case RESET_ERROR: {
      return {
        ...state,
        errors: state.errors.slice(1)
      };
    }
    default: {
      return state;
    }
  }
};
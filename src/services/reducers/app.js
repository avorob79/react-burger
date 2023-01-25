import { SET_ERROR, RESET_ERROR } from '../actions/app';

const initialState = {
  errors: []
};

export const appReducer = (state = initialState, action) => {
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
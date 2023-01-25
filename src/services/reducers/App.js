
import { SET_ERROR, RESET_ERROR } from '../actions/App';

const initialState = {
  error: null
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR: {
      return {
        ...state,
        error: action.message
      };
    }
    case RESET_ERROR: {
      return {
        ...state,
        error: null
      };
    }
    default: {
      return state;
    }
  }
};
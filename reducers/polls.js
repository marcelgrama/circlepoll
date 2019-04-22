import { SET_POLLS } from '../store/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POLLS: {
      return [...action.payload];
    }

    default:
      return state;
  }
};

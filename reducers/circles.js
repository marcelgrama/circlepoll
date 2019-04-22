import { SET_CIRCLES } from '../store/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CIRCLES: {
      return [...action.payload];
    }

    default:
      return state;
  }
};

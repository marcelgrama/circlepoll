import { UPDATE_VOTE } from '../store/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VOTE: {
      return [...action.payload];
    }

    default:
      return state;
  }
};

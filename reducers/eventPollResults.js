import { SET_EVENT_POLL_RESULTS } from '../store/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENT_POLL_RESULTS: {
      return [...action.payload];
    }

    default:
      return state;
  }
};

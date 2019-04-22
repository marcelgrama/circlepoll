import { SET_ENDPOINT_LOADING, REMOVE_ENDPOINT_LOADING } from '../store/types';
import * as endpoints from '../api/endpoints';

// initialize all endpoints to false
const initialState = Object.values(endpoints).reduce(
  (accu, value) => ({ ...accu, [value]: false }),
  {}
);

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ENDPOINT_LOADING: {
      return {
        ...state,
        [action.payload]: true
      };
    }
    case REMOVE_ENDPOINT_LOADING: {
      return {
        ...state,
        [action.payload]: false
      };
    }
    default:
      return state;
  }
};

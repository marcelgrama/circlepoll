import { SET_SUCCESS, REMOVE_SUCCESS } from '../store/types';

const initialState = '';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SUCCESS: {
      return action.payload;
    }
    case REMOVE_SUCCESS: {
      return '';
    }
    default:
      return state;
  }
};

import { SET_GENERAL_ERROR, REMOVE_GENERAL_ERROR } from '../store/types';

const initialState = '';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GENERAL_ERROR: {
      return action.payload;
    }
    case REMOVE_GENERAL_ERROR: {
      return '';
    }
    default:
      return state;
  }
};

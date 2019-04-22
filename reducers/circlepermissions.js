import { SET_CIRCLEPERMISSION } from '../store/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CIRCLEPERMISSION: {
      return action.payload;
    }

    default:
      return state;
  }
};

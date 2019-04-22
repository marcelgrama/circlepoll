import { SET_CIRCLEINVITATION } from '../store/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CIRCLEINVITATION: {
      return action.payload;
    }

    default:
      return state;
  }
};

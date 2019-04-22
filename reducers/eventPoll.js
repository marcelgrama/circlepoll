import { SET_EVENT_POLL } from '../store/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EVENT_POLL: {
      return { ...action.payload };
    }

    default:
      return state;
  }
};

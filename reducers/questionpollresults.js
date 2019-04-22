import { SET_QUESTIONPOLLRESULTS } from '../store/types';

const initialState = { answers: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_QUESTIONPOLLRESULTS: {
      return { ...action.payload };
    }

    default:
      return state;
  }
};

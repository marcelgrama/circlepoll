import { SET_QUESTIONPOLL } from '../store/types';

const initialState = {
  authorId: { name: { first: '', last: '' } },
  answers: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_QUESTIONPOLL: {
      return { ...action.payload };
    }

    default:
      return state;
  }
};

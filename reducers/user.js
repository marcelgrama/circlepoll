import { AUTH_SIGN_IN, AUTH_SIGN_OUT } from '../store/types';

const initialState = {
  isAuth: false,
  name: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGN_IN: {
      return { ...state, isAuth: true, ...action.payload };
    }
    case AUTH_SIGN_OUT: {
      return { ...initialState };
    }
    default:
      return state;
  }
};

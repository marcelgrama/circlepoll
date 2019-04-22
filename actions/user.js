import { createAction } from 'redux-actions';
import { AUTH_SIGN_IN, AUTH_SIGN_OUT } from '../store/types';

export const signIn = createAction(AUTH_SIGN_IN);
export const signOut = createAction(AUTH_SIGN_OUT);

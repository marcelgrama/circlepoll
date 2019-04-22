import { createAction } from 'redux-actions';
import { SET_SUCCESS, REMOVE_SUCCESS } from '../store/types';

export const setSuccess = createAction(SET_SUCCESS);
export const removeSuccess = createAction(REMOVE_SUCCESS);

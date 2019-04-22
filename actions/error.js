import { createAction } from 'redux-actions';
import { SET_GENERAL_ERROR, REMOVE_GENERAL_ERROR } from '../store/types';

export const setGeneralError = createAction(SET_GENERAL_ERROR);
export const removeGeneralError = createAction(REMOVE_GENERAL_ERROR);

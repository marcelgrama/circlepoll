import { createAction } from 'redux-actions';
import { SET_ENDPOINT_LOADING, REMOVE_ENDPOINT_LOADING } from '../store/types';

export const setEndpointLoading = createAction(SET_ENDPOINT_LOADING);
export const removeEndpointLoading = createAction(REMOVE_ENDPOINT_LOADING);

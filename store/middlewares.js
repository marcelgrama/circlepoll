import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default composeWithDevTools(
  applyMiddleware(thunk, apiMiddleware, logger)
);

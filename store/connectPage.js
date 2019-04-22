import { connect, Provider } from 'react-redux';
import React from 'react';
import NoSSR from 'react-no-ssr';
import Loader from '../components/Loader';
import store from './';

export default (...args) => Page => {
  const ConnectedPage = connect(...args)(Page);
  return props => (
    <NoSSR onSSR={<Loader />}>
      <Provider store={store}>
        <ConnectedPage {...props} />
      </Provider>
    </NoSSR>
  );
};

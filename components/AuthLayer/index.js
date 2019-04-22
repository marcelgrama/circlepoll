import PropTypes from 'prop-types';
import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import Loader from '../Loader';
import fetch from '../../services/fetch';
import { signIn } from '../../actions/user';
import { getAuthToken } from '../../services/sessionStore';
import { authUser } from '../../api/endpoints';

class AuthLayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasPermission: false };
  }

  componentWillMount() {
    this.checkPermission().then(hasPermission => {
      if (hasPermission) {
        return this.setState({ hasPermission: true });
      }
      return Router.push(`/signin?redirect=${encodeURI(Router.router.asPath)}`);
    });
  }

  checkPermission = () =>
    new Promise(resolve => {
      if (this.props.authRequired) {
        if (this.props.isUserAuth) {
          return resolve(true);
        }
        const token = getAuthToken();
        if (token) {
          return fetch.get(authUser).then(response => {
            const userData = response.data;
            this.props.dispatch(signIn(userData));
            return resolve(true);
          });
        }
        return resolve(false);
      }
      return resolve(true);
    });

  render() {
    return this.state.hasPermission ? this.props.children : <Loader />;
  }
}

AuthLayer.propTypes = {
  children: PropTypes.node.isRequired,
  isUserAuth: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  authRequired: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isUserAuth: state.User.isAuth
});

export default connect(mapStateToProps)(AuthLayer);

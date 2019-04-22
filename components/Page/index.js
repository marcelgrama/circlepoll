import Head from 'next/head';
import PropTypes from 'prop-types';
import Router from 'next/router';
import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import AuthLayer from '../AuthLayer/';
import Loader from '../Loader/';
import NavigationController from '../NavigationController';
import theme from './theme';
import JssLoader from './JssLoader';

import Snackbars from '../Snackbars';

const Page = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentWillMount() {
    Router.onRouteChangeStart = () => this.onRouteChangeStart();
    Router.onRouteChangeComplete = () => this.onRouteChangeEnd();
    Router.onRouteChangeError = () => this.onRouteChangeEnd();
  }
  onRouteChangeStart = () => this.setState({ loading: true });
  onRouteChangeEnd = () => this.setState({ loading: false });

  render() {
    const { children, authRequired } = this.props;
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <JssLoader>
        <AuthLayer authRequired={authRequired}>
          <MuiThemeProvider theme={theme}>
            <Head>
              <title>CirclePoll</title>
            </Head>
            <CssBaseline />
            <NavigationController
              showNav={authRequired}
              title={this.props.title}
            >
              {children}
            </NavigationController>
          </MuiThemeProvider>
          <Snackbars />
        </AuthLayer>
      </JssLoader>
    );
  }
};

Page.propTypes = {
  authRequired: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node.isRequired
};

Page.defaultProps = {
  authRequired: false,
  title: ''
};

export default Page;

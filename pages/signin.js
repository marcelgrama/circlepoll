import React from 'react';
import PropTypes from 'prop-types';
import connectPage from '../store/connectPage';
import Page from '../components/Page/';
import SignIn from '../components/SignIn/';

const SignInPage = props => (
  <Page>
    <SignIn redirectUrl={props.url.query.redirect} />
  </Page>
);
SignInPage.propTypes = { url: PropTypes.object.isRequired };
export default connectPage()(SignInPage);

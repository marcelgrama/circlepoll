import React from 'react';
import PropTypes from 'prop-types';
import theme from '../Page/theme';

const layoutStyle = {
  padding: '10px 0',
  color: theme.palette.grey[600],
  fontFamily: 'Verdana, Geneva, sans-serif',
  fontSize: '14px'
};

const logoStyle = {
  width: 126,
  marginTop: 20,
  marginBottom: 20
};

const Layout = ({ children }) => (
  <div style={layoutStyle}>
    {children}
    <br />
    <a href="https://circlepoll.arobs.com">
      <img
        style={logoStyle}
        alt="circlepoll logo"
        src="https://res.cloudinary.com/circlepoll/image/upload/v1523780964/logo.png"
      />
    </a>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;

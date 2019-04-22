import React from 'react';
import PropTypes from 'prop-types';
import theme from '../Page/theme';

const aStyle = {
  fontWeight: 'bold',
  color: theme.palette.primary.main
};

const A = ({ children, href }) => (
  <a style={aStyle} href={href}>
    {children}
  </a>
);

A.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired
};

export default A;

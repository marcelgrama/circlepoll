import React from 'react';
import PropTypes from 'prop-types';

const titleStyle = {
  fontSize: 24,
  marginTop: 10,
  marginBottom: 10,
  letterSpacing: -1,
  color: '#4f5564'
};

const Title = ({ children }) => <h1 style={titleStyle}>{children}</h1>;

Title.propTypes = {
  children: PropTypes.node.isRequired
};

export default Title;

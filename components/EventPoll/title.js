import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

function Title(props) {
  return <Typography variant="title">{props.title}</Typography>;
}

Title.propTypes = {
  title: PropTypes.string.isRequired
};

export default Title;

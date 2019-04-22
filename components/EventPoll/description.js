import React from 'react';
import PropTypes from 'prop-types';
import { MarginParagraph } from './style';

function Description(props) {
  return (
    <div>
      <MarginParagraph variant="body1" align="justify">
        {props.desc}
      </MarginParagraph>
    </div>
  );
}

Description.propTypes = {
  desc: PropTypes.string.isRequired
};

export default Description;

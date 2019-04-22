import React from 'react';
import PropTypes from 'prop-types';
import { StyledAvatar } from './style';

function UserAvatar(props) {
  return (
    <React.Fragment>
      {props.image ? (
        <StyledAvatar variant={props.variant} src={props.image} />
      ) : (
        <StyledAvatar variant={props.variant}>
          {props.name.first.charAt(0).toUpperCase()}
          {props.name.last.charAt(0).toUpperCase()}
        </StyledAvatar>
      )}
    </React.Fragment>
  );
}
UserAvatar.propTypes = {
  variant: PropTypes.string,
  image: PropTypes.string.isRequired,
  name: PropTypes.object.isRequired
};

UserAvatar.defaultProps = {
  variant: 'default'
};

export default UserAvatar;

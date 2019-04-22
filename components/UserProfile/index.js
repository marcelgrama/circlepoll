import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import Tooltip from 'material-ui/Tooltip';
import UserAvatar from '../UserAvatar';

function UserProfile(props) {
  return (
    <div>
      <Tooltip title={props.toolTipTitle}>
        <Chip
          avatar={
            <UserAvatar variant="small" name={props.name} image={props.image} />
          }
          label={`${props.name.first} ${props.name.last}`}
        />
      </Tooltip>
    </div>
  );
}
UserProfile.propTypes = {
  image: PropTypes.string,
  name: PropTypes.object.isRequired,
  toolTipTitle: PropTypes.string
};
UserProfile.defaultProps = {
  image: '',
  toolTipTitle: ''
};
export default UserProfile;

import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Chip from 'material-ui/Chip';
import AlarmOff from 'material-ui-icons/AlarmOff';
import Alarm from 'material-ui-icons/Alarm';
import Avatar from 'material-ui/Avatar';
import Tooltip from 'material-ui/Tooltip';
import moment from 'moment';

class Date extends React.PureComponent {
  render() {
    const { type } = this.props;
    const date = moment(this.props.date)
      .calendar()
      .toString();
    return (
      <Grid container direction="row" spacing={16}>
        <Grid item>
          <Tooltip title={type === 'startDate' ? 'Start Date' : 'End Date'}>
            <Chip
              avatar={
                <Avatar>
                  {type === 'startDate' ? <Alarm /> : <AlarmOff />}
                </Avatar>
              }
              label={date}
            />
          </Tooltip>
        </Grid>
      </Grid>
    );
  }
}
Date.propTypes = {
  date: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default Date;

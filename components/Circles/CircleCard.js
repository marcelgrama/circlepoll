import React from 'react';
import PropTypes from 'prop-types';
import PeopleIcon from 'material-ui-icons/People';
import { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';
import Grid from 'material-ui/Grid';
import { StyledCard } from './style';

function CirclePollCard(props) {
  return (
    <div>
      <StyledCard>
        <CardContent onClick={props.callback}>
          <Typography variant="headline" gutterBottom>
            {props.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {props.desc}
          </Typography>
          <Typography variant="subheading" gutterBottom>
            <Grid container spacing={8}>
              <Grid item>
                <Tooltip title="People in circlepoll">
                  <PeopleIcon />
                </Tooltip>
              </Grid>
              <Grid item>{props.usersCount}</Grid>
            </Grid>
          </Typography>
        </CardContent>
      </StyledCard>
    </div>
  );
}

CirclePollCard.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  usersCount: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired
};
export default CirclePollCard;

import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { CardContent } from 'material-ui/Card';
import QuestionIcon from 'material-ui-icons/HelpOutline';
import EventIcon from 'material-ui-icons/Event';
import Typography from 'material-ui/Typography';
import { StyledCard, StyledGrid } from './style';

function PollCard(props) {
  return (
    <StyledCard>
      <CardContent onClick={props.callback}>
        <Grid container spacing={40}>
          <StyledGrid item>
            {props.type === 'question' ? <QuestionIcon /> : <EventIcon />}
          </StyledGrid>
          <Grid item>
            <Typography variant="headline">{props.question}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
}

PollCard.propTypes = {
  type: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired
};
export default PollCard;

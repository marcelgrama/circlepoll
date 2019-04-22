import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import { LinearProgress } from 'material-ui/Progress';
import ParticipationPanel from '../../components/ParticipationPanel';
import Title from '../../components/EventPoll/title';
import Description from '../../components/EventPoll/description';
import { pollEventResults } from '../../api/endpoints';
import fetch from '../../services/fetch';
import { setEventPollResults } from '../../actions/eventpollresults';

class EventPollResults extends React.Component {
  componentWillMount() {
    this.loadEventPollResults();
  }

  loadEventPollResults = () => {
    fetch
      .get(pollEventResults, { params: { id: this.props.id } })
      .then(response => {
        const eventData = response.data;
        this.props.dispatch(setEventPollResults(eventData));
      });
  };

  render() {
    if (_.isEmpty(this.props.eventPollResults)) {
      return <LinearProgress />;
    }

    const participateUsers = this.props.eventPollResults.filter(
      option => option.status === 'participate'
    );
    const noParticipateUsers = this.props.eventPollResults.filter(
      option => option.status === 'noParticipate'
    );
    const maybeUsers = this.props.eventPollResults.filter(
      option => option.status === 'maybe'
    );

    const poll = this.props.eventPollResults[0].pollId;

    return (
      <div>
        <Title title={poll.title} />
        <Description desc={poll.desc} />
        <Grid container spacing={16}>
          <Grid item md={4} xs={12}>
            <Hidden smDown>
              <ParticipationPanel
                mobile={false}
                title="Participate"
                users={participateUsers}
              />
            </Hidden>

            <Hidden mdUp>
              <ParticipationPanel
                mobile
                title="Participate"
                users={participateUsers}
              />
            </Hidden>
          </Grid>
          <Grid item md={4} xs={12}>
            <Hidden smDown>
              <ParticipationPanel
                mobile={false}
                title="Maybe"
                users={maybeUsers}
              />
            </Hidden>

            <Hidden mdUp>
              <ParticipationPanel mobile title="Maybe" users={maybeUsers} />
            </Hidden>
          </Grid>
          <Grid item md={4} xs={12}>
            <Hidden smDown>
              <ParticipationPanel
                mobile={false}
                title="Not Participate"
                users={noParticipateUsers}
              />
            </Hidden>

            <Hidden mdUp>
              <ParticipationPanel
                mobile
                title="Not Participate"
                users={noParticipateUsers}
              />
            </Hidden>
          </Grid>
        </Grid>
      </div>
    );
  }
}

EventPollResults.propTypes = {
  eventPollResults: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  eventPollResults: state.EventPollResults,
  loading: state.Loading[pollEventResults]
});

export default connect(mapStateToProps)(EventPollResults);

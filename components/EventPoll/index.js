import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Router from 'next/router';
import { connect } from 'react-redux';
import { LinearProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import Title from '../../components/EventPoll/title';
import Description from '../../components/EventPoll/description';
import Buttons from '../../components/EventPoll/buttons';
import { pollEvent, eventVotes } from '../../api/endpoints';
import fetch from '../../services/fetch';
import { setEventPoll } from '../../actions/eventpoll';

class Event extends React.Component {
  componentWillMount() {
    this.loadEvents();
  }

  onVoteSubmit = status => {
    const participationData = {
      pollId: this.props.pollId,
      status
    };
    fetch.post(eventVotes, participationData);
    Router.push({
      pathname: '/EventPollResults',
      query: { id: this.props.pollId }
    });
  };

  loadEvents = () =>
    fetch
      .get(pollEvent, {
        params: {
          id: this.props.pollId
        }
      })
      .then(response => {
        const PollData = response.data;
        this.props.dispatch(setEventPoll(PollData));
      });

  render() {
    const data = this.props.eventPoll;
    const loading = _.isEmpty(data);
    if (loading) {
      return <LinearProgress />;
    }

    return (
      <Grid key={data._id}>
        <Title title={data.title} />
        <Description desc={data.desc} />

        <Buttons callback={this.onVoteSubmit} showMaybeButton={data.hasMaybe} />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  eventPoll: state.EventPoll
});

Event.propTypes = {
  dispatch: PropTypes.func.isRequired,
  eventPoll: PropTypes.object.isRequired,
  pollId: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(Event);

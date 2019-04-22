import React from 'react';
import PropTypes from 'prop-types';
import Page from '../components/Page/';
import EventPollResults from '../components/EventPollResults/index';
import connectPage from '../store/connectPage';

class EventPollResultsPage extends React.PureComponent {
  render() {
    return (
      <Page authRequired title="Event Poll Result">
        <EventPollResults id={this.props.url.query.id} />
      </Page>
    );
  }
}

EventPollResultsPage.propTypes = {
  url: PropTypes.object.isRequired
};

export default connectPage()(EventPollResultsPage);

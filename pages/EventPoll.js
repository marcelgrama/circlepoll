import React from 'react';
import PropTypes from 'prop-types';
import Page from '../components/Page/';
import Event from '../components/EventPoll';
import connectPage from '../store/connectPage';

class EventPoll extends React.PureComponent {
  render() {
    return (
      <Page authRequired title="Event Poll">
        <Event pollId={this.props.url.query.id} />
      </Page>
    );
  }
}
EventPoll.propTypes = {
  url: PropTypes.object.isRequired
};
export default connectPage()(EventPoll);

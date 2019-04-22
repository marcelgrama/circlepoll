import React from 'react';
import PropTypes from 'prop-types';
import Page from '../components/Page/';
import connectPage from '../store/connectPage';
import EventPollCreation from '../components/EventPollCreation/index';

class CreateEventPage extends React.PureComponent {
  render() {
    return (
      <Page authRequired title="Create Event Poll">
        <EventPollCreation id={this.props.url.query.id} />
      </Page>
    );
  }
}

CreateEventPage.propTypes = {
  url: PropTypes.object.isRequired
};
export default connectPage()(CreateEventPage);

import React from 'react';
import PropTypes from 'prop-types';
import Page from '../components/Page/';
import Polls from '../components/Polls/index';
import connectPage from '../store/connectPage';

class PollsPage extends React.PureComponent {
  render() {
    return (
      <Page authRequired title="Polls">
        <Polls id={this.props.url.query.id} />
      </Page>
    );
  }
}

PollsPage.propTypes = {
  url: PropTypes.object.isRequired
};
export default connectPage()(PollsPage);

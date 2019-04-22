import React from 'react';
import PropTypes from 'prop-types';
import QuestionPollResults from '../components/QuestionPollResults/';
import Page from '../components/Page/';
import connectPage from '../store/connectPage';

class PollPage extends React.PureComponent {
  render() {
    return (
      <Page authRequired title="Question Poll Results">
        <QuestionPollResults id={this.props.url.query.id} />
      </Page>
    );
  }
}
PollPage.propTypes = {
  url: PropTypes.object.isRequired
};

export default connectPage()(PollPage);

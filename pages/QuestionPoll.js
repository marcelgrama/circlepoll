import React from 'react';
import PropTypes from 'prop-types';
import QuestionPoll from '../components/QuestionPoll/';
import Page from '../components/Page/';
import connectPage from '../store/connectPage';

class PollPage extends React.PureComponent {
  render() {
    return (
      <Page authRequired title="Question Poll">
        <QuestionPoll id={this.props.url.query.id} />
      </Page>
    );
  }
}
PollPage.propTypes = {
  url: PropTypes.object.isRequired
};

export default connectPage()(PollPage);

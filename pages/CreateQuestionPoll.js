import React from 'react';
import PropTypes from 'prop-types';
import Page from '../components/Page/';
import connectPage from '../store/connectPage';
import CreateQuestionPoll from '../components/CreateQuestionPoll/index';

class CreateQuestionPollPage extends React.PureComponent {
  render() {
    return (
      <Page authRequired title="Create Question Poll">
        <CreateQuestionPoll id={this.props.url.query.id} />
      </Page>
    );
  }
}

CreateQuestionPollPage.propTypes = {
  url: PropTypes.object.isRequired
};

export default connectPage()(CreateQuestionPollPage);

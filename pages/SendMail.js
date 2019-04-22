import React from 'react';
import PropTypes from 'prop-types';
import Page from '../components/Page/';
import SendMail from '../components/SendMail';
import connectPage from '../store/connectPage';

class demoSendMail extends React.PureComponent {
  render() {
    return (
      <Page authRequired title="Send Mail">
        <SendMail id={this.props.url.query.id} />
      </Page>
    );
  }
}
demoSendMail.propTypes = {
  url: PropTypes.object.isRequired
};

export default connectPage()(demoSendMail);

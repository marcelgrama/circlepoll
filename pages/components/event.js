import React from 'react';
import Page from '../../components/Page/';
import Event from '../../components/EventPoll';
import connectPage from '../../store/connectPage';

const DemoEventPoll = () => (
  <Page authRequired>
    <Event pollId={this.props.url.query.id} />
  </Page>
);

export default connectPage()(DemoEventPoll);

import React from 'react';
import Page from '../../components/Page/';
import EventPollResults from '../../components/EventPollResults/index';
import connectPage from '../../store/connectPage';

const DemoEventPollResults = () => (
  <Page>
    <EventPollResults />
  </Page>
);

export default connectPage()(DemoEventPollResults);

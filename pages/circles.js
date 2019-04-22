import React from 'react';
import Page from '../components/Page/';
import Circles from '../components/Circles/index';
import connectPage from '../store/connectPage';

const DemoCircles = () => (
  <Page authRequired title="Circles">
    <Circles />
  </Page>
);

export default connectPage()(DemoCircles);

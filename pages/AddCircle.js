import React from 'react';
import Page from '../components/Page/';
import AddCircle from '../components/AddCircle/index';
import connectPage from '../store/connectPage';

const CreateCircle = () => (
  <Page authRequired title="Add Circle">
    <AddCircle />
  </Page>
);

export default connectPage()(CreateCircle);

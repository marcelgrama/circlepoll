import React from 'react';
import Page from '../../components/Page/';
import MenuBar from '../../components/AppBar';
import connectPage from '../../store/connectPage';

const appbar = () => (
  <Page>
    <MenuBar
      onMenuClick={() => alert('click')}
      onAltMenuClick={(name, route) => console.log(name, route)}
      title="Example2"
    />
  </Page>
);

export default connectPage()(appbar);

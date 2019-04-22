import React from 'react';
import PropTypes from 'prop-types';
import Page from '../components/Page/';
import Invitation from '../components/Invitation';
import connectPage from '../store/connectPage';

class CircleInvitation extends React.Component {
  onCreatePermision = data => data;
  render() {
    return (
      <Page authRequired title="Invitation">
        <Invitation
          onCreatePermision={this.onCreatePermision}
          id={this.props.url.query.id}
        />
      </Page>
    );
  }
}
CircleInvitation.propTypes = { url: PropTypes.object.isRequired };
export default connectPage()(CircleInvitation);

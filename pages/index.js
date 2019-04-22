import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import React from 'react';
import Typography from 'material-ui/Typography';
import Page from '../components/Page/';
import connectPage from '../store/connectPage';

const App = class extends React.PureComponent {
  render() {
    const { user } = this.props;
    return (
      <Page authRequired title="Home Page">
        <Typography variant="headline">
          Welcome, {user.name.first} {user.name.last}
          <Avatar src={user.image} />
        </Typography>
      </Page>
    );
  }
};

App.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.User
});

export default connectPage(mapStateToProps)(App);

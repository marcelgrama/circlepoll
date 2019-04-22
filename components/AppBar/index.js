import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import { ListItem } from 'material-ui/List';
import Popover from 'material-ui/Popover';
import AppBarMU from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import MenuIcon from 'material-ui-icons/Menu';
import SettingsIcon from 'material-ui-icons/Settings';
import altMenuItems from './altMenuItems';
import { signOut } from '../../actions/user';
import { setAuthToken } from '../../services/sessionStore';
import { StyledToolbar, IconGrid, StyledButtonIcon } from './style';

class AppBar extends React.Component {
  state = { open: false };

  onAltMenuClose = () => {
    this.setState({ open: false });
  };
  onSignOut = () => {
    setAuthToken('');
    Router.push('/signin');
    this.props.dispatch(signOut());
  };
  onAltMenuClick = item => () => {
    if (item.route === '/signout') {
      this.onSignOut();
    } else {
      Router.push(item.route);
    }
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <div>
        <AppBarMU position="fixed">
          <StyledToolbar>
            {this.props.showMenu && this.props.viewport === 'desktop' ? (
              <StyledButtonIcon
                color="inherit"
                onClick={this.props.onMenuClick}
              >
                <ChevronLeftIcon />
              </StyledButtonIcon>
            ) : (
              <IconButton color="inherit" onClick={this.props.onMenuClick}>
                <MenuIcon />
              </IconButton>
            )}

            <Typography color="inherit" variant="title">
              {this.props.title}
            </Typography>
            <IconButton color="inherit" onClick={this.handleClick}>
              <SettingsIcon />
            </IconButton>
          </StyledToolbar>
        </AppBarMU>
        <Popover
          elevation={5}
          open={this.state.open}
          onClose={this.onAltMenuClose}
          marginThreshold={0}
          anchorReference="anchorPosition"
          anchorPosition={{
            top: 64,
            left: window.innerWidth
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          {altMenuItems.map(item => (
            <ListItem
              button
              key={item.route}
              onClick={this.onAltMenuClick(item)}
            >
              <Grid spacing={16} container wrap="nowrap">
                <IconGrid item>
                  <item.icon color="action" />
                </IconGrid>
                <Grid item>
                  <Typography variant="subheading">{item.name}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </Popover>
      </div>
    );
  }
}
AppBar.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  showMenu: PropTypes.bool.isRequired,
  viewport: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(AppBar);

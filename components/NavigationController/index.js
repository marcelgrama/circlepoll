import React from 'react';
import PropTypes from 'prop-types';
import Hidden from 'material-ui/Hidden';
import AppBar from '../AppBar';
import Navigationbar from '../NavigationBar';
import { ListItems } from '../../components/NavigationBar/Items';
import { isUp } from '../../services/responsive';

class NavigationController extends React.PureComponent {
  state = {
    showStatus: isUp('md')
  };

  handleChange = () => {
    this.setState({ showStatus: !this.state.showStatus });
  };
  render() {
    if (!this.props.showNav) {
      return this.props.children;
    }
    return (
      <div>
        <Hidden smDown>
          <AppBar
            onMenuClick={this.handleChange}
            title={this.props.title}
            showMenu={this.state.showStatus}
            viewport="desktop"
          />
          <Navigationbar
            items={ListItems}
            showMenu={this.state.showStatus}
            onMenuClick={this.handleChange}
            viewport="desktop"
          >
            {this.props.children}
          </Navigationbar>
        </Hidden>
        <Hidden mdUp>
          <AppBar
            onMenuClick={this.handleChange}
            title={this.props.title}
            showMenu={this.state.showStatus}
            viewport="mobile"
          />
          <Navigationbar
            items={ListItems}
            showMenu={this.state.showStatus}
            onMenuClick={this.handleChange}
            viewport="mobile"
          >
            {this.props.children}
          </Navigationbar>
        </Hidden>
      </div>
    );
  }
}

NavigationController.propTypes = {
  children: PropTypes.node.isRequired,
  showNav: PropTypes.bool,
  title: PropTypes.string.isRequired
};

NavigationController.defaultProps = {
  showNav: false
};

export default NavigationController;

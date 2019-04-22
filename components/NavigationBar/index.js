import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Slide from 'material-ui/transitions/Slide';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
import { ListItem } from 'material-ui/List';
import Router from 'next/router';
import UserAvatar from '../UserAvatar';
import {
  StyledDivNavigationBar,
  StyledList,
  StyledDivListContainer,
  MainContainer,
  ListItemHeader,
  GridSvgIcon,
  StyledGridItemList,
  GridCloseIcon
} from './style';

class NavigationBar extends React.PureComponent {
  onMenuClick = route => () => Router.push(route);
  render() {
    const { user, children } = this.props;
    return (
      <div>
        <StyledDivNavigationBar viewport={this.props.viewport}>
          <Slide
            direction="right"
            in={this.props.showMenu}
            mountOnEnter
            unmountOnExit
          >
            <StyledList
              subheader={
                <ListItemHeader viewport={this.props.viewport}>
                  <Grid
                    container
                    spacing={16}
                    alignItems="center"
                    wrap="nowrap"
                  >
                    <Grid item>
                      <UserAvatar image={user.image} name={user.name} />
                    </Grid>
                    <Grid item>
                      <Typography variant="title">
                        <p>
                          {user.name.first} {user.name.last}
                        </p>
                      </Typography>
                    </Grid>
                    <GridCloseIcon item>
                      {this.props.viewport === 'mobile' ? (
                        <IconButton
                          color="inherit"
                          onClick={this.props.onMenuClick}
                        >
                          <ClearIcon />
                        </IconButton>
                      ) : (
                        ''
                      )}
                    </GridCloseIcon>
                  </Grid>
                </ListItemHeader>
              }
            >
              <StyledDivListContainer>
                {this.props.items.map(item => (
                  <ListItem
                    button
                    key={item.route}
                    onClick={this.onMenuClick(item.route)}
                  >
                    <Grid
                      container
                      spacing={16}
                      alignItems="center"
                      wrap="nowrap"
                    >
                      <GridSvgIcon item>
                        <item.icon />
                      </GridSvgIcon>
                      <StyledGridItemList item viewport={this.props.viewport}>
                        <Typography variant="subheading" color="inherit">
                          {item.name}
                        </Typography>
                      </StyledGridItemList>
                    </Grid>
                  </ListItem>
                ))}
              </StyledDivListContainer>
            </StyledList>
          </Slide>
        </StyledDivNavigationBar>
        <MainContainer childport={this.props.showMenu}>
          {children}
        </MainContainer>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  items: PropTypes.array.isRequired,
  showMenu: PropTypes.bool.isRequired,
  viewport: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

const mapStateToProps = state => ({
  user: state.User
});

export default connect(mapStateToProps)(NavigationBar);

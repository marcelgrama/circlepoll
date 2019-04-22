import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { InnerGrid } from './style';

class Buttons extends React.PureComponent {
  onBtnClick = status => () => this.props.callback(status);

  render() {
    return (
      <div>
        <InnerGrid container justify="center" spacing={16}>
          <Grid item xs={12} sm={4} md={3}>
            <Button
              variant="raised"
              color="primary"
              fullWidth
              value="Participating"
              onClick={this.onBtnClick('participate')}
            >
              Participating
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Button
              variant="raised"
              value="Not Participating"
              onClick={this.onBtnClick('noParticipate')}
              color="secondary"
              fullWidth
            >
              Not Participating
            </Button>
          </Grid>
          {this.props.showMaybeButton ? (
            <Grid item xs={12} sm={4} md={3}>
              <Button
                variant="raised"
                value="Maybe"
                onClick={this.onBtnClick('maybe')}
                color="default"
                fullWidth
              >
                Maybe
              </Button>
            </Grid>
          ) : (
            ''
          )}
        </InnerGrid>
      </div>
    );
  }
}

Buttons.propTypes = {
  callback: PropTypes.func.isRequired,
  showMaybeButton: PropTypes.bool.isRequired
};

export default Buttons;

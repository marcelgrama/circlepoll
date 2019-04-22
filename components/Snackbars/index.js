import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import { removeGeneralError } from '../../actions/error';
import { removeSuccess } from '../../actions/success';
import { StyledSnackBar } from './style';

class Snackbars extends Component {
  handleClose = () => {
    if (this.props.success) {
      this.props.dispatch(removeSuccess());
    } else {
      this.props.dispatch(removeGeneralError());
    }
  };
  render() {
    return (
      <StyledSnackBar
        type={this.props.success ? 'success' : 'error'}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        key={this.props.error || this.props.success}
        SnackbarContentProps={{
          className: 'error-snackbar-content'
        }}
        open={!!this.props.error || !!this.props.success}
        autoHideDuration={6000}
        onClose={this.handleClose}
        message={this.props.error || this.props.success}
        action={[
          <IconButton
            key="close-btn"
            color="inherit"
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }
}

Snackbars.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  success: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  error: state.Error,
  success: state.Success
});

export default connect(mapStateToProps)(Snackbars);

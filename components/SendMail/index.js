import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Router from 'next/router';
import Grow from 'material-ui/transitions/Grow';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';
import Tooltip from 'material-ui/Tooltip';
import { setSuccess } from '../../actions/success';
import ErrorMsg from '../ErrorMsg';
import fetch from '../../services/fetch';
import { emailSchema } from '../../services/validation';
import { StyledIconButton, StyledAddButton, StyledSendButton } from './style';
import { invitation } from '../../api/endpoints';

class SendEmail extends React.Component {
  constructor(props) {
    super(props);
    this.key = [this.genId()];
    this.initialState = {
      error: '',
      email: ['']
    };
    this.state = this.initialState;
  }

  onAddEmail = () => {
    const newEmail = this.state.email.slice();
    newEmail.push('');
    this.key.push(this.genId());
    this.setState({
      email: newEmail
    });
  };
  onDeleteEmail = index => () => {
    const newEmail = this.state.email.slice();
    newEmail.splice(index, 1);
    this.key.splice(index, 1);
    this.setState({
      email: newEmail
    });
  };

  onEmailChange = index => event => {
    const newEmail = this.state.email.slice();
    newEmail[index] = event.target.value;
    this.setState({
      email: newEmail
    });
  };

  submitEmail = () => {
    const emailData = _.omit(this.state, ['error']);
    const validationResult = emailSchema.validate(emailData);
    if (validationResult.error) {
      this.setState({ error: validationResult.error.details[0].message });
    } else {
      this.setState({ error: '' });
      fetch
        .post(invitation, emailData, { params: { id: this.props.id } })
        .then(response => {
          const { error } = response.data;
          if (error) {
            this.setState({ error });
          } else {
            this.props.dispatch(setSuccess('Invitation sent!'));
            Router.push({
              pathname: '/polls',
              query: { id: this.props.id }
            });
          }
        });
    }
  };

  genId = () => Math.random();

  render() {
    const { email } = this.state;

    const nume = email.length;
    return (
      <div>
        <Typography variant="headline">Invite users in this circle</Typography>
        {this.state.email.map((answer, index) => (
          <Grid item key={this.key[index]}>
            <Grid container direction="row" spacing={16}>
              <Grid item>
                <TextField label="Email" onChange={this.onEmailChange(index)} />
                {nume > 1 ? (
                  <StyledIconButton onClick={this.onDeleteEmail(index)}>
                    <DeleteIcon />
                  </StyledIconButton>
                ) : (
                  ''
                )}
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid item>
          <Grid container direction="row" spacing={16}>
            <Grid item>
              <Tooltip id="tooltip-fab" title="Add Email">
                <Button
                  variant="raised"
                  color="primary"
                  onClick={this.onAddEmail}
                >
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={8}
                  >
                    <Grid item>
                      <StyledAddButton />
                    </Grid>
                    <Grid item>Add Email</Grid>
                  </Grid>
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Button
                variant="raised"
                value="Submit"
                color="primary"
                onClick={this.submitEmail}
              >
                <Grid container direction="row" alignItems="center" spacing={8}>
                  <Grid item>
                    <StyledSendButton />
                  </Grid>
                  <Grid item>Send invitation</Grid>
                </Grid>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {this.state.error ? (
            <Grow in>
              <ErrorMsg>{this.state.error}</ErrorMsg>
            </Grow>
          ) : null}
        </Grid>
      </div>
    );
  }
}

SendEmail.propTypes = {
  id: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(SendEmail);

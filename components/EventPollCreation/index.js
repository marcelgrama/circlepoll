import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Grow from 'material-ui/transitions/Grow';
import ErrorMsg from '../ErrorMsg';
import { eventPollCreationSchema } from '../../services/validation';
import fetch from '../../services/fetch';
import { pollEvent } from '../../api/endpoints';

class EventPollCreation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      desc: '',
      error: '',
      hasMaybe: false
    };
  }

  handleChangeTitle = event => {
    this.setState({ title: event.target.value });
  };

  handleChangeDesc = event => {
    this.setState({ desc: event.target.value });
  };

  handleChangeMaybe = event => {
    this.setState({ hasMaybe: event.target.checked });
  };

  handleSubmit = id => () => {
    const pollData = _.omit(this.state, ['error']);
    const validationResult = eventPollCreationSchema.validate(pollData);
    if (validationResult.error) {
      this.setState({ error: validationResult.error.details[0].message });
    } else {
      this.setState({ error: '' });
      fetch
        .post(pollEvent, { circleId: this.props.id, ...pollData })
        .then(response => {
          const { error } = response.data;
          if (error) {
            this.setState({ error });
          } else {
            this.setState(this.initialState);
          }
        });
      Router.push({
        pathname: '/polls',
        query: { id }
      });
    }
  };
  render() {
    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Title"
              value={this.state.title}
              onChange={this.handleChangeTitle}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              label="Desc"
              multiline
              rows={2}
              value={this.state.desc}
              onChange={this.handleChangeDesc}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.hasMaybe}
                  onChange={this.handleChangeMaybe}
                />
              }
              label="Allow maybe button"
            />
          </Grid>
          <Grid item>
            {this.state.error ? (
              <Grow in>
                <Grid item>
                  <ErrorMsg justify="center">{this.state.error}</ErrorMsg>
                </Grid>
              </Grow>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              variant="raised"
              onClick={this.handleSubmit(this.props.id)}
              color="primary"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

EventPollCreation.propTypes = {
  id: PropTypes.string.isRequired
};

export default EventPollCreation;

import React from 'react';
import _ from 'lodash';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grow from 'material-ui/transitions/Grow';
import Router from 'next/router';
import ErrorMsg from '../ErrorMsg';
import { GroupIcon } from './style';
import { addCircleSchema } from '../../services/validation';
import fetch from '../../services/fetch';
import { circle } from '../../api/endpoints';

class AddCircle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.initialState = {
      error: '',
      name: '',
      desc: ''
    };
    this.state = this.initialState;
  }

  onInputChangeName = e => {
    this.setState({ name: e.target.value });
  };
  onInputChangeDesc = e => {
    this.setState({ desc: e.target.value });
  };
  onKeyPress = e => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  };

  onSubmit = () => {
    const circleData = _.omit(this.state, ['error']);
    const validationResult = addCircleSchema.validate(circleData);
    if (validationResult.error) {
      this.setState({ error: validationResult.error.details[0].message });
    } else {
      this.setState({ error: '' });
      fetch.post(circle, circleData).then(response => {
        const { error } = response.data;
        if (error) {
          this.setState({ error });
        } else {
          this.setState(this.initialState);
        }
      });
      setTimeout(
        Router.push({
          pathname: '/circles'
        }),
        1500
      );
    }
  };
  render() {
    return (
      <Grid container spacing={8}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="circleName"
            label="Circle name"
            multiline
            margin="normal"
            value={this.state.name}
            onChange={this.onInputChangeName}
            onKeyPress={this.onKeyPress}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="circleDescription"
            label="Circle description"
            multiline
            rows="4"
            rowsMax="4"
            margin="normal"
            value={this.state.desc}
            onChange={this.onInputChangeDesc}
            onKeyPress={this.onKeyPress}
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
          <Button variant="raised" color="primary" onClick={this.onSubmit}>
            <GroupIcon />Create circle
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default AddCircle;

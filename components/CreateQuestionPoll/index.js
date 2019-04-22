import React from 'react';
import _ from 'lodash';
import Router from 'next/router';
import Grid from 'material-ui/Grid';
import Grow from 'material-ui/transitions/Grow';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import DeleteIcon from 'material-ui-icons/Delete';
import ErrorMsg from '../ErrorMsg';
import fetch from '../../services/fetch';
import { StyledIconButton, StyledAddButton, StyledSendButton } from './style';
import { questionPollSchema } from '../../services/validation';
import { questionPoll } from '../../api/endpoints';

class CreateQuestionPoll extends React.Component {
  constructor(props) {
    super(props);
    this.key = [this.genId()];
    this.initialState = {
      question: '',
      error: '',
      answers: ['']
    };
    this.state = this.initialState;
  }

  onAddAnswer = () => {
    const newAnswers = this.state.answers.slice();
    newAnswers.push('');
    this.key.push(this.genId());
    this.setState({
      answers: newAnswers
    });
  };
  onDeleteAnswer = index => () => {
    const newAnswers = this.state.answers.slice();
    newAnswers.splice(index, 1);
    this.key.splice(index, 1);
    this.setState({
      answers: newAnswers
    });
  };

  onAnswerChange = index => event => {
    const newAnswers = this.state.answers.slice();
    newAnswers[index] = event.target.value;
    this.setState({
      answers: newAnswers
    });
  };

  submitQuestion = id => () => {
    const questionData = _.omit(this.state, ['error']);
    const validationResult = questionPollSchema.validate(questionData);
    if (validationResult.error) {
      this.setState({ error: validationResult.error.details[0].message });
    } else {
      this.setState({ error: '' });
      fetch
        .post(questionPoll, {
          circleId: this.props.id,
          ...questionData
        })
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

  genId = () => Math.random();

  handleChangeQuestion = event => {
    this.setState({
      question: event.target.value
    });
  };

  render() {
    const { answers } = this.state;

    const nume = answers.length;
    return (
      <div>
        <Grid container direction="column" spacing={16}>
          <Grid item>
            <TextField
              label="Question"
              id="Question Field"
              value={this.state.question}
              onChange={this.handleChangeQuestion}
            />
          </Grid>
          {this.state.answers.map((answer, index) => (
            <Grid item key={this.key[index]}>
              <TextField label="Answer" onChange={this.onAnswerChange(index)} />
              {nume > 1 ? (
                <StyledIconButton onClick={this.onDeleteAnswer(index)}>
                  <DeleteIcon />
                </StyledIconButton>
              ) : (
                ''
              )}
            </Grid>
          ))}
          <Grid item>
            <Grid container direction="row" spacing={16}>
              <Grid item>
                <Button
                  variant="raised"
                  color="primary"
                  onClick={this.onAddAnswer}
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
                    <Grid item>Add Answer</Grid>
                  </Grid>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="raised"
                  value="Submit"
                  color="primary"
                  onClick={this.submitQuestion(this.props.id)}
                >
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={8}
                  >
                    <Grid item>
                      <StyledSendButton />
                    </Grid>
                    <Grid item>Submit</Grid>
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
        </Grid>
      </div>
    );
  }
}
CreateQuestionPoll.propTypes = {
  id: PropTypes.string.isRequired
};
export default CreateQuestionPoll;

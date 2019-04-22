import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import { LinearProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import Radio from 'material-ui/Radio';
import Grid from 'material-ui/Grid';
import { FormControlLabel } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import Grow from 'material-ui/transitions/Grow';
import UserProfile from '../UserProfile';
import Date from '../Date';
import { questionPoll, votes } from '../../api/endpoints';
import fetch from '../../services/fetch';
import ErrorMsg from '../ErrorMsg';
import { setQuestionPoll } from '../../actions/questionpoll';
import { updateVote } from '../../actions/vote';
import store from '../../store/';
import { ProgressWrapper } from './style';
import { setSuccess } from '../../actions/success';

class QuestionPoll extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
      error: ''
    };
  }
  componentWillMount() {
    this.loadQuestionPoll();
  }

  onSelected = option => () => {
    this.setState({ selectedOption: option });
  };

  onSubmit = () => () => {
    fetch.put(votes, { id: this.state.selectedOption._id }).then(response => {
      const voteData = response.data;
      this.props.dispatch(updateVote(voteData));
      if (this.state.selectedOption.name !== undefined) {
        store.dispatch(
          setSuccess(`Your vote is: ${this.state.selectedOption.name}`)
        );
        setTimeout(() => {
          Router.push(`/QuestionPollResults?id=${this.props.id}`);
        }, 1500);
      } else {
        this.setState({ error: 'Please select an answer!' });
      }
    });
  };
  loadQuestionPoll = () =>
    fetch
      .get(questionPoll, { params: { id: this.props.id } })
      .then(response => {
        const pollData = response.data;
        this.props.dispatch(setQuestionPoll(pollData));
      });

  render() {
    const { loading } = this.props;
    return (
      <Grid container direction="column" spacing={16}>
        {loading ? (
          <LinearProgress />
        ) : (
          <ProgressWrapper>
            <Grid item>
              <Typography gutterBottom variant="title">
                {this.props.qPoll.title}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={16}>
                <Grid item>
                  <UserProfile
                    toolTipTitle="Author"
                    name={this.props.qPoll.authorId.name}
                    image={this.props.qPoll.authorId.image}
                  />
                </Grid>
                <Grid item>
                  <Date type="startDate" date={this.props.qPoll.startDate} />
                </Grid>
                <Grid item>
                  <Date type="endDate" date={this.props.qPoll.endDate} />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              {this.props.qPoll.answers.map(option => (
                <FormControlLabel
                  value={option.name}
                  key={option.name}
                  control={<Radio />}
                  label={option.name}
                  checked={this.state.selectedOption.name === option.name}
                  onClick={this.onSelected(option)}
                />
              ))}
            </Grid>
            <Grid container direction="column" spacing={8}>
              <Grid item>
                <Button
                  onClick={this.onSubmit(this.props.qPoll.answers)}
                  variant="raised"
                  color="primary"
                >
                  Submit
                </Button>
              </Grid>
              <Grid item>
                {this.state.error ? (
                  <Grow in>
                    <ErrorMsg justify="flex-start">{this.state.error}</ErrorMsg>
                  </Grow>
                ) : null}
              </Grid>
            </Grid>
          </ProgressWrapper>
        )}
      </Grid>
    );
  }
}

QuestionPoll.propTypes = {
  qPoll: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  qPoll: state.QuestionPoll,
  loading: state.Loading[questionPoll]
});

export default connect(mapStateToProps)(QuestionPoll);

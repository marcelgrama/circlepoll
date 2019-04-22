import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LinearProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Tooltip from 'material-ui/Tooltip';
import {
  LinearProgressWidth,
  ChipWidth,
  TypographyStyle,
  ProgressWrapper
} from './style';
import { questionPollResults } from '../../api/endpoints';
import fetch from '../../services/fetch';
import { setQuestionPollResults } from '../../actions/questionpollresults';

class QuestionPollResults extends React.PureComponent {
  componentWillMount() {
    this.loadQuestionPollResults();
  }

  loadQuestionPollResults = () => {
    fetch
      .get(questionPollResults, { params: { id: this.props.id } })
      .then(response => {
        const pollData = response.data;
        this.props.dispatch(setQuestionPollResults(pollData));
      });
  };
  render() {
    const totalVotes = this.props.qPollResults.answers.reduce(
      (accu, answer) => accu + answer.votes,
      0
    );
    const { loading } = this.props;
    return (
      <div>
        <Grid container direction="column" spacing={16}>
          {loading ? (
            <LinearProgress />
          ) : (
            <ProgressWrapper>
              <Grid item>
                <Typography gutterBottom variant="headline">
                  {this.props.qPollResults.title}
                </Typography>
              </Grid>
              {this.props.qPollResults.answers.map(option => (
                <Grid container direction="column" spacing={16}>
                  <Grid item key={option.name}>
                    <Grid item>
                      <TypographyStyle variant="headline">
                        {option.name}
                      </TypographyStyle>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      spacing={8}
                      alignItems="center"
                    >
                      <Grid item>
                        <ChipWidth label={`${option.votes} votes`} />
                      </Grid>
                      <Grid item>
                        <Tooltip
                          title={`${(option.votes / totalVotes * 100).toFixed(
                            0
                          )} %`}
                        >
                          <LinearProgressWidth
                            variant="determinate"
                            value={option.votes / totalVotes * 100}
                          />
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </ProgressWrapper>
          )}
        </Grid>
      </div>
    );
  }
}
QuestionPollResults.propTypes = {
  qPollResults: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  qPollResults: state.QuestionPollResults,
  loading: state.Loading[questionPollResults]
});

export default connect(mapStateToProps)(QuestionPollResults);

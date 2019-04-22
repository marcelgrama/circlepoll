import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Router from 'next/router';
import { connect } from 'react-redux';
import { LinearProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import QuestionIcon from 'material-ui-icons/HelpOutline';
import EventIcon from 'material-ui-icons/Event';
import PeopleIcon from 'material-ui-icons/People';
import SearchComponent from '../../components/Search';
import PollCard from './PollCard';
import { pollAll, circlePermission } from '../../api/endpoints';
import fetch from '../../services/fetch';
import { setPolls } from '../../actions/polls';
import { setCirclePermission } from '../../actions/circlepermissions';
import PaginationController from '../Pagination';
import { ProgressWrapper } from './style';

class Polls extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      currentPage: 0,
      total: 0,
      query: ''
    };
  }

  componentWillMount() {
    this.getCirclePermission();
    this.loadPolls(this.state.currentPage, this.state.query);
  }

  onInviteClick = id => () => {
    Router.push({
      pathname: '/SendMail',
      query: { id }
    });
  };

  onButtonClick = (id, type) => () => {
    if (type === 'question') {
      Router.push({
        pathname: '/QuestionPoll',
        query: { id }
      });
    } else {
      Router.push({
        pathname: '/EventPoll',
        query: { id }
      });
    }
  };

  getCirclePermission = () => {
    fetch
      .get(circlePermission, { params: { id: this.props.id } })
      .then(response => {
        const circlePermissionData = response.data;
        this.props.dispatch(setCirclePermission(circlePermissionData));
      });
  };

  performSearch = query => {
    if (query !== undefined) {
      this.setState({ ...this.state, query });
      this.loadPolls(this.state.currentPage, query);
    }
  };
  handleChangePage = (event, currentPage) => {
    this.setState({ ...this.state, currentPage });
    this.loadPolls(currentPage, this.state.query);
  };

  loadPolls = (currentPage, query) => {
    fetch
      .get(pollAll, {
        params: { id: this.props.id, page: currentPage, query }
      })
      .then(response => {
        const pollsData = response.data.payload;
        this.props.dispatch(setPolls(pollsData));
        this.setState({ total: response.data.total });
      });
  };

  addEventButton = id => () => {
    Router.push({
      pathname: '/eventpollcreation',

      query: { id }
    });
  };
  addQuestionButton = id => () => {
    Router.push({
      pathname: '/CreateQuestionPoll',

      query: { id }
    });
  };
  render() {
    const { currentPage } = this.state;
    const { loading } = this.props;

    if (loading) {
      return (
        <ProgressWrapper>
          <LinearProgress />
        </ProgressWrapper>
      );
    }
    return (
      <Grid container spacing={24} direction="column">
        {this.props.polls.length ? (
          <Grid item>
            <SearchComponent onClick={this.performSearch} />
          </Grid>
        ) : (
          ''
        )}
        <Grid item>
          <Grid container spacing={16}>
            {this.props.polls.map(option => (
              <Grid item xs={12} sm={6} key={option._id}>
                <PollCard
                  question={option.title}
                  type={option.type}
                  callback={this.onButtonClick(option._id, option.type)}
                />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              {this.state.total > 10 ? (
                <PaginationController
                  totalItems={this.state.total}
                  rowsPerPage={10}
                  currentPage={currentPage}
                  onChangePage={this.handleChangePage}
                />
              ) : (
                ''
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {_.get(this.props.circlePermission[0], 'create') ? (
            <Grid container spacing={16}>
              <Grid item>
                <Button
                  variant="raised"
                  color="primary"
                  onClick={this.addQuestionButton(this.props.id)}
                >
                  <QuestionIcon /> &ensp;Add question
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="raised"
                  color="primary"
                  onClick={this.addEventButton(this.props.id)}
                >
                  <EventIcon /> &ensp;Add event
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="raised"
                  color="primary"
                  onClick={this.onInviteClick(this.props.id)}
                >
                  <PeopleIcon />
                  &ensp; Invite People
                </Button>
              </Grid>
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  polls: state.Polls,
  loading: state.Loading[pollAll],
  circlePermission: state.CirclePermissions
});

Polls.propTypes = {
  dispatch: PropTypes.func.isRequired,
  polls: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  circlePermission: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Polls);

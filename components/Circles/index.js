import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import { LinearProgress } from 'material-ui/Progress';
import CirclePollCard from './CircleCard';
import { circle } from '../../api/endpoints';
import fetch from '../../services/fetch';
import { setCircles } from '../../actions/circles';

class Circles extends React.PureComponent {
  componentWillMount() {
    this.loadCircles();
  }

  onButtonClick = id => () => {
    Router.push({
      pathname: '/polls',
      query: { id }
    });
  };

  loadCircles = () =>
    fetch.get(circle).then(response => {
      const userData = response.data;
      this.props.dispatch(setCircles(userData));
    });

  render() {
    const dataCircles = this.props.circles;
    const loading = _.isEmpty(dataCircles);
    if (loading) {
      return <LinearProgress />;
    }
    return (
      <div>
        <Grid container spacing={24}>
          {this.props.circles.map(option => (
            <Grid item xs={12} sm={4} key={_.get(option.circle[0], '_id')}>
              <CirclePollCard
                title={_.get(option.circle[0], 'name')}
                desc={_.get(option.circle[0], 'description')}
                usersCount={_.get(option.circle[0], 'usersCount')}
                callback={this.onButtonClick(_.get(option.circle[0], '_id'))}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  circles: state.Circles
});

Circles.propTypes = {
  usersCount: PropTypes.number.isRequired,
  circles: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Circles);

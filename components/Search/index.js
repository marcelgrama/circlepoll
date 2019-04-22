import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from 'material-ui-icons/Search';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

class SearchComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  onSearchChange = e => {
    this.setState({ query: e.target.value });
  };
  handleClick = () => {
    this.props.onClick(this.state.query);
  };

  render() {
    return (
      <Grid container direction="row" spacing={16} alignItems="flex-end">
        <Grid item>
          <TextField label="Search" onChange={this.onSearchChange} />
        </Grid>
        <Grid item>
          <Button variant="raised" color="default" onClick={this.handleClick}>
            <SearchIcon />
            &ensp; Search
          </Button>
        </Grid>
      </Grid>
    );
  }
}

SearchComponent.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default SearchComponent;

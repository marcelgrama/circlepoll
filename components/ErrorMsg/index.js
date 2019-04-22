import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { StyledErrorIcon, GridErrorText } from './style';

const ErrorMsg = ({ children, justify }) => (
  <Grid
    container
    alignItems="center"
    justify={justify}
    wrap="nowrap"
    spacing={8}
  >
    <Grid item>
      <StyledErrorIcon color="error" />
    </Grid>
    <GridErrorText item>
      <Typography variant="caption">{children}</Typography>
    </GridErrorText>
  </Grid>
);

ErrorMsg.propTypes = {
  children: PropTypes.node.isRequired,
  justify: PropTypes.string
};

ErrorMsg.defaultProps = {
  justify: 'flex-start'
};

export default ErrorMsg;

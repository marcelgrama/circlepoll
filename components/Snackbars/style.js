import styled from 'styled-components';
import Snackbar from 'material-ui/Snackbar';
import theme from '../Page/theme';

export const StyledSnackBar = styled(Snackbar)`
  > .error-snackbar-content {
    background-color: ${props =>
      props.type === 'success'
        ? theme.palette.primary.green
        : theme.palette.secondary.main};
    padding-right: 15px;
  }
`;

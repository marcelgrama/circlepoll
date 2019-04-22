import styled from 'styled-components';
import Toolbar from 'material-ui/Toolbar';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import theme from '../Page/theme';

export const StyledToolbar = styled(Toolbar)`
  && {
    display: flex;
    min-height: 64px;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${theme.palette.primary.main};
  }
`;

export const IconGrid = styled(Grid)`
  > svg {
    display: block;
  }
`;

export const StyledButtonIcon = styled(IconButton)`
  && {
    margin-left: 300px;
  }
`;

import styled from 'styled-components';
import { IconButton } from 'material-ui';
import AddCircle from 'material-ui-icons/AddCircle';
import Send from 'material-ui-icons/Send';
import theme from '../Page/theme';

export const StyledIconButton = styled(IconButton)`
  &:hover {
    color: ${theme.palette.error.main} !important;
  }
`;

export const StyledAddButton = styled(AddCircle)`
  display: block !important;
`;
export const StyledSendButton = styled(Send)`
  display: block !important;
`;

import Avatar from 'material-ui/Avatar';
import styled from 'styled-components';
import theme from '../Page/theme';

export const StyledAvatar = styled(Avatar).attrs({
  size: props => (props.variant === 'default' ? '40px' : '32px')
})`
  && {
    width: ${props => props.size};
    height: ${props => props.size};
    font-size: ${props => (props.variant === 'default' ? 'inherit' : '13px')};
    font-weight: 500;
    color: white;
    background-color: ${props =>
      props.variant === 'default'
        ? theme.palette.secondary.main
        : theme.palette.primary.main};
  }
`;

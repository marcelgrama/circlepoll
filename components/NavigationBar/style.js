import List, { ListItem } from 'material-ui/List';
import styled from 'styled-components';
import Grid from 'material-ui/Grid';
import theme from '../Page/theme';

export const GridSvgIcon = styled(Grid)`
  > svg {
    display: block;
  }
  && {
    margin-left: 10px;
  }
`;

export const StyledGridItemList = styled(Grid)`
  && {
    margin-left: ${props => (props.viewport === 'mobile' ? '40px' : '10px')};
  }
`;

export const GridCloseIcon = styled(Grid)`
  && {
    color: ${theme.palette.common.white};
    flex-grow: 1;
    text-align: right;
  }
`;

export const StyledDivListContainer = styled.div`
  && {
    color: ${theme.palette.common.white};
    margin-top: 6%;
  }
`;

export const StyledDivNavigationBar = styled.div`
  && {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
    width: ${props => (props.viewport === 'mobile' ? '100%' : '300px')};
  }
`;

export const StyledList = styled(List)`
  && {
    background-color: ${theme.palette.primary.main};
    height: 100vh;
    padding: 0;
    margin: 0;
    border-right: 2px solid ${theme.palette.common.white};
  }
`;

export const MainContainer = styled.div`
  && {
    padding: 16px;
    margin-top: 64px;
    margin-left: ${props => (props.childport ? '300px' : '0px')};
  }
`;

export const ListItemHeader = styled(ListItem)`
  p {
    color: ${theme.palette.common.white};
    margin-left: ${props => (props.viewport === 'mobile' ? '30px' : '5px')};
  }
  && {
    border-bottom: 2px solid ${theme.palette.common.white};
  }
`;

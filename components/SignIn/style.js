import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';

export const OutterGrid = styled(Grid)`
  height: 100vh;
`;

export const InnerGrid = styled(Grid)`
  padding: 20px;
`;

export const ProgressWrapper = styled.div`
  height: 5px;
`;

export const StyledPaper = styled(Paper)`
  width: 280px;
`;

export const StyledLink = styled.a`
  text-align: center;
  display: block;
  cursor: pointer;
`;

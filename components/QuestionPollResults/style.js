import styled from 'styled-components';
import Chip from 'material-ui/Chip';
import { LinearProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

export const LinearProgressWidth = styled(LinearProgress)`
  width: 200px;
  height: 24px !important;
  border-radius: 25px;
`;

export const ChipWidth = styled(Chip)`
  min-width: 90px;
`;

export const TypographyStyle = styled(Typography)`
  font-size: 20px !important;
  opacity: 0.7;
`;

export const ProgressWrapper = styled.div`
  padding: 16px;
  height: 5px;
`;

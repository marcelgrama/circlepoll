import styled, { keyframes } from 'styled-components';

const rotate1080 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1080deg);
  }
`;

export const Loader = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: #fff;
`;

export const Svg = styled.svg`
  animation: ${rotate1080} 1s infinite cubic-bezier(0.5, 0.25, 0.5, 0.75);
`;

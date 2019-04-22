import theme from '../components/Page/theme';

const width = typeof window !== 'undefined' ? window.innerWidth : 0;

export const isUp = key => theme.breakpoints.values[key] <= width;
export const isDown = key => theme.breakpoints.values[key] > width;

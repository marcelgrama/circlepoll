import PropTypes from 'prop-types';

const Logo = ({ size = 200 }) => (
  <img alt="CirclePoll Logo" width={`${size}px`} src="/static/imgs/logo.svg" />
);

Logo.propTypes = {
  size: PropTypes.number
};

Logo.defaultProps = {
  size: 200
};

export default Logo;

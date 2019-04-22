import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from 'material-ui/styles';
import { PropTypes } from 'prop-types';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());

if (typeof document === 'object') {
  jss.options.insertionPoint = document.getElementById('jss-insertion-point');
}

const JssLoader = props => (
  <JssProvider jss={jss} generateClassName={generateClassName}>
    {props.children}
  </JssProvider>
);

JssLoader.propTypes = {
  children: PropTypes.node.isRequired
};

export default JssLoader;

import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import UserProfile from '../UserProfile';

class ParticipationPanel extends React.PureComponent {
  render() {
    return (
      <ExpansionPanel expanded={!this.props.mobile || undefined}>
        <ExpansionPanelSummary
          expandIcon={this.props.mobile ? <ExpandMoreIcon /> : undefined}
        >
          <Typography variant="title">{this.props.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {this.props.users.map(option => (
            <UserProfile
              name={option.userId.name}
              image={option.userId.image}
              key={option.userId._id}
            />
          ))}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
ParticipationPanel.propTypes = {
  title: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  mobile: PropTypes.bool.isRequired
};

export default ParticipationPanel;

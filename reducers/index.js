import { combineReducers } from 'redux';
import User from './user';
import Error from './error';
import Success from './success';
import Loading from './loading';
import Circles from './circles';
import EventPoll from './eventPoll';
import EventPollResults from './eventPollResults';
import QuestionPoll from './questionpoll';
import QuestionPollResults from './questionpollresults';
import Polls from './polls';
import UpdateVote from './vote';
import CirclePermissions from './circlepermissions';
import InvitationCircle from './circleinvitation';

export default combineReducers({
  User,
  Error,
  Success,
  Loading,
  Circles,
  EventPoll,
  EventPollResults,
  QuestionPoll,
  QuestionPollResults,
  Polls,
  UpdateVote,
  CirclePermissions,
  InvitationCircle
});

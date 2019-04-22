const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const ParticipationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  pollId: { type: Schema.Types.ObjectId, ref: 'Poll' },
  status: { type: String, enum: ['participate', 'maybe', 'noParticipate'] }
});

ParticipationSchema.statics.getEventByPollId = function getEventByPollId(
  pollId
) {
  return this.find({ pollId })
    .populate('userId pollId')
    .exec();
};

export default mongoose.model('Participation', ParticipationSchema);

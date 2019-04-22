const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const AnswerSchema = new Schema({
  name: String,
  pollId: { type: Schema.Types.ObjectId, ref: 'Poll' },
  votes: { type: Number, default: 0 }
});

AnswerSchema.statics.getByPollId = function getByPollId(id) {
  return this.find({ pollId: id }).exec();
};

export default mongoose.model('Answer', AnswerSchema);

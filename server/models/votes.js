const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const VoteSchema = new Schema({
  userId: Schema.Types.ObjectId,
  pollId: Schema.Types.ObjectId,
  answerId: Schema.Types.ObjectId
});

export default mongoose.model('Vote', VoteSchema);

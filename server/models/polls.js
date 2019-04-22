const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const PollSchema = new Schema({
  desc: String,
  title: String,
  type: { type: String, enum: ['event', 'question'] },
  hasMaybe: Boolean,
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  authorId: { type: Schema.Types.ObjectId, ref: 'User' },
  circleId: Schema.Types.ObjectId
});

PollSchema.statics.getPollWithAuthor = function getPollWithAuthor(id) {
  return this.findOne({ _id: id })
    .populate('authorId')
    .exec();
};

PollSchema.index({ circleId: 1 });

PollSchema.statics.countByCircleId = function countByCircleId(circleId, query) {
  return this.find({
    circleId,
    title: { $regex: query, $options: 'i' }
  })
    .count(circleId)
    .exec();
};

PollSchema.statics.searchByCircleId = function searchByCircleId(
  circleId,
  query,
  page
) {
  return this.find({ circleId, title: { $regex: query, $options: 'i' } })
    .sort({ startDate: -1 })
    .skip(parseInt(page, 10) * 10)
    .limit(10)
    .populate('circleId')
    .exec();
};

export default mongoose.model('Poll', PollSchema);

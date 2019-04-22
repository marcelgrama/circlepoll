const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const CircleSchema = new Schema({
  name: String,
  description: String,
  authorId: Schema.Types.ObjectId,
  usersCount: { type: Number, default: 1 }
});

CircleSchema.index({ authorId: 1 });

CircleSchema.statics.searchByAuthorId = function searchByAuthorId(authorId) {
  return this.find({ authorId })
    .lean()
    .exec();
};

export default mongoose.model('Circle', CircleSchema);

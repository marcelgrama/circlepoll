const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { ObjectId } = mongoose.Types;

const { Schema } = mongoose;

const CirclePermisionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  circleId: { type: Schema.Types.ObjectId, ref: 'Circle' },
  view: Boolean,
  create: Boolean
});

CirclePermisionSchema.statics.searchByCircleId = function searchByCircleId(
  circleId,
  userId
) {
  return this.find({ circleId, userId }).exec();
};

CirclePermisionSchema.statics.getUserCircles = function getUserCircles(userId) {
  return this.aggregate([
    {
      $match: {
        userId: ObjectId(userId)
      }
    },
    {
      $group: {
        _id: '$circleId'
      }
    },
    {
      $lookup: {
        from: 'circles',
        localField: '_id',
        foreignField: '_id',
        as: 'circle'
      }
    }
  ]).exec();
};
export default mongoose.model('CirclePermision', CirclePermisionSchema);

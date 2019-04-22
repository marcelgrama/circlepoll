const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      first: String,
      last: String
    },
    image: String,
    employeePosition: String,
    department: String,
    skypeAddress: String,
    telephone: String,
    locationId: Number,
    locationName: String,
    subsidiaryName: String,
    subsidiaryId: Number,
    employeeID: Number,
    email: String,
    departmentID: Number
  },
  { emitIndexErrors: true }
);

userSchema.index({ employeeID: 1 });

userSchema.statics.upsertByEmployeeID = function upsertByEmployeeID(
  employeeID,
  payload
) {
  return this.findOneAndUpdate({ employeeID }, payload, {
    upsert: true,
    new: true
  })
    .lean()
    .exec();
};

export default mongoose.model('User', userSchema);

export default schema => {
  schema.static('getById', function get(id) {
    return this.findOne({ _id: id }).exec();
  });

  schema.static('updateById', function update(id, payload) {
    return this.update({ _id: id }, payload).exec();
  });

  schema.static('upsertById', function update(id, payload) {
    return this.update({ _id: id }, payload, { upsert: true }).exec();
  });

  schema.static('removeById', function update(id) {
    return this.remove({ _id: id }).exec();
  });
};

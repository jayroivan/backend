module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      username: String,
      names: String,
      direction: String,
      email: String,
      password: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Admin = mongoose.model("Admins", schema);
  return Admin;
};
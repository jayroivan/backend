module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      numero: String,
      user: {type: String, ref:"Users"}
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Cuenta = mongoose.model("Cuentas", schema);
  return Cuenta;
};
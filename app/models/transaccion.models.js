module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      tipo: String,
      estado: String,
      correo: String,
      monto: String,
      emisor: String,
      receptor: String,
      cuenta: {type:String, ref:"Cuentas"}
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Transaccion = mongoose.model("Transacciones", schema);
  return Transaccion;
};
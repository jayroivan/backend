module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        tipo: String,
        estado: String,
        correo: String,
        monto: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const DetaTransaccion = mongoose.model("DetaTransacciones", schema);
    return DetaTransaccion;
  };
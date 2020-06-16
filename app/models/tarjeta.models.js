module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        nombre: String,
        numero: String, 
        mes: String,
        year: String,
        codigo: String,
        cuenta: {type:String, ref:"Cuentas"}
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Tarjeta = mongoose.model("Tarjetas", schema);
    return Tarjeta;
  };
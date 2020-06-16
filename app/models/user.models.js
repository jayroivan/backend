module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nombre: String,
      apellido: String,
      direccion: String,
      correo: String,
      contra: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Usuario = mongoose.model("Users", schema);
  return Usuario;
};
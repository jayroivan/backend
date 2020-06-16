const db = require("../models");
const Tarjeta = db.tarjetas;
const Cuenta = db.cuentas;
const bcrypt = require('bcrypt');

exports.create = (req, res) => {
  const id = req.params.id
  Cuenta.findOne({user: id}).then(data => {
    const tarjeta = new Tarjeta({
      nombre: req.body.nombre,
      numero: req.body.numero,
      mes: req.body.mes,
      year: req.body.year,
      codigo: req.body.codigo,
      cuenta: data.id
    });

    tarjeta
    .save(tarjeta)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al crear Usuario."
      });
    });
  })

  
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Tarjeta.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Usuario con id: ${id} no encontrado` });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error obteniendo usuario con id: " + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data no puede estar vacia!"
    });
  }

  const id = req.params.id;

  Tarjeta.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se puede actualizar usuario con id: ${id}. Talvez no exista el Usuario!`
        });
      } else res.send({ message: "Usuario actualizado Correctamente." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error actualizando usuario con id: " + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Tarjeta.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se puede eliminar Usuario con id: ${id}. Usuario no encontrado!`
        });
      } else {
        res.send({
          message: "Usuario Eliminado Correctamente!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se puede eleminar Usuario=" + id
      });
    });
};



const db = require("../models");
const Transaccion = db.transacciones;
const DetaTransaccion = db.detalletransacciones;
const Cuenta = db.cuentas;
const bcrypt = require('bcrypt');

exports.create = (req, res) => {
  const id = req.params.id
  Cuenta.findOne({user: id}).then(data => {
    const detatransaciones = new DetaTransaccion({
      tipo: req.body.tipo,
      estado: req.body.estado,
      correo: req.body.correo,
      monto: req.body.monto
    });
    
    detatransaciones.save(detatransaciones);

    const transaccion = new Transaccion({
      detatransaccion: detatransaciones.id,
      cuenta: data.id
    });

    transaccion.save(transaccion).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al realizar transaccion."
      });
    });
  })

  
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Transaccion.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Transaccion con id: ${id} no encontrado` });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error obteniendo Transaccion con id: " + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data no puede estar vacia!"
    });
  }

  const id = req.params.id;

  DetaTransaccion.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

  DetaTransaccion.findByIdAndRemove(id, { useFindAndModify: false })
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



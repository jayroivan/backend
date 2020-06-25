const db = require("../models");
const Usuario = db.users;
const Cuenta = db.cuentas;
const Admin = db.admins;
const bcrypt = require('bcrypt');
const { transacciones } = require("../models");

var account = 1234;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Llene los campos!" });
    return;
  }

  const usuario = new Usuario({
    nombre: req.body.name,
    apellido: req.body.last_name,
    direccion: req.body.direction,
    correo: req.body.email,
    contra: bcrypt.hashSync(req.body.password, 10),
  });

  const cuenta = new Cuenta({
    numero: account,
    user: usuario.id,
  });

    account +=  1;
  
    cuenta
    .save(cuenta)
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al crear cuenta."
      });
    });

  usuario
    .save(usuario)
    .then(data => {
      Cuenta.findOne({user: data.id}).then(data2 => {
        res.status(200).send({
          account: data2.numero,
          account_id : data2.id
        });
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al crear Usuario."
      });
    });
};

exports.createadmin = (req, res) => {
    const admin = new Admin({
      username: req.body.username,
      names: req.body.names,
      direction: req.body.direction,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    });

    admin.save(admin).then(data => {
      res.send(data);
    })
    .catch(err => {res.status(500).send({
        message:
          err.message || "Error al crear Admin."
      });
    });  
};

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};

  Usuario.find(condition)
    .then(data => {
      Cuenta.find().then(data2 => {
        transacciones.find().then(data3 => {
          res.send({Users: data, Cuentas: data2, Transacciones: data3});
        })
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error al obtener todos los Usuarios."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Usuario.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Usuario con id: ${id} no encontrado` });
      else 
        var data2 = new Object();
        data2.name = data.nombre;
        data2.last_name = data.apellido;
        data2.direction = data.direccion;
        data2.email = data.correo;
        data2.password = data.contra;
        res.json(data2);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error obteniendo usuario con id: " + id });
    });
};

exports.find_one = (req, res) => {

  Usuario.findOne( {correo: req.query.correo})
    .then(data => {
      if (!data){
        res.status(404).send({ message: 'Correo Invalido' });
        console.log(data);}
      else 
        res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error obteniendo Usuario" });
    });
};

exports.cuenta = (req, res) => {

  Cuenta.findOne( {user: req.query.user})
    .then(data => {
      if (!data){
        res.status(404).send({ message: 'User Invalido' });
        console.log(data);}
      else 
        //res.send(data);
        res.status(200).send({
          id: data.id,
          numero: data.numero,
          user: data.user
        });
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error obteniendo Cuenta" });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data no puede estar vacia!"
    });
  }

  const id = req.params.id;

  Usuario.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

  Usuario.findByIdAndRemove(id, { useFindAndModify: false })
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

exports.deleteAll = (req, res) => {
  Usuario.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Usuarios Eliminados!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ecurrio algun error al eliminar todos los Usuarios."
      });
    });
};


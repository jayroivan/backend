const config = require("../config/auth.config");
const db = require("../models");
const User = db.users;
const Cuenta = db.cuentas;
const Admin = db.admins;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signin = (req, res) => {
  User.findOne({
    nombre: req.body.username
  })
  .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.contra
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 
      });
      Cuenta.findOne({user: user.id}).then(data => {
        res.status(200).send({
          id: user.id,
          last: user.apellido,
          username: user.nombre,
          email: user.correo,
          direction: user.direccion,
          account: data.numero,
          account_id : data.id,
          accessToken: token
        });
      });
  });
};

exports.signinadmin = (req, res) => {
  Admin.findOne({
    username: req.body.username
  })
  .exec((err, admin) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!admin) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        admin.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
        var token = jwt.sign({ id: admin.id }, config.secret, {
          expiresIn: 86400 
      });
      res.status(200).send({
        id: admin.id,
        names: admin.names,
        username: admin.username,
        email: admin.email,
        direction: admin.direction,
        accessToken: token
      });
  });
};
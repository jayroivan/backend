const config = require("../config/auth.config");
const db = require("../models");
const User = db.users;

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
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user.id,
        last: user.apellido,
        username: user.nombre,
        email: user.correo,
        direction: user.direccion,
        accessToken: token
      });
    });
};
const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.models.js")(mongoose);
db.cuentas = require("./cuenta.models.js")(mongoose);
db.tarjetas = require("./tarjeta.models.js")(mongoose);
db.transacciones = require("./transaccion.models.js")(mongoose);
db.detalletransacciones = require("./detalletransaccion.models.js")(mongoose);


module.exports = db;
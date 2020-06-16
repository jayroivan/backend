module.exports = app => {
    const usuarios = require("../controllers/tarjeta.controller.js");
  
    var router = require("express").Router();
  
    router.post("/create/:id", usuarios.create);

    router.get("/one/:id", usuarios.findOne);

    router.put("/update/:id", usuarios.update);

    router.delete("/delete/:id", usuarios.delete);
  
    app.use("/tarjeta", router);
  };
module.exports = app => {
    const transaccion = require("../controllers/transaccion.controller.js");
  
    var router = require("express").Router();
  
    router.post("/create/:id", transaccion.create);

    router.get("/one/:id", transaccion.findOne);

    router.put("/update/:id", transaccion.update);

    router.delete("/delete/:id", transaccion.delete);
  
    app.use("/trans", router);
  };
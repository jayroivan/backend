module.exports = app => {
    const usuarios = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    router.post("/create/", usuarios.create);

    router.get("/all/", usuarios.findAll);

    router.get("/one/:id", usuarios.findOne);

    router.put("/update/:id", usuarios.update);

    router.delete("/delete/:id", usuarios.delete);

    router.delete("/delete/", usuarios.deleteAll);
  
    app.use("/user", router);
  };
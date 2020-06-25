module.exports = app => {
    const usuarios = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    router.post("/create/", usuarios.create);

    router.post("/create/admin", usuarios.createadmin);

    router.get("/all/", usuarios.findAll);

    router.get("/one/:id", usuarios.findOne);

    router.get("/one/", usuarios.find_one);

    router.get("/cuenta/", usuarios.cuenta);

    router.put("/update/:id", usuarios.update);

    router.delete("/delete/:id", usuarios.delete);

    router.delete("/delete/", usuarios.deleteAll);
  
    app.use("/user", router);
  };
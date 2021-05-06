module.exports = app => {
    const pacientes = require("../controllers/paciente.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", pacientes.create);
    router.get("/", pacientes.findAll);
    router.get("/exame", pacientes.findAllPublished);
    router.get("/:id", pacientes.findOne);
    router.put("/:id", pacientes.update);
    router.delete("/:id", pacientes.delete);
    router.delete("/", pacientes.deleteAll);
  
    app.use('/api/pacientes', router);
  };

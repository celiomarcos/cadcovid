const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Bem vindo ao Cadastro Pacientes Covid19 - Backend." });
});

require("./app/routes/paciente.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}.`);
});

const db = require("./app/models");

//db.sequelize.sync();
// estando no amvbiente dev eh melhor usar
db.sequelize.sync({ force: true }).then(() => {
    console.log("Db dropou no sync");
});

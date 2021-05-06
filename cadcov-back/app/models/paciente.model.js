module.exports = (sequelize, Sequelize) => {
    const Paciente = sequelize.define("paciente", {
      cpf: {
        type: Sequelize.STRING
      },
      nome: {
        type: Sequelize.STRING
      },
      idade: {
        type: Sequelize.STRING
      },
      exame: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Paciente;
  };

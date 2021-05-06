const db = require("../models");
const Paciente = db.pacientes;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.cpf) {
      res.status(400).send({
        message: "Conteudo nao pode ser vazio!"
      });
      return;
    }

    const paciente = {
      cpf: req.body.cpf,
      nome: req.body.nome,
      idade: req.body.idade,
      exame: req.body.exame ? req.body.exame : false
    };
  
    Paciente.create(paciente)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro ocorreu ao criar Paciente."
        });
      });
  };

exports.findAll = (req, res) => {
    const cpf = req.query.cpf;
    var condition = cpf ? { cpf: { [Op.like]: `%${cpf}%` } } : null;
  
    Paciente.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro ocorreu ao buscar pacientes."
        });
      });
  };

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Paciente.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro ao receber Paciente com id=" + id
        });
      });
  };

exports.update = (req, res) => {
    const id = req.params.id;
  
    Paciente.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Pacient foi atualizado com sucesso."
          });
        } else {
          res.send({
            message: `Nao pode atualizar Paciente com id=${id}. Talvez Paciente nao tenha sido encontrado ou req.body veio vazio!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erro atualizando Paciente com id=" + id
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Paciente.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Paciente foi apagado com sucesso!"
          });
        } else {
          res.send({
            message: `Nao pode deletar Paciente com id=${id}. Talvez Paciente nao tenha sido encontrado!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Nao pode deletar Paciente com id=" + id
        });
      });
  };

exports.deleteAll = (req, res) => {
    Paciente.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Pacientes foram removidos com sucesso!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro enquanto removia todos pacientes."
        });
      });
  };

exports.findAllPublished = (req, res) => {
    Paciente.findAll({ where: { exame: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erro ocorreu ao pesquisar pacientes."
        });
      });
  };

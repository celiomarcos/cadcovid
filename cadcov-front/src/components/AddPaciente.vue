<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="cpf">CPF</label>
        <input
          type="text"
          class="form-control"
          id="cpf"
          required
          v-model="paciente.cpf"
          name="cpf"
        />
      </div>

      <div class="form-group">
        <label for="nome">Nome</label>
        <input
          class="form-control"
          id="nome"
          required
          v-model="paciente.nome"
          name="nome"
        />
      </div>

      <div class="form-group">
        <label for="idade">Idade</label>
        <input
          class="form-control"
          id="idade"
          required
          v-model="paciente.idade"
          name="idade"
        />
      </div>

      <button @click="enviarPaciente" class="btn btn-success">Enviar</button>
    </div>

    <div v-else>
      <h4>Armazenado com sucesso!</h4>
      <button class="btn btn-success" @click="novoPaciente">Cadastrar outro</button>
    </div>
  </div>
</template>

<script>
import PacienteDataService from "../services/PacienteDataService";

export default {
  name: "add-paciente",
  data() {
    return {
      paciente: {
        id: null,
        cpf: "",
        nome: "",
        idade: "",
        exame: false
      },
      submitted: false
    };
  },
  methods: {
    enviarPaciente() {
      var data = {
        cpf: this.paciente.cpf,
        nome: this.paciente.nome,
        idade: this.paciente.idade,
      };

      PacienteDataService.create(data)
        .then(response => {
          this.paciente.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    novoPaciente() {
      this.submitted = false;
      this.paciente = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
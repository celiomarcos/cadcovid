<template>
  <div v-if="currentPaciente" class="edit-form">
    <h4>Paciente</h4>
    <form>
      <div class="form-group">
        <label for="cpf">CPF</label>
        <input type="text" class="form-control" id="cpf"
          v-model="currentPaciente.cpf"
        />
      </div>
      <div class="form-group">
        <label for="nome">Nome</label>
        <input type="text" class="form-control" id="nome"
          v-model="currentPaciente.nome"
        />
      </div>
      <div class="form-group">
        <label for="idade">Idade</label>
        <input type="text" class="form-control" id="idade"
          v-model="currentPaciente.idade"
        />
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentPaciente.exame ? "Positivo" : "Negativo"}}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentPaciente.exame"
      @click="updatePublished(false)"
    >
      RemoverResultado
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Resultado
    </button>

    <button class="badge badge-danger mr-2"
      @click="deletePaciente"
    >
      Remover
    </button>

    <button type="submit" class="badge badge-success"
      @click="updatePaciente"
    >
      Atualizar
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Por favor clique em um Paciente...</p>
  </div>
</template>

<script>
import PacienteDataService from "../services/PacienteDataService";

export default {
  name: "paciente",
  data() {
    return {
      currentPaciente: null,
      message: ''
    };
  },
  methods: {
    getPaciente(id) {
      PacienteDataService.get(id)
        .then(response => {
          this.currentPaciente = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentPaciente.id,
        cpf: this.currentPaciente.cpf,
        nome: this.currentPaciente.nome,
        idade: this.currentPaciente.idade,
        exame: status
      };

      PacienteDataService.update(this.currentPaciente.id, data)
        .then(response => {
          this.currentPaciente.exame = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePaciente() {
      PacienteDataService.update(this.currentPaciente.id, this.currentPaciente)
        .then(response => {
          console.log(response.data);
          this.message = 'O paciente foi atualizado com sucesso!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deletePaciente() {
      PacienteDataService.delete(this.currentPaciente.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "pacientes" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getPaciente(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
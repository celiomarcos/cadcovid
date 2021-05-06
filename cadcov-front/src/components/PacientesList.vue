<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Buscar por CPF"
          v-model="cpf"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchCpf"
          >
            Procurar
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Lista de Pacientes</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(paciente, index) in pacientes"
          :key="index"
          @click="setActivePaciente(paciente, index)"
        >
          {{ paciente.cpf }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllPacientes">
        Descadastrar Todos
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentPaciente">
        <h4>Paciente</h4>
        <div>
          <label><strong>CPF:</strong></label> {{ currentPaciente.cpf }}
        </div>
        <div>
          <label><strong>Nome:</strong></label> {{ currentPaciente.nome }}
        </div>
        <div>
          <label><strong>Idade:</strong></label> {{ currentPaciente.idade }}
        </div>
        <div>
          <label><strong>Exame:</strong></label> {{ currentPaciente.exame ? "Positivo" : "Negativo" }}
        </div>

        <a class="badge badge-warning"
          :href="'/pacientes/' + currentPaciente.id"
        >
          Alterar
        </a>
      </div>
      <div v-else>
        <br />
        <p>Selecione um Paciente'...</p>
      </div>
    </div>
  </div>
</template>

<script>
import PacienteDataService from "../services/PacienteDataService";

export default {
  name: "pacientes-list",
  data() {
    return {
      pacientes: [],
      currentPaciente: null,
      currentIndex: -1,
      cpf: ""
    };
  },
  methods: {
    retrievePacientes() {
      PacienteDataService.getAll()
        .then(response => {
          this.pacientes = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrievePacientes();
      this.currentPaciente = null;
      this.currentIndex = -1;
    },

    setActivePaciente(paciente, index) {
      this.currentPaciente = paciente;
      this.currentIndex = index;
    },

    removeAllPacientes() {
      PacienteDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchCpf() {
      PacienteDataService.findByCpf(this.cpf)
        .then(response => {
          this.pacientes = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrievePacientes();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
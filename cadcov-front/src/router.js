import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/pacientes",
      name: "pacientes",
      component: () => import("./components/PacientesList")
    },
    {
      path: "/pacientes/:id",
      name: "paciente-details",
      component: () => import("./components/Paciente")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddPaciente")
    }
  ]
});

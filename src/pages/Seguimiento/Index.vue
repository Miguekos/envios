<template>
  <div class="transparent">
    <!--    <div v-if="rolLocal == 1">-->
    <!--      <SeguiAdmin />-->
    <!--    </div>-->
    <div class="transparent" v-if="rolLocal == 2">
      <SeguiUser class="transparent"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { MixinDefault, storagelocal } from "../../mixins/mixin.js";
export default {
  name: "IndexSeguimiento",
  mixins: [storagelocal],
  computed: {
    // ...mapGetters("registros", ["RegistrosForUser"]),
    // ...mapGetters("users", ["getUsers"])
  },
  components: {
    // DialogDetalle: () => import("../../components/detallePaquete"),
    SeguiUser: () => import("./SeguiUser")
    // SeguiAdmin: () => import("./SeguiAdmin")
  },
  data: () => {
    return {
      detalleData: "",
      modelgetUsers: null,
      model: null,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      tab: "asignados",
      dateIni: "",
      dateFin: ""
    };
  },
  methods: {
    // ...mapActions("registros", ["callRegistrosForUser"]),
    // ...mapActions("users", ["callUser"])
    // cargarUsuario() {
    //   console.log("asd");
    //   this.callRegistrosForUser({
    //     dni: this.modelgetUsers,
    //     estado: "1"
    //   });
    // },
    // obtenerRegistros(arg) {
    //   this.callRegistrosForUser({
    //     dni: this.modelgetUsers,
    //     estado: arg
    //   });
    // }
  },
  created() {
    // this.obtenerRegistros(1);
    // this.callUser();
  }
};
</script>
<style>
#q-app > div > div > div.q-page-container > div > div {
  background-color: transparent;
}
#q-app
  > div
  > div
  > div.q-page-container
  > div
  > div
  > div.q-tab-panels.q-panel-parent {
  background-color: transparent;
}
</style>

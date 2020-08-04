<template>
  <div>
    <q-card flat>
      <q-tabs v-model="tab" class="bg-primary-5 text-white" align="justify">
        <q-tab
          class="bg-red-10"
          @click="fullName(0)"
          name="sinasingnar"
          label="Sin Asignar"
        />
        <q-tab
          class="bg-amber-10"
          @click="fullName(1)"
          name="asignados"
          label="Asignados"
        />
        <q-tab
          class="bg-green-10"
          @click="fullName(2)"
          name="entregados"
          label="Entregados"
        />
        <q-tab
          class="bg-primary-10"
          @click="fullName(3)"
          name="devuelto"
          label="Devuelto"
        />
      </q-tabs>

      <q-item-section class="q-pa-xs customtabs">
        <q-select
          @input="cargarUsuario()"
          emit-value
          dense
          standout="bg-primary-5 text-white"
          v-model="modelgetUsers"
          :options="getUsers"
          map-options
          option-label="name"
          option-value="dni"
          label="Usuario"
        />
      </q-item-section>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="sinasingnar">
          <TablaDetalle :info="RegistrosForUser" />
        </q-tab-panel>

        <q-tab-panel name="asignados">
          <TablaDetalle :info="RegistrosForUser" />
        </q-tab-panel>

        <q-tab-panel name="entregados">
          <TablaDetalle :info="RegistrosForUser" />
        </q-tab-panel>

        <q-tab-panel name="devuelto">
          <TablaDetalle :info="RegistrosForUser" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { MixinDefault, storagelocal } from "../../mixins/mixin.js";
export default {
  name: "SeguiAdmin",
  mixins: [MixinDefault, storagelocal],
  computed: {
    ...mapGetters("registros", ["RegistrosForUser"]),
    ...mapGetters("users", ["getUsers"])
  },
  components: {
    TablaDetalle: () => import("./TablaDetalle.vue")
  },
  data() {
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
    ...mapActions("registros", ["callRegistrosForUser"]),
    ...mapActions("users", ["callUser"]),
    cargarUsuario() {
      console.log("asd");
      this.callRegistrosForUser({
        dni: this.modelgetUsers,
        estado: "1",
        ini_date: new Date().toISOString().substr(0, 10),
        fin_date: new Date().toISOString().substr(0, 10)
      });
    },
    async obtenerRegistros(arg) {
      await this.callRegistrosForUser({
        dni: null,
        estado: arg,
        ini_date: new Date().toISOString().substr(0, 10),
        fin_date: new Date().toISOString().substr(0, 10)
      });
    }
  },
  async created() {
    await this.obtenerRegistros(1);
    this.callUser();
  }
};
</script>

<style scoped></style>

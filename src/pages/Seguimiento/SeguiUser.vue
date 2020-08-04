<template>
  <div class="transparent">
    <!--    {{ RegistrosForUser }}-->
    <q-card class="transparent" flat>
      <q-tabs v-model="tab" class="bg-primary-5 text-white" align="justify">
        <q-tab
          class="bg-amber-10"
          @click="obtenerRegistros(1)"
          name="asignados"
          label="Asignados"
        />
        <q-tab
          class="bg-green-10"
          @click="obtenerRegistros(2)"
          name="entregados"
          label="Entregados"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel class="transparent" name="asignados">
          <TablaDetalle class="transparent" :info="RegistrosForUser" :tab="tab" />
        </q-tab-panel>

        <q-tab-panel name="entregados">
          <TablaDetalle :info="RegistrosForUser" :tab="tab" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { MixinDefault, storagelocal } from "../../mixins/mixin.js";
import { date } from "quasar";
let timeStamp = Date.now();
let formattedString = date.formatDate(timeStamp, "DD/MM/YYYY");
export default {
  name: "SeguiUser",
  mixins: [MixinDefault, storagelocal],
  computed: {
    ...mapGetters("registros", ["RegistrosForUser"])
    // ...mapGetters("users", ["getUsers"])
  },
  components: {
    TablaDetalle: () => import("./TablaDetalle.vue")
  },
  data() {
    return {
      detalleData: "",
      modelgetUsers: null,
      model: null,
      ini_date: formattedString,
      fin_date: formattedString,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      tab: "asignados",
      dateIni: "",
      dateFin: ""
    };
  },
  methods: {
    ...mapActions("registros", ["callRegistrosForUser"]),
    // ...mapActions("users", ["callUser"]),
    async obtenerRegistros(arg) {
      setTimeout(async () => {
        await this.callRegistrosForUser({
          dni: this.dataLocal.dni,
          estado: arg,
          ini_date: null,
          fin_date: null
        });
      }, 1);
    }
  },
  async created() {
    await this.obtenerRegistros(1);
  }
};
</script>

<style scoped></style>

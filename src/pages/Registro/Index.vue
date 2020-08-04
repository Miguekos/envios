<template>
  <div>
    <q-card flat>
      <q-tabs style="border-radius: 0px 0px 0px 0px;" v-model="tab" class="" align="justify">
        <q-tab
          class="bg-bodega"
          @click="obtenerRegistros(0)"
          name="sinasingnar"
          label="En Bodega"
        />
        <q-tab
          class="bg-asignado"
          @click="obtenerRegistros(1)"
          name="asignados"
          label="Asignados"
        />
        <q-tab
          class="bg-entragado"
          @click="obtenerRegistros(2)"
          name="entregados"
          label="Entregados"
        />
        <q-tab
          class="bg-borrado"
          @click="obtenerRegistros(3)"
          name="devuelto"
          label="Borrados"
        />
      </q-tabs>

      <q-list>
        <q-item>
          <q-item-section>
            <q-input dense filled v-model="fechaIncio">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxyIni"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      mask="DD/MM/YYYY"
                      v-model="fechaIncio"
                      @input="() => cargarIniDate()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-item-section>
          <q-item-section>
            <q-input dense filled v-model="fechaFin">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxyFin"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      mask="DD/MM/YYYY"
                      v-model="fechaFin"
                      @input="() => cargarFinDate()"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-item-section>
        </q-item>
      </q-list>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="sinasingnar">
          <TablaDetalle
            :activar="false"
            :accionTabla="true"
            :asignar="true"
            :info="RegistrosForUser"
          />
        </q-tab-panel>

        <q-tab-panel name="asignados">
          <TablaDetalle
            :activar="true"
            :accionTabla="false"
            :asignar="true"
            :info="RegistrosForUser"
          />
        </q-tab-panel>

        <q-tab-panel name="entregados">
          <TablaDetalle
            :activar="true"
            :accionTabla="false"
            :asignar="false"
            :info="RegistrosForUser"
          />
        </q-tab-panel>

        <q-tab-panel name="devuelto">
          <TablaDetalle
            :activar="true"
            :accionTabla="false"
            :asignar="false"
            :info="RegistrosForUser"
          />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { MixinDefault, storagelocal } from "../../mixins/mixin.js";
import { date } from "quasar";
let timeStamp = Date.now();
let formattedString = date.formatDate(timeStamp, "DD/MM/YYYY");
export default {
  name: "IndexRegistro",
  mixins: [MixinDefault, storagelocal],
  computed: {
    ...mapGetters("registros", ["RegistrosForUser"]),
    ...mapGetters("users", ["getUsers"]),
    ...mapState("registros", ["ini_date", "fin_date"]),
    fechaIncio: {
      get() {
        return this.ini_date;
      },
      set(val) {
        this.setFechaIni(val);
      }
    },
    fechaFin: {
      get() {
        return this.fin_date;
      },
      set(val) {
        this.setFechaFin(val);
      }
    }
  },
  components: {
    TablaDetalle: () => import("./TablaDatos.vue"),
    DialogDetalle: () => import("../../components/detallePaquete")
  },
  data: () => {
    return {
      detalleData: "",
      modelgetUsers: null,
      model: null,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      tab: "sinasingnar",
      tabNumber: null
    };
  },
  methods: {
    ...mapActions("registros", [
      "callRegistrosForUser",
      "setFechaIni",
      "setFechaFin"
    ]),
    ...mapActions("users", ["callUser"]),
    cargarIniDate() {
      this.$refs.qDateProxyIni.hide();
      this.obtenerRegistros(this.tabNumber);
    },
    cargarFinDate() {
      this.$refs.qDateProxyFin.hide();
      this.obtenerRegistros(this.tabNumber);
    },
    obtenerRegistros(arg) {
      // console.log(`Se cargara el estado: ${arg}`);
      this.tabNumber = arg;
      this.callRegistrosForUser({
        dni: this.modelgetUsers,
        estado: arg,
        ini_date: this.ini_date,
        fin_date: this.fin_date
      });
    }
  },
  async created() {
    await this.obtenerRegistros(0);
    await this.callUser();
    console.log(formattedString);
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

.q-tab-panel {
  padding-top: 10px;
}
</style>

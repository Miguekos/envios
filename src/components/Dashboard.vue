<template>
  <div>
    <q-list bordered separator>
      <q-item v-bind:class="[$q.screen.lt.sm ? paratelf : '']">
        <q-item-section>
          <q-item-label header class="text-h5">Dashboard</q-item-label>
        </q-item-section>
        <q-item-section>
          <FiltrosFecha @click="obtenerRegistros" />
        </q-item-section>
      </q-item>
    </q-list>
    <q-list>
      <q-item
        v-bind:class="[$q.screen.lt.sm ? paratelf : '']"
        class="q-gutter-sm"
      >
        <q-item-section>
          <q-card class="mycard">
            <q-list class="text-center">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h5">Total</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h3 text-primary">{{
                    getDashboard.total_registro
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </q-item-section>
        <q-item-section>
          <q-card class="mycard">
            <q-list class="text-center">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h5">Pagados</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h3 text-primary">{{
                    getDashboard.total_pagado
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </q-item-section>
        <q-item-section>
          <q-card class="mycard">
            <q-list class="text-center">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h5">Por pagar</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h3 text-primary">{{
                    getDashboard.total_por_pagado
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </q-item-section>
        <q-item-section>
          <q-card class="mycard">
            <q-list class="text-center">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h5">Creditos</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h3 text-primary">{{
                    getDashboard.total_credito
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list>
      <q-item
        v-bind:class="[$q.screen.lt.sm ? paratelf : '']"
        class="q-gutter-sm"
      >
        <q-item-section>
          <q-card>
            <ApexHistorico
              :name="'Mobiles'"
              :largo="400"
              v-if="activar"
              :total_pagado="getHistorico.total_pagado"
              :total_por_pagado="getHistorico.total_por_pagado"
              :total_registro="getHistorico.total_registro"
              :fecha="getHistorico.fecha"
            />
          </q-card>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list>
      <q-item
        v-bind:class="[$q.screen.lt.sm ? paratelf : '']"
        class="q-gutter-sm"
      >
        <q-item-section>
          <q-card>
            <ApexBar
              :name="'Mobiles'"
              :largo="300"
              v-if="activar"
              :claves="getDashboard.responsablesKeys"
              :valor="getDashboard.responsablesValue"
            />
          </q-card>
        </q-item-section>
        <q-item-section>
          <q-card>
            <ApexBar
              :name="'Proveedores'"
              :largo="300"
              v-if="activar"
              :claves="getDashboard.proveedoresKeys"
              :valor="getDashboard.proveedoresValue"
            />
          </q-card>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list>
      <q-item>
        <q-item-section>
          <q-card>
            <ApexBar
              :name="'comunas'"
              :largo="650"
              v-if="activar"
              :claves="getDashboard.comunasKeys"
              :valor="getDashboard.comunasValue"
            />
          </q-card>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { storagelocal } from "src/mixins/mixin";
import { mapActions, mapGetters } from "vuex";
export default {
  // name: 'ComponentName',
  mixins: [storagelocal],
  components: {
    Report: () => import("./Report"),
    ApexLineas: () => import("./ApexLineas"),
    ApexBar: () => import("./ApexBar"),
    FiltrosFecha: () => import("./FiltroFechasDash"),
    ApexHistorico: () => import("./ApexHistorico")
  },
  computed: {
    ...mapGetters("registros", ["getDashboard", "getHistorico"])
  },
  data() {
    return {
      activar: false,
      paratelf: "paraeltelf"
    };
  },
  methods: {
    ...mapActions("registros", ["callDashboard", "callHistorico"]),
    async obtenerRegistros(val) {
      this.$q.loading.show();
      this.activar = false;
      // console.log("val", val);
      await this.callDashboard({
        ini_date: val.fi,
        fin_date: val.ff
      });
      this.activar = true;
      this.$q.loading.hide();
    }
  },
  async created() {
    console.log(this.rolLocal);
    if (this.rolLocal == "2") {
      this.$router.push("/seguimiento");
    } else {
    }
    this.$q.loading.show();
    await this.callHistorico();
    await this.callDashboard({
      ini_date: this.$store.state.registros.ini_date_dash,
      fin_date: this.$store.state.registros.fin_date_dash
    });
    this.activar = true;
    this.$q.loading.hide();
  }
};
</script>
<style>
.mycard {
  border-radius: 10px 10px 10px 10px;
}
.paraeltelf {
  flex-flow: column;
}
</style>

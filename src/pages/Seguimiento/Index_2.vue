<template>
  <div>
    <q-card flat>
      <q-tabs v-model="tab" class="bg-primary-5 text-white" align="justify">
        <q-tab class="bg-amber-10" name="asignados" label="Asignados" />
        <q-tab class="bg-green-10" name="entregados" label="Entregados" />
        <q-tab class="bg-primary-10" name="devuelto" label="Devuelto" />
        <q-tab class="bg-red-10" name="proveedor" label="Proveedor" />
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

      <!--      {{getUsers}}-->
      <!--      {{ this.modelgetUsers }}-->

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="asignados">
          <q-list>
            <q-item>
              <!--              <q-item-section>-->
              <!--                <q-select-->
              <!--                  @input="cargarUsuario()"-->
              <!--                  outlined-->
              <!--                  emit-value-->
              <!--                  dense-->
              <!--                  v-model="modelgetUsers"-->
              <!--                  :options="getUsers"-->
              <!--                  map-options-->
              <!--                  option-label="name"-->
              <!--                  option-value="dni"-->
              <!--                  label="Usuario"-->
              <!--                />-->
              <!--              </q-item-section>-->

              <q-item-section class="transparent">
                <q-input dense outlined v-model="dateIni" mask="date">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxyIni"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="dateIni"
                          @input="() => $refs.qDateProxyIni.hide()"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </q-item-section>
              <q-item-section>
                <q-input dense outlined v-model="dateFin" mask="date">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxyFin"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="dateFin"
                          @input="() => $refs.qDateProxyFin.hide()"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </q-item-section>
              <q-item-section>
                <q-btn outline color="indigo">{{ fullName }}</q-btn>
              </q-item-section>
            </q-item>
          </q-list>
          <TablaDetalle :info="RegistrosForUser" />
        </q-tab-panel>

        <q-tab-panel name="entregados">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="text-h5"></q-item-label>
              </q-item-section>
              <q-item-section>
                <q-btn class="bg-primary-7 text-white">{{ fullName }}</q-btn>
              </q-item-section>
            </q-item>
          </q-list>
          <TablaDetalle :info="RegistrosForUser" />
        </q-tab-panel>

        <q-tab-panel name="devuelto">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="text-h5"></q-item-label>
              </q-item-section>
              <q-item-section>
                <q-btn class="bg-primary-7 text-white">{{ fullName }}</q-btn>
              </q-item-section>
            </q-item>
          </q-list>
          <TablaDetalle :info="RegistrosForUser" />
        </q-tab-panel>

        <q-tab-panel name="proveedor">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="text-h5"></q-item-label>
              </q-item-section>
              <q-item-section>
                <q-btn class="bg-primary-7 text-white">{{ fullName }}</q-btn>
              </q-item-section>
            </q-item>
          </q-list>
          <TablaDetalle :info="RegistrosForUser" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { MixinDefault } from "../../mixins/mixin.js";
export default {
  name: "IndexSeguimiento",
  mixins: [MixinDefault],
  computed: {
    ...mapGetters("registros", ["RegistrosForUser"]),
    ...mapGetters("users", ["getUsers"])
  },
  components: {
    TablaDetalle: () => import("./TablaDetalle.vue"),
    DialogDetalle: () => import("../../components/detallePaquete")
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
    ...mapActions("registros", ["callRegistrosForUser"]),
    ...mapActions("users", ["callUser"]),
    cargarUsuario() {
      console.log("asd");
      this.callRegistrosForUser({
        dni: this.modelgetUsers,
        estado: "1"
      });
    },
    obtenerRegistros(arg) {
      this.callRegistrosForUser({
        dni: this.modelgetUsers,
        estado: arg
      });
    }
  },
  created() {
    this.obtenerRegistros(1);
    this.callUser();
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

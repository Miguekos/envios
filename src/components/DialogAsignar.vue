<template>
  <div class="q-pa-md q-gutter-sm">
    <!--    <q-btn label="Small" color="primary" @click="small = true" />-->
    <!--    <q-btn label="Medium" color="primary" @click="medium = true" />-->
    <!--    <q-btn label="Full Width" color="primary" @click="fullWidth = true" />-->
    <!--    <q-btn label="Full Height" color="primary" @click="fullHeight = true" />-->
    <q-dialog v-model="medium">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="text-center">
          <div class="text-h6">
            Detalle de:
            <!--            {{ info.name }}-->
          </div>
        </q-card-section>

        <q-card-section v-for="(items, index) in select" :key="index" class="q-pt-none">
          <q-list class="text-center" dense separator>
            <q-item>
              <q-item-section>
                <q-item-label>
                  <span class="text-bold titulos">Detalle:</span>
                  {{ index + 1 }} .- Paquete: {{ items.registro }} va a la
                  Comuna: {{ items.comuna }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <!--            <q-item>-->
            <!--              <q-item-section>-->
            <!--                <q-item-label>-->
            <!--                  <span class="text-bold titulos"> Direccion: </span>-->
            <!--                  {{ items.direccion }}-->
            <!--                </q-item-label>-->
            <!--              </q-item-section>-->
            <!--            </q-item>-->
            <!--            <q-item>-->
            <!--              <q-item-section>-->
            <!--                <q-item-label>-->
            <!--                  <span class="text-bold titulos"> Estado: </span>-->
            <!--                  &lt;!&ndash;                  {{ formatEstados(info.estado) }}&ndash;&gt;-->
            <!--                </q-item-label>-->
            <!--              </q-item-section>-->
            <!--            </q-item>-->
            <!--            <q-item>-->
            <!--              <q-item-section>-->
            <!--                <q-item-label>-->
            <!--                  <span class="text-bold titulos"> Recibido: </span>-->
            <!--                  &lt;!&ndash;                  {{ formatFecha(info.created_at) }}&ndash;&gt;-->
            <!--                </q-item-label>-->
            <!--              </q-item-section>-->
            <!--            </q-item>-->
          </q-list>
        </q-card-section>

        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>
                <q-item-label>
                  <span class="text-bold titulos">Asignar a:</span>
                </q-item-label>
                <q-select
                  dense
                  v-model="model"
                  :options="getUsers"
                  option-value="dni"
                  option-label="name"
                  emit-value
                  map-options
                  label="Usuario"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>
                <q-item-label>
                  <span class="text-bold titulos">Cambiar estado a:</span>
                </q-item-label>
                <q-select
                  dense
                  v-model="estado"
                  :options="optionsDeEstados"
                  option-value="value"
                  option-label="label"
                  emit-value
                  map-options
                  label="Estado"
                />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" :loading="boton" @click="update()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { MixinDefault, storagelocal } from "../mixins/mixin";
import { mapActions, mapGetters } from "vuex";
import { date } from "quasar";
let timeStamp = Date.now();
let formattedString = date.formatDate(timeStamp, "DD/MM/YYYY");
export default {
  props: {
    select: Array
  },
  name: "DialogAsignar",
  mixins: [MixinDefault, storagelocal],
  computed: {
    ...mapGetters("users", ["getUsers"])
  },
  data() {
    return {
      // ini_date: formattedString,
      // fin_date: formattedString,
      boton: false,
      estado: null,
      model: null,
      info: "",
      small: false,
      medium: false,
      fullWidth: false,
      fullHeight: false
    };
  },
  methods: {
    ...mapActions("registros", ["updateRegistro", "callRegistrosForUser"]),
    ...mapActions("users", ["callUser"]),
    async update() {
      console.log(this.dataLocal);
      if (this.estado != null) {
        this.boton = true;
        try {
          for (let index = 0; index < this.select.length; index++) {
            const element = this.select[index];
            console.log(element);
            const resp_update = await this.updateRegistro({
              id_: element.id_,
              responsable: this.model,
              responsable_name: this.buscarNombre(this.model),
              modificado_dni: this.dataLocal.dni,
              modificado: this.dataLocal.name,
              estado: this.estado
            });
            console.log(resp_update);
          }
          this.callRegistrosForUser({
            dni: null,
            estado: "0",
            ini_date: this.$store.state.registros.ini_date,
            fin_date: this.$store.state.registros.fin_date
          });
          this.noti(1);
          this.estado = "";
          this.model = "";
          this.boton = false;
          this.medium = false;
        } catch (e) {
          if (e.response.status === 304) {
            this.noti(2);
            this.boton = false;
          } else {
            this.noti(3);
            this.boton = false;
          }
        }
      } else {
        this.noti(4);
        this.boton = false;
      }
    },
    buscarNombre(id) {
      for (var d = 0, len = this.getUsers.length; d < len; d += 1) {
        if (this.getUsers[d].dni === id) {
          return this.getUsers[d].name;
        }
      }
    },
    activarDialog() {
      // console.log(val);
      // this.info = val;
      this.medium = true;
    }
  },
  created() {
    this.callUser();
  }
};
</script>

<style scoped>
.titulos {
  font-style: normal;
}
</style>

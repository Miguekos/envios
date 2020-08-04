<template>
  <div class="center">
    <!--    <vs-button shadow @click="active = !active">-->
    <!--    <vs-button shadow v-on:update:title="active = $event">-->
    <!--      Open Dialog-->
    <!--    </vs-button>-->
    <!--    <vs-dialog scroll overflow-hidden not-close auto-width v-model="active">-->
    <!--      <template #header>-->
    <!--        <h3>-->
    <!--          {{ `${detalleData.name}  ${detalleData.lastname}` }}-->
    <!--        </h3>-->
    <!--      </template>-->
    <!--      <div class="con-content">-->
    <!--        {{ detalleData }}-->
    <!--        <q-list>-->
    <!--          <q-item>-->
    <!--            <q-item-section> </q-item-section>-->
    <!--            <q-item-section> </q-item-section>-->
    <!--          </q-item>-->
    <!--          <q-item>-->
    <!--            <q-item-section>-->
    <!--              <q-btn-->
    <!--                @click="llamar"-->
    <!--                rounded-->
    <!--                color="positive"-->
    <!--                label="Llamar"-->
    <!--              ></q-btn>-->
    <!--            </q-item-section>-->
    <!--            <q-item-section>-->
    <!--              <q-btn-->
    <!--                @click="active = false"-->
    <!--                rounded-->
    <!--                color="negative"-->
    <!--                label="Cerrar"-->
    <!--              ></q-btn>-->
    <!--            </q-item-section>-->
    <!--            <q-item-section>-->
    <!--              <q-btn-->
    <!--                @click="update"-->
    <!--                rounded-->
    <!--                color="info"-->
    <!--                label="Entregado"-->
    <!--              ></q-btn>-->
    <!--            </q-item-section>-->
    <!--          </q-item>-->
    <!--        </q-list>-->
    <!--      </div>-->
    <!--    </vs-dialog>-->
    <q-dialog v-model="entregado">
      <q-card>
        <q-list>
          <q-item>
            <q-item-section>
            asd
            </q-item-section>
            <q-item-section>
qwe
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
    <q-dialog v-model="active">
      <q-card class="full-width q-pa-md">
        <!--          {{ detalleData }}-->
        <q-list class="listas" separator bordered dense>
          <q-item>
            <q-item-section>
              <q-item-label header class="text-h4 text-center">
                {{ `${detalleData.name}  ${detalleData.lastname}` }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="listasitems"> Nombre: </q-item-section>
            <q-item-section>
              {{ detalleData.name }} {{ detalleData.lastname }}
            </q-item-section>
            <q-item-section class="listasitems"> Comuna: </q-item-section>
            <q-item-section> {{ detalleData.comuna }} </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="listasitems"> Direccion: </q-item-section>
            <q-item-section> {{ detalleData.direccion }} </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="listasitems"> Telf: </q-item-section>
            <q-item-section> {{ detalleData.telf }} </q-item-section>
            <q-item-section class="listasitems"> Tipo de pago: </q-item-section>
            <q-item-section> {{ detalleData.tipodepago }} </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="listasitems"> Control: </q-item-section>
            <q-item-section> {{ detalleData.control }} </q-item-section>
            <q-item-section class="listasitems">
              Valor de flete:
            </q-item-section>
            <q-item-section> {{ detalleData.valordeflete }} </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="listasitems"> Proveedor: </q-item-section>
            <q-item-section> {{ detalleData.proveedores }} </q-item-section>
            <q-item-section class="listasitems"> Registro: </q-item-section>
            <q-item-section> {{ detalleData.registro }} </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="listasitems"> Asignado el: </q-item-section>
            <q-item-section>
              {{ formatFecha(detalleData.last_modified) }}
            </q-item-section>
          </q-item>
        </q-list>
        <q-list class="q-pa-md">
          <q-item>
            <q-item-section>
              <q-btn @click="llamar" color="positive" label="Llamar"></q-btn>
            </q-item-section>
            <q-item-section>
              <q-btn
                @click="active = false"
                color="negative"
                label="Cerrar"
              ></q-btn>
            </q-item-section>
            <q-item-section>
              <q-btn @click="update" color="info" label="Entregado"></q-btn>
            </q-item-section>
          </q-item>
        </q-list>
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
  props: ["detalleData"],
  mixins: [MixinDefault, storagelocal],
  data: () => ({
    entregado: true,
    active: false,
    ini_date: formattedString,
    fin_date: formattedString,
    input1: "",
    input2: "",
    checkbox1: false
  }),
  methods: {
    ...mapActions("registros", ["updateRegistro", "callRegistrosForUser"]),
    llamar() {
      console.log(this.detalleData);
      window.open(`tel:+56${this.detalleData.telf}`);
    },
    async update() {
      this.boton = true;
      try {
        const resp_update = await this.updateRegistro({
          id_: this.detalleData.id_,
          responsable: this.dataLocal.dni,
          estado: "2"
        });
        console.log(resp_update);
        await this.callRegistrosForUser({
          dni: this.dataLocal.dni,
          estado: 1,
          ini_date: null,
          fin_date: null
        });
        this.noti(1);
        this.boton = false;
        this.medium = false;
        this.active = false;
      } catch (e) {
        console.log(e);
        // if (e.response.status === 304) {
        //   this.noti(2);
        //   this.boton = false;
        // } else {
        //   this.noti(3);
        //   this.boton = false;
        // }
      }
    },
    activarDialog() {
      console.log("asdas");
      this.active = true;
    }
    // cerrarDialog() {
    //   console.log("asdas");
    //   this.active = false;
    // }
  },
  created() {}
};
</script>
<style lang="stylus">
.listas
  min-height: 32px;
  padding: 0px 16px;

.listasitems
  background-color $secondary
  color white
  padding-left 10px
</style>

<template>
  <q-dialog
    :cerrar="cerrar"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
    v-model="activate"
  >
    <q-card>
      <div id="impresora">
        <q-list>
          <q-item>
            <q-item-section>
              <img
                src="../assets/logo2.png"
                style="width:70vw;max-width:130px; border-radius: 10px 10px 10px 10px"
              />
            </q-item-section>
            <q-item-section side>
              <vue-qr
                style="width:70vw;max-width:110px; border-radius: 10px 10px 10px 10px"
                :text="mensaje"
              ></vue-qr>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list>
          <q-item>
            <q-item-section>
              <q-markup-table flat dense>
                <!--      <thead>-->
                <!--        <tr>-->
                <!--          <th class="text-left">Comuna</th>-->
                <!--          <th class="text-right">Chile 2</th>-->
                <!--          <th class="text-right">Fat (g)</th>-->
                <!--          <th class="text-right">Carbs (g)</th>-->
                <!--          <th class="text-right">Protein (g)</th>-->
                <!--          <th class="text-right">Sodium (mg)</th>-->
                <!--        </tr>-->
                <!--      </thead>-->
                <tbody>
                  <tr>
                    <td class="text-left">Comuna</td>
                    <td class="text-right">{{ info.comuna }}</td>
                  </tr>
                  <tr>
                    <td class="text-left">Nombre</td>
                    <td class="text-right">
                      {{ info.name }} {{ info.lastname }}
                    </td>
                  </tr>
                  <!--              <tr>-->
                  <!--                <td class="text-left">Apellido</td>-->
                  <!--                <td class="text-right">{{ info.lastname }}</td>-->
                  <!--              </tr>-->
                  <tr>
                    <td class="text-left">Direccion</td>
                    <td id="direc" class="text-right">{{ info.direccion }}</td>
                  </tr>
                  <tr>
                    <td class="text-left">Telf.</td>
                    <td class="text-right">{{ info.telf }}</td>
                  </tr>
                  <tr>
                    <td class="text-left">Tipo de pago</td>
                    <td class="text-right">{{ info.tipodepago }}</td>
                  </tr>
                  <tr>
                    <td class="text-left">Valor de flete</td>
                    <td class="text-right">{{ info.valordeflete }}</td>
                  </tr>
                  <tr>
                    <td class="text-left">Control</td>
                    <td class="text-right">{{ info.control }}</td>
                  </tr>
                  <tr>
                    <td class="text-left">Proveedores</td>
                    <td class="text-right">{{ info.proveedores }}</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-item-section>
          </q-item>
        </q-list>

        <!--    <q-btn label="imprimir" @click="print()"></q-btn>-->
        <q-list>
          <q-item>
            <q-item-section>
              <div class="row justify-around">
                <div>
                  Orden:
                  {{ info.registro }}
                </div>
                <div>{{ formatFecha(info.created_at) }}</div>
              </div>
            </q-item-section>
          </q-item>
          <q-item class="botones">
            <q-item-section>
              <q-btn
                @click="cerrar"
                v-if="activarImpresion"
                color="red"
                label="cerrar"
              ></q-btn>
            </q-item-section>
            <q-item-section>
              <q-btn
                @click="print"
                v-if="info.registro"
                color="green"
                label="Imprimir"
              ></q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <!--      <Imprimir :info="jsonEnviar" :idRegistro="idRegistro" />-->

      <!--        <q-card-actions align="center">-->
      <!--          <q-btn flat label="Cerrar" color="negative" v-close-popup />-->
      <!--          <q-btn flat label="Registrar" color="primary" v-close-popup />-->
      <!--        </q-card-actions>-->
      <!--        <q-btn id="boton" dense flat icon="close" v-close-popup>-->
      <!--        </q-btn>-->
    </q-card>
  </q-dialog>
</template>

<script>
import { MixinDefault } from "../mixins/mixin.js";
import { date } from "quasar";
let timeStamp = Date.now();
let formattedString = date.formatDate(timeStamp, "DD/MM/YYYY HH:mm");
export default {
  props: ["info"],
  mixins: [MixinDefault],
  data() {
    return {
      src:
        "https://api.apps.com.pe/fileserver/uploads/clipdealer_A15780965_preview.jpg",
      activarImpresion: true,
      maximizedToggle: true,
      activate: false,
      tableDatas: []
    };
  },
  computed: {
    fecha() {
      return formattedString;
    },
    mensaje() {
      return `${this.info.registro}`;
    }
  },
  methods: {
    activar() {
      this.activate = true;
    },
    cerrar() {
      this.$emit("click");
      this.activate = false;
    },
    btnOnClick(v) {
      this.tableDatas.Push({
        itemname: "item",
        quantity: 1,
        sellingprice: 55,
        amount: 55
      });
    },
    print() {
      window.print();
    }
  },
  async created() {
    // setTimeout(() => {
    //   window.print();
    //   window.close();
    // }, 3000);
  }
};
</script>

<style>
@media print {
  #direc {
    /*word-wrap: break-word;*/
    white-space: pre-wrap;
    /*color: red;*/
    /*max-width: 8cm;*/
  }
  #impresora > div:nth-child(1) > div {
    padding-top: 0px;
  }
  .botones {
    display: none;
  }
  #impresora {
    width: 8cm;
    height: 5.08cm;
  }
  #impresora > div:nth-child(1) > div {
    padding: 0px 0px 0px 0px;
  }
  #impresora > div:nth-child(3) > div {
    padding: 0px 0px 0px 0px;
  }
  #impresora > div:nth-child(2) > div {
    padding: 0px 0px 0px 0px;
  }
  .text-left {
    width: 20px;
  }
  .q-table--dense .q-table th,
  .q-table--dense .q-table td {
    padding: 0px 8px;
  }
  .q-table--dense .q-table thead tr,
  .q-table--dense .q-table tbody tr,
  .q-table--dense .q-table tbody td {
    height: 10px;
  }
}
</style>

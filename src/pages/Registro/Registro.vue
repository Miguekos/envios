<template>
  <q-page class="">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-xs">
      <q-list>
        <q-item style="padding-top: 0px;">
          <q-item-section>
            <q-item-label class="text-bold text-h6 text-center">
              <img
                src="~assets/ezgif.com-crop.gif"
                style="width:50vw;max-width:280px; border-radius: 10px 10px 10px 10px"
              />
            </q-item-label>
            <!--            <vue-qr :logoSrc="src" text="Hello world!" :correctLevel="2" :size="500"></vue-qr>-->
            <!--            <vue-qr text="Hello world!" :callback="test" qid="testid"></vue-qr>-->
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              autofocus
              dense
              options-dense
              standout="bg-primary-5 text-white"
              v-model="jsonEnviar.comuna"
              :rules="[val => !!val || 'Compro obligatorio']"
              :options="options"
              use-input
              hide-selected
              fill-input
              @filter="filterFnComuna"
              @filter-abort="abortFilterFn"
              input-debounce="0"
              label="Comuna"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">No results</q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              dense
              autocomplete="ÑÖcompletes"
              standout="bg-primary-5 text-white"
              v-model="jsonEnviar.name"
              ref="reset"
              :rules="[val => !!val || 'Compro obligatorio']"
              label="Nombre"
            />
          </q-item-section>
          <q-item-section>
            <q-input
              dense
              autocomplete="ÑÖcompletes"
              standout="bg-primary-5 text-white"
              v-model="jsonEnviar.lastname"
              ref="reset"
              :rules="[val => !!val || 'Compro obligatorio']"
              label="Apellido"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              dense
              autocomplete="ÑÖcompletes"
              standout="bg-primary-5 text-white"
              v-model="jsonEnviar.direccion"
              ref="reset"
              :rules="[val => !!val || 'Compro obligatorio']"
              label="Direccion"
            />
          </q-item-section>
          <q-item-section>
            <q-input
              dense
              autocomplete="ÑÖcompletes"
              standout="bg-primary-5 text-white"
              v-model="jsonEnviar.telf"
              ref="reset"
              :rules="[val => !!val || 'Compro obligatorio']"
              label="Telefono"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              dense
              options-dense
              standout="bg-primary-5 text-white"
              v-model="jsonEnviar.tipodepago"
              ref="reset"
              :rules="[val => !!val || 'Compro obligatorio']"
              :options="optionsTP"
              use-input
              hide-selected
              fill-input
              @filter="filterFnTipoPago"
              @filter-abort="abortFilterFn"
              input-debounce="0"
              label="Tipo de pago"
            />
          </q-item-section>
        </q-item>
        <!--        {{ optionsProvee }}-->
        <q-item>
          <q-item-section>
            <q-select
              dense
              options-dense
              standout="bg-primary-5 text-white"
              v-model="jsonEnviar.proveedores"
              ref="reset"
              :rules="[val => !!val || 'Compro obligatorio']"
              @filter="filterFnProvee"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="optionsProvee"
              option-value="name"
              option-label="name"
              emit-value
              map-options
              label="Proveedores"
            />
          </q-item-section>
          <!--          <q-item-section side>-->
          <!--            <q-btn icon="add" @click="addProvee = true" color="green" class="q-mb-lg"></q-btn>-->
          <!--          </q-item-section>-->
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              dense
              autocomplete="ÑÖcompletes"
              standout="bg-primary-5 text-white"
              v-model="jsonEnviar.valordeflete"
              ref="reset"
              label="Valor de Flete"
              mask="#.##"
              fill-mask="0"
              reverse-fill-mask
              input-class="text-left"
              :disable="jsonEnviar.tipodepago == 'Pagado'"
            />
          </q-item-section>
          <q-item-section>
            <q-input
              dense
              autocomplete="ÑÖcompletes"
              standout="bg-primary-5 text-white"
              v-model="jsonEnviar.control"
              ref="reset"
              label="Control"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <!--            <vs-button circle success type="submit">Guardar</vs-button>-->
            <q-btn circle :loading="loadboton" color="green" type="submit"
              >Guardar</q-btn
            >
          </q-item-section>
          <q-item-section>
            <!--            <vs-button circle danger type="reset">Limpiar</vs-button>-->
            <q-btn circle color="red" type="reset">Limpiar</q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-form>
    <q-dialog persistent v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirmar registro</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list>
            <q-item>
              <q-item-section class="text-center">
                <q-btn
                  @click="imprimir()"
                  color="info"
                  class="full-width"
                  label="imprimir"
                ></q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="Cerrar" color="negative" v-close-popup />
          <q-btn flat label="Registrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div>
      <Imprimir @click="onReset()" :info="jsonImprimir" ref="imprimir" />
    </div>
    <q-dialog ref="addProvee" :cerrar="cerrar" v-model="addProvee">
      <q-card>
        <AddProveedor />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import { storagelocal } from "src/mixins/mixin";

export default {
  mixins: [storagelocal],
  computed: {
    ...mapGetters("registros", ["getRegistrosCount"]),
    ...mapGetters("mante", ["getProvee"])
  },
  components: {
    AddProveedor: () => import("components/addProveedor"),
    Imprimir: () => import("components/Imprimir")
  },
  data() {
    return {
      addProvee: false,
      loadboton: false,
      activatIMprimir: false,
      src:
        "https://api.apps.com.pe/fileserver/uploads/clipdealer_A15780965_preview.jpg",
      dialog: false,
      maximizedToggle: true,
      dialogImprimir: false,
      alert: false,
      model: null,
      dataImprimir: null,
      jsonImprimir: [],
      jsonEnviar: {
        tipodepago: "",
        control: "",
        valordeflete: "0.00",
        comuna: "",
        proveedores: "",
        name: "",
        lastname: "",
        direccion: "",
        telf: "",
        idRegistro: ""
      },
      options: [],
      optionsTP: [],
      optionsProvee: [],
      optionsBase: [],
      idRegistro: null,
      // optionsTipoPago: [
      //   {
      //     name: "Por pagar",
      //     value: 1
      //   },
      //   {
      //     name: "Pagado",
      //     value: 2
      //   },
      //   {
      //     name: "Cuenta corriente",
      //     value: 3
      //   }
      // ],
      optionsTipoPagoValor: null,
      optionsTipoPago: ["Por pagar", "Pagado", "Cuenta Corriente"],
      optionsComuna: [
        "COLINA",
        "SANTIAGO",
        "CONCHALI",
        "QUILICURA",
        "PUDAHUEL",
        "PADRE HURTADO",
        "RENCA",
        "CERRO NAVIA",
        "LO PRADO",
        "QUINTA NORMAL",
        "ESTACION CENTRAL",
        "MAIPU",
        "CERRILLOS",
        "LO ESPEJO",
        "EL BOSQUE",
        "SAN BERNARDO",
        "LA PINTANA",
        "LA CISTERNA",
        "PEDRO AGUIRRE CERDA",
        "SAN MIGUEL",
        "SAN JOAQUIN",
        "SAN RAMON",
        "LA GRANJA",
        "PUENTE ALTO",
        "LA FLORIDA",
        "MACUL",
        "NUNOA",
        "PENALOLEN",
        "LA REINA",
        "LAS CONDES",
        "VITACURA",
        "PROVIDENCIA",
        "LO BARNECHEA",
        "RECOLETA",
        "HUECHURABA",
        "INDEPENDENCIA",
        "LAMPA",
        "TALAGANTE",
        "CHICUREO",
        "BUIN",
        "PENAFLOR",
        "PIRQUE",
        "CALERA DE TANGO",
        "PAINE"
      ]
    };
  },
  methods: {
    ...mapActions("registros", ["addRegistro", "callRegistrosCount"]),
    ...mapActions("mante", ["callProvee"]),
    filterFnComuna(val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(() => {
        update(
          () => {
            if (val === "") {
              this.options = this.optionsComuna;
            } else {
              const needle = val.toLowerCase();
              this.options = this.optionsComuna.filter(
                v => v.toLowerCase().indexOf(needle) > -1
              );
            }
          },

          // next function is available in Quasar v1.7.4+;
          // "ref" is the Vue reference to the QSelect
          ref => {
            if (val !== "" && ref.options.length > 0) {
              ref.setOptionIndex(-1); // reset optionIndex in case there is something selected
              ref.moveOptionSelection(1, true); // focus the first selectable option and do not update the input-value
            }
          }
        );
      }, 200);
    },
    filterFnProvee(val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow
      console.log(val);
      setTimeout(() => {
        update(
          () => {
            if (val === "") {
              this.optionsProvee = this.optionsBase;
            } else {
              const needle = val.toLowerCase();
              this.optionsProvee = this.optionsBase.filter(
                v => v.name.toLowerCase().indexOf(needle) > -1
              );
            }
          },

          // next function is available in Quasar v1.7.4+;
          // "ref" is the Vue reference to the QSelect
          ref => {
            if (val !== "" && ref.options.length > 0) {
              ref.setOptionIndex(-1); // reset optionIndex in case there is something selected
              ref.moveOptionSelection(1, true); // focus the first selectable option and do not update the input-value
            }
          }
        );
      }, 200);
    },
    filterFnTipoPago(val, update, abort) {
      // call abort() at any time if you can't retrieve data somehow

      setTimeout(() => {
        update(
          () => {
            if (val === "") {
              this.optionsTP = this.optionsTipoPago;
            } else {
              const needle = val.toLowerCase();
              this.optionsTP = this.optionsTipoPago.filter(
                v => v.toLowerCase().indexOf(needle) > -1
              );
            }
          },

          // next function is available in Quasar v1.7.4+;
          // "ref" is the Vue reference to the QSelect
          ref => {
            if (val !== "" && ref.options.length > 0) {
              ref.setOptionIndex(-1); // reset optionIndex in case there is something selected
              ref.moveOptionSelection(1, true); // focus the first selectable option and do not update the input-value
            }
          }
        );
      }, 200);
    },
    abortFilterFn() {
      // console.log('delayed filter aborted')
    },
    test(dataUrl, id) {
      console.log(url, id);
    },
    async guardarRegistro() {},
    imprimir() {},
    async onSubmit() {
      if (
        this.jsonEnviar.tipodepago === "Por pagar" &&
        this.jsonEnviar.valordeflete === "0.00"
      ) {
        this.$q.notify({
          message: `Valor de flete no puede quedar vacio`,
          color: "red-5",
          position: "top"
        });
      } else {
        this.loadboton = true;
        console.log(this.jsonEnviar.tipodepago);
        this.addRegistro({
          ...this.jsonEnviar
        })
          .then(async res => {
            console.log("res.data", res);
            // await this.dataImprimir.push({
            //   ...this.jsonEnviar,
            //   registro: res.registro
            // });
            this.jsonImprimir = res.registro;
            // this.activatIMprimir = true
            // this.activatIMprimir = true;
            this.$refs.imprimir.activar();
            // this.alert = true;
            // await this.onReset();
            await this.callRegistrosCount();
            this.loadboton = false;
          })
          .catch(err => {
            console.log(err);
            console.log(e);
            this.$q.notify({
              message: `Error Controlado`,
              color: "red-5",
              position: "top"
            });
            this.loadboton = false;
          });
      }
    },

    onReset() {
      this.$refs.reset.resetValidation();
      this.jsonEnviar.tipodepago = "";
      this.jsonEnviar.control = "";
      this.jsonEnviar.valordeflete = "0.00";
      this.jsonEnviar.comuna = "";
      this.jsonEnviar.proveedores = "";
      this.jsonEnviar.name = "";
      this.jsonEnviar.lastname = "";
      this.jsonEnviar.direccion = "";
      this.jsonEnviar.telf = "";
      // this.activatIMprimir = false;
    },
    cerrar() {
      this.dialogImprimir = false;
    },
    setValue(val) {
      console.log(val);
    }
  },
  async created() {
    console.log(this.rolLocal);
    if (this.rolLocal == "2") {
      this.$router.push("/seguimiento");
    } else {
    }
    await this.callRegistrosCount();
    this.$on("update", this.setValue);
    await this.callProvee();
    this.optionsBase = this.getProvee;
  }
};
</script>
<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0px 1000px #819fce inset !important;
}
</style>

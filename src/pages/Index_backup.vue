<template>
  <q-page class="q-pa-xs">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label class="text-bold text-h6 text-center"
            ><img
              src="~assets/logo.jpeg"
              style="width:50vw;max-width:250px;"
            />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-center text-h6">
              N°
              <q-chip
                square
                color="#cccccc"
                style="justify-content: center;"
                dense
                size="lg"
              >
                {{ $store.state.registros.RegistrosCount }}
              </q-chip>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list>
        <q-item>
          <q-item-section>
            <q-select
              dense
              options-dense
              standout="bg-primary-5 text-white"
              v-model="jsonEnviar.comuna"
              required
              :options="optionsComuna"
              label="Comuna"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              dense
              autocomplete="ÑÖcompletes"
              standout="bg-primary-5 text-white"
              v-model="jsonEnviar.name"
              required
              label="Nombre"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              dense
              autocomplete="ÑÖcompletes"
              standout="bg-primary-5 text-white"
              v-model="jsonEnviar.lastname"
              required
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
              required
              label="Direccion"
            />
          </q-item-section>
          <q-item-section>
            <q-input
              dense
              autocomplete="ÑÖcompletes"
              standout="bg-primary-5 text-white"
              v-model="jsonEnviar.telf"
              required
              label="Telefono"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              dense
              autocomplete="ÑÖcompletes"
              standout="bg-primary-5 text-white"
              v-model="jsonEnviar.tipodepago"
              required
              label="Tipo de pago"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              dense
              autocomplete="ÑÖcompletes"
              standout="bg-primary-5 text-white"
              v-model="jsonEnviar.control"
              required
              label="Control"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-input
              dense
              autocomplete="ÑÖcompletes"
              standout="bg-primary-5 text-white"
              v-model="jsonEnviar.valordeflete"
              required
              label="Valor de Flete"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              dense
              options-dense
              standout="bg-primary-5 text-white"
              v-model="jsonEnviar.proveedores"
              required
              :options="optionsProvee"
              label="Proveedores"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <q-list>
        <q-item>
          <q-item-section>
            <!--            <vs-button circle danger type="reset">Limpiar</vs-button>-->
            <q-btn circle color="red" type="reset">Limpiar</q-btn>
          </q-item-section>
          <q-item-section>
            <!--            <vs-button circle success type="submit">Guardar</vs-button>-->
            <q-btn circle color="green" type="submit">Guardar</q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-form>
  </q-page>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        computed: {
            ...mapGetters("registros", ["getRegistrosCount"])
        },
        data() {
            return {
                model: null,
                jsonEnviar: {
                    tipodepago: "",
                    control: "",
                    valordeflete: "",
                    comuna: "",
                    proveedores: "",
                    name: "",
                    lastname: "",
                    direccion: "",
                    telf: ""
                },
                optionsProvee: [
                    "GUIDO",
                    "ENROLANDO.CL",
                    "SOKO BOX",
                    "DREAM COLOR",
                    "KAWAYI",
                    "OUTFITCHILE",
                    "NUTRIFAST",
                    "PERLA STORE",
                    "GOCY",
                    "ASTRID",
                    "SOFIA",
                    "GORROS.CL",
                    "LOOKING",
                    "DOGNITA",
                    "ORIGINALVICO",
                    "FOSTON",
                    "EXCLUSIVE.CYD",
                    "LUKARU",
                    "OTROS"
                ],
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
            async onSubmit() {
                console.log(this.jsonEnviar);
                try {
                    const res = await this.addRegistro({
                        ...this.jsonEnviar,
                        registro: this.getRegistrosCount
                    });
                    this.$q.notify({
                        message: `Se registro el pedido de ${this.jsonEnviar.nombre}`,
                        color: "white",
                        textColor: "primary",
                        position: "top"
                    });
                    await this.onReset();
                    await this.callRegistrosCount();
                } catch (e) {
                    console.log(e);
                    this.$q.notify({
                        message: `Error Controlado`,
                        color: "red-5",
                        position: "top"
                    });
                }
            },
            onReset() {
                this.jsonEnviar.tipodepago = "";
                this.jsonEnviar.control = "";
                this.jsonEnviar.valordeflete = "";
                this.jsonEnviar.comuna = "";
                this.jsonEnviar.proveedores = "";
                this.jsonEnviar.name = "";
                this.jsonEnviar.lastname = "";
                this.jsonEnviar.direccion = "";
                this.jsonEnviar.telf = "";
            }
        },
        created() {
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

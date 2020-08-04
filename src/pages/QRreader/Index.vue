<template>
  <q-page class="row full-height items-center">
    <div class="col text-center">
      <q-select
        filled
        v-model="mobil"
        use-input
        input-debounce="0"
        label="Seleciona el Mobil a cargar"
        :options="options"
        option-label="name"
        option-value="dni"
        map-options
        emit-value
        @filter="filterFn"
        behavior="menu"
        :rules="[
          val => !!val || 'Debe seleionar una mobil para poder cargar paquetes'
        ]"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <span class="text-subtitle1 text-grey-9">Escaner de paquete</span>
      <!--      <q-btn-->
      <!--        color="blue-grey-10"-->
      <!--        rounded-->
      <!--        icon="camera_alt"-->
      <!--        label="Read QRCode"-->
      <!--        class="full-width"-->
      <!--        size="lg"-->
      <!--        @click="turnCameraOn()"-->
      <!--        v-show="!showCamera"-->
      <!--      />-->

      <p class="text-subtitle1" v-if="result">
        Paquete con ID: <b>{{ result }}</b>
      </p>
      <div v-if="mobil">
        <qrcode-stream :camera="camera" @decode="onDecode"> </qrcode-stream>
      </div>
    </div>
  </q-page>
</template>

<style></style>

<script>
import { MixinDefault, storagelocal } from "../../mixins/mixin";
import { mapActions, mapGetters } from "vuex";
import { date } from "quasar";
let timeStamp = Date.now();
let formattedString = date.formatDate(timeStamp, "DD/MM/YYYY");
import { QrcodeStream } from "vue-qrcode-reader";
export default {
  name: "PageIndex",
  mixins: [MixinDefault, storagelocal],
  components: { QrcodeStream },
  computed: {
    ...mapGetters("users", ["getUsers"])
  },
  data() {
    return {
      isValid: undefined,
      camera: "auto",
      result: null,
      showCamera: false,
      mobil: null,
      options: []
    };
  },
  methods: {
    ...mapActions("registros", [
      "updateRegistro",
      "callRegistrosForUser",
      "updateRegistroQR"
    ]),
    ...mapActions("users", ["callUser"]),
    filterFn(val, update) {
      // call abort() at any time if you can't retrieve data somehow
      console.log(val);
      setTimeout(() => {
        update(
          () => {
            if (val === "") {
              this.options = this.getUsers;
            } else {
              const needle = val.toLowerCase();
              this.options = this.getUsers.filter(
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
    async update() {
      console.log(this.dataLocal);
      if (this.mobil != null) {
        try {
          const resp_update = await this.updateRegistroQR({
            registro: parseInt(this.result),
            responsable: this.mobil,
            responsable_name: this.buscarNombre(this.model),
            modificado_dni: this.dataLocal.dni,
            modificado: this.dataLocal.name,
            estado: "1"
          });
          this.$q.notify({
            message: resp_update,
            color: "white",
            textColor: "primary",
            position: "top"
          });
          this.result = null;
        } catch (e) {
          console.log(e);
          this.noti(2);
          this.boton = false;
          this.result = null;
        }
      } else {
        this.noti(4);
        this.boton = false;
        this.result = null;
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
    },
    async onDecode(content) {
      this.result = content;
      console.log(content);
      this.update();
      // this.turnCameraOff();
    },

    turnCameraOn() {
      this.camera = "auto";
      this.showCamera = true;
    },

    turnCameraOff() {
      this.camera = "off";
      this.showCamera = false;
    }
  },
  async created() {
    // await this.turnCameraOn();
    this.camera = "auto";
    await this.callUser();
  }
};
</script>

<style scoped>
.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
}
</style>

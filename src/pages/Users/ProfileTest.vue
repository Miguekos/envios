<template>
  <q-page>
    <q-list>
      <q-form @submit="onSubmit">
        <q-item-label header class="text-grey-8">
          <q-item-label header class="text-center text-h6 q-pa-xs"
            >Editar perfil de {{ $store.state.users.UsersOne.name }}
          </q-item-label>
          <q-separator spaced />
          <q-list>
            <q-item
              @click="alert = true"
              clickable
              v-ripple
              class="justify-center"
            >
              <q-avatar size="100px" font-size="52px">
                <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png" /> -->
                <img
                  :src="
                    `https://api.apps.com.pe/fileserver/uploads/${$store.state.users.UsersOne.profile}`
                  "
                />
              </q-avatar>
            </q-item>
            <q-item clickable v-ripple class="justify-center">
              <q-item-section class="text-center text-bold">
                <!-- <q-item-label>{{ userdatil.name }}</q-item-label>
                <q-item-label caption>{{ userdatil.email }}</q-item-label>-->
                <q-item-label>{{ getUserOne.name }}</q-item-label>
                <q-item-label caption>{{ getUserOne.email }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-input
                  disable
                  dense
                  color="negative"
                  filled
                  v-model="usersDetalle.name"
                  label="Nombres y Apellidos"
                />
              </q-item-section>
            </q-item>
            <q-item class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-input
                  disable
                  dense
                  color="negative"
                  disabled
                  filled
                  v-model="usersDetalle.dni"
                  label="DNI/C.E"
                />
              </q-item-section>
            </q-item>
            <q-item class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-input
                  dense
                  color="negative"
                  filled
                  disabled
                  v-model="usersDetalle.telefono"
                  label="Celular"
                />
              </q-item-section>
            </q-item>
            <q-item class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-input
                  dense
                  color="negative"
                  filled
                  disabled
                  v-model="usersDetalle.email"
                  value="miguekos1233@gmail.com"
                  label="Correo"
                />
              </q-item-section>
            </q-item>
            <q-item class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-input
                  dense
                  color="negative"
                  filled
                  v-model="pwd"
                  label="Nuevo Password"
                />
              </q-item-section>
            </q-item>
            <q-item class="justify-center">
              <q-item-section class="text-center text-bold">
                <q-btn color="negative" @click="Salir()" label="Salir" />
              </q-item-section>
              <q-item-section class="text-center text-bold">
                <q-btn color="positive" type="submit" label="Actualizar" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-item-label>
      </q-form>
    </q-list>
    <q-dialog v-model="alert">
      <q-card>
        <q-uploader
          color="negative"
          square
          flat
          bordered
          accept=".jpg, image/*"
          :factory="factoryFn"
          style="max-width: 300px"
          @rejected="onRejected"
        />

        <!-- <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>-->
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { axiosInstanceImagen } from "boot/axios";
import { mapState, mapActions, mapGetters } from "vuex";
import { LocalStorage } from "quasar";

export default {
  computed: {
    ...mapGetters("users", ["getUserOne"]),
    urlImagen() {
      // return `${this.infoUrl}/uploads/${profile}`;
      // return `https://api.apps.com.pe/fileserver/uploads/${this.$store.state.users.UsersOne.profile}`;
    }
  },
  data() {
    return {
      infoUrl: "",
      alert: false,
      file: [],
      usersDetalle: [],
      text: "",
      _id: null,
      name: "",
      email: "",
      dni: "",
      telefono: "",
      pwd: "",
      selected_file: "",
      check_if_document_upload: false,
      mobileData: true,
      bluetooth: false
    };
  },
  methods: {
    ...mapActions("users", ["callUserOne", "updateUser", "updateImage"]),
    onRejected(rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: "negative",
        message: `el archivo debe ser una iamgen`
      });
    },
    Salir() {
      this.$router.push("/");
    },
    async onSubmit() {
      let jsonUpdate = {
        ...this.usersDetalle,
        pwd: this.pwd ? this.pwd : ""
      };
      // console.log(jsonUpdate);
      await this.updateUser(jsonUpdate)
        .then(resp => {
          this.$q.notify({
            message: "¡Se actualizo tu perfil correctamente!",
            position: "top",
            color: "green-5"
          });
        })
        .catch(err => {
          // console.log(err);
          this.$q.notify({
            message: "¡Oh oh, no pudimos actualizar",
            position: "top",
            color: "red-5"
          });
        });
    },
    async updateFoto(arg) {
      let idUser = LocalStorage.getAll().idUser;
      let jsonUpdate = {
        profile: arg,
        _id: this.$route.params.id
      };
      // console.log(jsonUpdate);
      this.updateImage(jsonUpdate)
        .then(async resp => {
          // console.log("antes de actualizar");
          this.alert = false;
          this.$q.notify({
            message: "¡Se actualizo tu foto de perfil!",
            position: "top",
            color: "green-5"
          });
          this.callUserOne(this.$route.params.id);
          if (idUser == this.$route.params.id) {
            LocalStorage.remove("UserDetalle");
            setTimeout(() => {
              LocalStorage.set("UserDetalle", this.getUserOne);
            }, 1000);
          } else {
            console.log("Se actualizo");
          }
        })
        .catch(err => {
          // console.log(err);
          this.$q.notify({
            message: "¡Oh oh, no pudimos actualizar",
            position: "top",
            color: "red-5"
          });
        });
    },
    ordenarCampos() {
      this.usersDetalle = {
        ...this.getUserOne
      };
    },
    factoryFnNew(file) {
      return new Promise((resolve, reject) => {
        // Retrieve JWT token from your store.
        // const token = "myToken";
        var formData = new FormData();
        // var imagefile = document.querySelector("#file");
        formData.append("file", file[0]);
        console.log(formData);
        resolve({
          url: "http://192.168.0.34:9876/fileserver/fileupload",
          method: "POST",
          headers: [{ name: "Content-Type", value: "multipart/form-data" }],
          formData
        });
      });
    },
    factoryFn(file) {
      // console.log(file);
      let total;
      var formData = new FormData();
      // var imagefile = document.querySelector("#file");
      formData.append("file", file[0]);
      console.log(formData);
      axiosInstanceImagen
        .post("/fileupload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(resp => {
          console.log(resp.data);
          total = resp.data;
          // this.updateFoto(total);
        })
        .catch(err => {
          // console.log(err);
          total = err;
        });
    }
  },
  async created() {
    this._id = this.$route.params.id;
    // console.log(this.$route.params.id);
    await this.callUserOne(this.$route.params.id);
    await this.ordenarCampos();
    this.infoUrl = process.env.Imagen_URL;
  }
};
</script>

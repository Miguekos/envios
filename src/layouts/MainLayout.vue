<template>
  <div class="my-font principal">
    <q-layout view="lHh Lpr lFf">
      <q-header elevated class="headercustom">
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            color="white"
            icon="menu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />

          <q-toolbar-title class="text-white">
            Envios
          </q-toolbar-title>

          <div class="text-white">v{{ $q.version }}</div>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-1">
        <q-list>
          <q-item-label header class="text-grey-8">
            <q-item-label header class="text-center text-h6 q-pa-xs"
              >Profile
            </q-item-label>
            <q-separator spaced />
            <q-list>
              <q-item
                @click="detalleCliente()"
                clickable
                v-ripple
                class="justify-center"
              >
                <q-avatar size="100px" font-size="52px">
                  <!--                                <img :src="urlImagen" />-->
                  <img
                    src="https://api.apps.com.pe/fileserver/uploads/boy-avatar.png"
                  />
                </q-avatar>
              </q-item>
              <q-item clickable v-ripple class="justify-center">
                <q-item-section class="text-center text-bold">
                  <!--                <q-item-label>{{ userdatil.name }}</q-item-label>-->
                  <q-item-label>{{ this.dataLocal.name }}</q-item-label>
                  <!--                <q-item-label caption>{{ userdatil.email }}</q-item-label>-->
                  <q-item-label caption>{{
                    this.dataLocal.email
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-item-label>
          <EssentialLink
            v-if="rolLocal === '1'"
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
          <EssentialLink
            v-if="rolLocal === '2'"
            v-for="link in essentialLinksUser"
            :key="link.title"
            v-bind="link"
          />
          <!--        <EssentialLink-->
          <!--          v-if="role == 1"-->
          <!--          v-for="link in essentialLinks"-->
          <!--          :key="link.title"-->
          <!--          v-bind="link"-->
          <!--        />-->
          <!--        <EssentialLink-->
          <!--          v-if="role == 2"-->
          <!--          v-for="link in essentialLinksUser"-->
          <!--          :key="link.title"-->
          <!--          v-bind="link"-->
          <!--        />-->
          <q-item clickable tag="a" @click="Logout()">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Salir</q-item-label>
              <q-item-label caption>Cerar sesíon</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <!--    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-1">-->
      <!--      <q-list>-->
      <!--        <q-item-label header class="text-center text-black bg-grey-1">-->
      <!--          Menu-->
      <!--        </q-item-label>-->
      <!--        <EssentialLink-->
      <!--          v-for="link in essentialLinks"-->
      <!--          :key="link.title"-->
      <!--          v-bind="link"-->
      <!--        />-->
      <!--      </q-list>-->
      <!--    </q-drawer>-->

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import detalleDeLosUsuarios from "components/DetalleGeneral";
import { LocalStorage } from "quasar";
import EssentialLink from "components/EssentialLink";
import { storagelocal } from "../mixins/mixin";

export default {
  name: "MainLayout",
  mixins: [storagelocal],
  components: {
    EssentialLink
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: "Dashboard",
          // caption: "quasar.dev",
          icon: "dashboard",
          link: "/"
        },
        {
          title: "Registrar",
          // caption: "quasar.dev",
          icon: "note_add",
          link: "/registrar"
        },
        {
          title: "Registros",
          // caption: "github.com/quasarframework",
          icon: "assignment",
          link: "/registros"
        },
        {
          title: "Mantenimientos",
          // caption: "github.com/quasarframework",
          icon: "receipt",
          link: "/mantenimiento"
        },
        {
          title: "Usuarios",
          // caption: "github.com/quasarframework",
          icon: "group",
          link: "/usuarios"
        },
        {
          title: "Asignar por QR",
          // caption: "github.com/quasarframework",
          icon: "compare",
          link: "/readqr"
        },
        {
          title: "Filtros",
          // caption: "github.com/quasarframework",
          icon: "find_in_page",
          link: "/filtro"
        }
      ],
      essentialLinksUser: [
        {
          title: "Seguimiento",
          // caption: "github.com/quasarframework",
          icon: "commute",
          link: "/seguimiento"
        }
      ]
    };
  },
  methods: {
    Logout() {
      this.$q.loading.show();
      LocalStorage.clear();
      // setTimeout(() => {
      this.$router.push("/auth");
      this.$q.notify({
        // progress: true,
        message: "Regresa pronto",
        // icon: "favorite_border",
        // icon: "favorite",
        color: "white",
        textColor: "primary",
        position: "top"
      });
      this.$q.loading.hide();
      // }, 2000);
    }
  }
};
</script>
<style>
.principal {
  /*background-image: linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%);*/
  /*background-image: linear-gradient(*/
  /*  -225deg,*/
  /*  #7085b6 0%,*/
  /*  #87a7d9 50%,*/
  /*  #def3f8 100%*/
  /*);*/
  /*background-image: linear-gradient(*/
  /*  -225deg,*/
  /*  #7085b6 0%,*/
  /*  #87a7d9 50%,*/
  /*  #def3f8 100%*/
  /*);*/
  background-image: linear-gradient(
    -200deg,
    #ffffff 40%,
    #9abbee 60%,
    #def3f8 100%
  );
}
</style>

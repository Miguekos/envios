<template>
  <div class="q-pa-md">
    <q-form @submit="agregar">
      <q-list>
        <q-item>
          <q-item-section>
            <q-input
              dense
              filled
              v-model="name"
              color="white"
              autofocus
              label="Proveedor"
            ></q-input>
          </q-item-section>
          <q-item-section side>
            <q-btn color="green" type="submit" label="Agregar"></q-btn>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <TablaMantenimiento @borrar="borrar" :info="getProvee" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Index.vue",
  components: {
    TablaMantenimiento: () => import("components/TablaMantenimiento")
  },
  data() {
    return {
      name: ""
    };
  },
  computed: {
    ...mapGetters("mante", ["getProvee"])
  },
  methods: {
    ...mapActions("mante", ["callProvee", "addProvee", "delProvee"]),
    async agregar() {
      await this.addProvee({
        name: this.name
      });
      await this.callProvee();
      this.name = "";
    },
    async borrar(val) {
      // console.log(val);
      await this.delProvee(val.id_);
      await this.callProvee();
    }
  },
  async created() {
    await this.callProvee();
  }
};
</script>

<style scoped></style>

<template>
  <div class="">
    {{ filtrosNuevos }}
    <div class="row q-gutter-xs q-pb-sm">
      <div class="col-12 col-md">
        <q-input
          color="white"
          dense
          filled
          v-model="keyword"
          label="Buscar por nombre"
        />
      </div>
      <div class="col-12 col-md">
        <q-input
          color="white"
          dense
          filled
          v-model="findID"
          label="Buscar por ID"
        />
      </div>
      <div class="col-12 col-md">
        <q-select
          color="white"
          filled
          clearable
          dense
          v-model="citys"
          :options="city_unique"
          label="Tipo de pago"
        >
        </q-select>
      </div>
      <div class="col-12 col-md">
        <q-select
          color="white"
          filled
          clearable
          dense
          v-model="statuss"
          :options="status_unique"
          label="Comuna"
        >
        </q-select>
      </div>
      <div class="col-12 col-md">
        <q-select
          color="white"
          filled
          clearable
          dense
          v-model="payment_method_titles"
          :options="payment_method_title_unique"
          label="Proveedores"
        >
        </q-select>
      </div>
      <div v-if="activar" class="col-12 col-md">
        <q-select
          color="white"
          filled
          clearable
          dense
          map-options
          emit-value
          v-model="mobils"
          :options="getUsers"
          option-label="name"
          option-value="dni"
          label="Mobiles"
        >
        </q-select>
      </div>
      <div class="col-12 col-md">
        <q-btn @click="asigMasivo()" color="grey-10" class="full-width">
          Asignar
        </q-btn>
      </div>
    </div>
    <q-table
      flat
      :data="filteredByAll"
      :columns="columns"
      row-key="created_at"
      selection="multiple"
      :selected-rows-label="getSelectedString"
      :selected.sync="selected"
      :pagination="initialPagination"
      rows-per-page-label=" "
    >
      <template v-slot:body-cell="props">
        <q-td :props="props" class="cursor-pointer" @click="editar(props.row)">
          {{ props.value }}
          <!--          <q-badge color="blue" :label="props.value" />-->
        </q-td>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> Oh oh, no hay registros que mostrar...</span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>
    </q-table>
    <!--    <div class="q-mt-md">selected: {{ JSON.stringify(selected) }}</div>-->
    <DialogAsing :select="selected" ref="dialogasing" />
    <div>
      <DialogDetalle :detalleData="detalleData" ref="activacion" />
    </div>
    <div>
      <Imprimir
        @click="onReset()"
        :info="jsonEnviar"
        :idRegistro="idRegistro"
        ref="imprimir"
      />
    </div>
    <q-dialog v-model="opciones">
      <q-card>
        <q-list separator>
          <q-item class="q-pa-md q-gutter-md">
            <q-item-section>
              <q-btn @click="reimprimir()" label="imprimir"></q-btn>
            </q-item-section>
            <!--            <q-item-section side>-->
            <!--              <q-btn @click="updateregistro()" label="editar"></q-btn>-->
            <!--            </q-item-section>-->
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
    <q-dialog v-model="editarinfo">
      <q-card>
        <EditarRegistro :info="jsonEnviar" :idRegistro="idRegistro" />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { myMixin } from "../../mixins/mixin.js";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "TablaDetalle",
  props: {
    info: Array,
    activar: Boolean,
    accionTabla: Boolean,
    asignar: Boolean
    // title: String,
    // likes: Number,
    // isPublished: Boolean,
    // commentIds: Array,
    // author: Object
  },
  // props: ["info"],
  mixins: [myMixin],
  components: {
    EditarRegistro: () => import("pages/Registro/EditarRegistro"),
    DialogDetalle: () => import("../../components/detallePaquete"),
    DialogAsing: () => import("../../components/DialogAsignar"),
    Imprimir: () => import("components/Imprimir")
  },
  computed: {
    ...mapGetters("users", ["getUsers"]),
    ...mapState("registros", ["setSelectAsung"]),
    selectMasivo: {
      get() {
        return this.setSelectAsung;
      },
      set(val) {
        this.setSelect(val);
        console.log(val);
      }
    },
    filtrosNuevos() {
      // console.log("NUevos filtros", this.filteredByAll);
      const array = this.filteredByAll;
      this.status = [];
      this.city = [];
      this.mobil = [];
      this.payment_method_title = [];
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        this.status.push(element.comuna);
        this.city.push(element.tipodepago);
        this.mobil.push(element.responsable);
        this.payment_method_title.push(element.proveedores);
      }
    },
    filteredByAll() {
      const keyw = this.getByKeyword(this.info, this.keyword),
        keyid = this.getById(keyw, this.findID),
        stat = this.getByStatus(keyid, this.statuss),
        cunt = this.getByCity(stat, this.citys),
        mobiles = this.getByMobil(cunt, this.mobils),
        metPago = this.getByPayment_method_title(
          mobiles,
          this.payment_method_titles
        );
      return metPago;
    },
    status_unique() {
      return [...new Set(this.status)];
    },
    city_unique() {
      return [...new Set(this.city)];
    },
    payment_method_title_unique() {
      return [...new Set(this.payment_method_title)];
    },
    mobiles_unique() {
      return [...new Set(this.mobil)];
    }
  },
  data() {
    return {
      infoDate: [],
      editarinfo: false,
      opciones: false,
      jsonEnviar: [],
      idRegistro: null,
      detalleData: "",
      selected: [],
      city: [],
      citys: "",
      mobil: [],
      mobils: "",
      payment_method_title: [],
      payment_method_titles: "",
      keyword: "",
      findID: "",
      detalleInfo: [],
      status: [],
      statuss: "",
      inception: false,
      filter: "",
      loading: false,
      dateIni: "",
      dateFin: ""
    };
  },
  methods: {
    ...mapActions("users", ["callUser"]),
    ...mapActions("registros", ["setSelect"]),
    editar(val) {
      console.log(val);
      this.jsonEnviar = val;
      this.idRegistro = val.registro;
      if (this.accionTabla) {
        this.opciones = true;
      }
      // this.$refs.imprimir.activar();
    },
    onReset() {},
    reimprimir() {
      // console.log(val);
      // this.jsonEnviar = val;
      // this.idRegistro = val.registro;
      this.$refs.imprimir.activar();
    },
    updateregistro() {
      this.editarinfo = true;
    },
    detallePaquete(val) {
      console.log(val);
      this.detalleData = val;
      this.$refs.dialogasing.activarDialog(val);
      // this.$refs.activacion.activarDialog();
    },
    async asigMasivo() {
      // this.detalleData = val;
      if (this.asignar) {
        this.$refs.dialogasing.activarDialog();
      }
    },
    toggleSelectedRow(val) {
      if (this.selected.length > 0) {
        let i = 0;
        const matched = this.selected.find((item, index) => {
          i = index;
          return item.registro === val.registro;
        });
        if (matched) {
          this.selected.splice(i, 1);
        } else {
          this.selected.push(val);
        }
      } else {
        this.selected.push(val);
      }
    },
    tappedRow(arg) {
      console.log(arg);
    },
    onRowClick(evt, row) {
      console.log("clicked on", evt, row);
    },
    getSelectedString() {
      return this.selected.length === 0
        ? ""
        : `${this.selected.length} record${
            this.selected.length > 1 ? "s" : ""
          } selected of ${this.data.length}`;
    },
    getByKeyword(list, keyword) {
      const search = keyword.trim().toLowerCase();
      // console.log(search);
      if (!search.length) return list;
      return list.filter(item => item.name.toLowerCase().indexOf(search) > -1);
    },
    getById(list, id) {
      const search = id.toString();
      // console.log(search);
      if (!search.length) return list;
      // return list.filter(item => item.registro == id);
      return list.filter(item => item.registro.toString().toLowerCase().indexOf(search) > -1);
      // return list.filter((id) => id > 0 && id % parseInt(id) === 0 ).map( (id) => Math.pow(id, 5));
    },
    getByStatus(list, status) {
      if (!status) return list;
      return list.filter(item => item.comuna === status);
    },
    getByCity(list, city) {
      if (!city) return list;
      return list.filter(item => item.tipodepago === city);
    },
    getByMobil(list, mobil) {
      if (!mobil) return list;
      return list.filter(item => item.responsable === mobil);
    },
    getByPayment_method_title(list, paymentmt) {
      if (!paymentmt) return list;
      return list.filter(item => item.proveedores === paymentmt);
    }
  },
  async created() {
    await this.callUser();
  }
};
</script>

<style scoped></style>

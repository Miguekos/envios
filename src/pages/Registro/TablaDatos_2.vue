<template>
  <div class="q-pa-xs">
    <q-list>
      <q-item>
        <q-item-section>
          <q-input label="Buscar"></q-input>
        </q-item-section>
        <q-item-section class="transparent">
          <q-input dense outlined v-model="dateIni" mask="date">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxyIni"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="dateIni"
                    @input="() => $refs.qDateProxyIni.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-item-section>
        <q-item-section>
          <q-input dense outlined v-model="dateFin" mask="date">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxyFin"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="dateFin"
                    @input="() => $refs.qDateProxyFin.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-item-section>
        <q-item-section>
          <q-btn outline color="indigo">filtrar</q-btn>
        </q-item-section>
      </q-item>
    </q-list>
    <q-table
      flat
      class="transparent"
      :data="info"
      :columns="columns"
      row-key="registro"
      selection="multiple"
      :selected-rows-label="getSelectedString"
      :selected.sync="selected"
      :pagination="initialPagination"
    >
      <template v-slot:body-cell="props">
        <q-td
          :props="props"
          class="cursor-pointer"
          @click="detallePaquete(props.row)"
        >
          {{ props.value }}
          <!--          <q-badge color="blue" :label="props.value" />-->
        </q-td>
      </template>
    </q-table>
    <!--    <div class="q-mt-md">Selected: {{ JSON.stringify(selected) }}</div>-->
    <DialogAsing ref="dialogasing" />
    <div>
      <DialogDetalle :detalleData="detalleData" ref="activacion" />
    </div>
  </div>
</template>

<script>
import { myMixin } from "../../mixins/mixin.js";
export default {
  name: "TablaDetalle",
  props: {
    info: Array
    // title: String,
    // likes: Number,
    // isPublished: Boolean,
    // commentIds: Array,
    // author: Object
  },
  // props: ["info"],
  mixins: [myMixin],
  components: {
    DialogDetalle: () => import("../../components/detallePaquete"),
    DialogAsing: () => import("../../components/DialogAsignar")
  },
  data() {
    return {
      detalleData: "",
      selected: [],
      dateIni: "",
      dateFin: ""
    };
  },
  methods: {
    detallePaquete(val) {
      console.log(val);
      this.detalleData = val;
      this.$refs.dialogasing.activarDialog(val);
      // this.$refs.activacion.activarDialog();
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
    }
  }
};
</script>

<style scoped></style>

<template>
  <div class="q-pa-xs">
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
      selected: []
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

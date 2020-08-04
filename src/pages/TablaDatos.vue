<template>
  <div class="q-pa-md">
    <q-table
      title="Registros"
      :data="getRegistros"
      :columns="columns"
      row-key="id"
      binary-state-sort
      :pagination.sync="pagination"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("registros", ["getRegistros"])
  },
  data() {
    return {
      filter: "",
      pagination: {
        sortBy: "registro",
        descending: false,
        page: 1,
        rowsPerPage: 10
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          field: row => row.registro,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "nombre",
          align: "center",
          label: "Nombre",
          field: "nombre",
          sortable: true
        },
        {
          name: "apellido",
          label: "Apellido",
          field: "apellido",
          sortable: true,
          align: "left",
          style: "width: 10px"
        },
        { name: "telf", label: "Telf", align: "left", field: "telf" },
        {
          name: "direccion",
          align: "left",
          label: "Direccion",
          field: "direccion"
        },
        { name: "comuna", label: "Comuna", align: "left", field: "comuna" },
        {
          name: "provee",
          label: "Proveedor",
          field: "provee",
          align: "left",
          sortable: true
        },
        {
          name: "valordeflete",
          label: "Valor flete",
          field: "valordeflete",
          align: "left",
          sortable: true
        }
      ],
      data: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%"
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: "0%",
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: "0%",
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: "2%",
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%"
        }
      ]
    };
  },
  methods: {
    ...mapActions("registros", ["callRegistros"])
  },
  async created() {
    await this.callRegistros();
  }
};
</script>

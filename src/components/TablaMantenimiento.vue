<template>
  <div>
    <q-table :data="info" :columns="columns" row-key="name">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="registro" :props="props">
            <q-badge color="green">
              {{ props.row.registro }}
            </q-badge>
          </q-td>
          <q-td key="fat" :props="props">
            <q-btn
              @click="borrar(props.row)"
              icon="delete"
              color="red"
              size="sm"
              round
            ></q-btn>
          </q-td>
        </q-tr> </template
    ></q-table>
  </div>
</template>

<script>
export default {
  props: {
    info: Array
  },
  name: "TablaMantenimiento",
  data() {
    return {
      columns: [
        {
          name: "name",
          required: true,
          label: "Nombre",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
          classes: "bg-grey-2 ellipsis",
          style: "max-width: 100px",
          headerClasses: "bg-primary text-white"
        },
        {
          name: "registro",
          align: "center",
          label: "Registro",
          field: "registro",
          sortable: true
        },
        {
          name: "fat",
          align: "center",
          label: "Acciones",
          field: "fat",
          sortable: true
        }
      ],
      data: []
    };
  },
  methods: {
    borrar(val) {
      this.$emit("borrar", val);
    }
  }
};
</script>

<style scoped></style>

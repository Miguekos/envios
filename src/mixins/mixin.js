// Define un objeto _mixin_
import { Fechas } from "../directives/formatFecha";
const myMixin = {
  data() {
    return {
      initialPagination: {
        sortBy: "created_at",
        descending: true,
        page: 1,
        rowsPerPage: 5
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          field: row => `${parseInt(row.registro)}`,
          format: val => `${parseInt(val)}`,
          classes: "bg-grey-2 ellipsis",
          style: "max-width: 100px",
          headerClasses: "bg-primary text-white",
          sortable: true
        },
        {
          name: "name",
          align: "left",
          label: "Nombres",
          field: row => `${row.name} ${row.lastname}`,
          format: val => `${val}`
        },
        {
          name: "comuna",
          align: "left",
          label: "Comuna",
          field: "comuna",
          sortable: true
        },
        {
          name: "control",
          align: "left",
          label: "Control",
          field: "control",
          sortable: true
        },
        {
          name: "valordeflete",
          align: "left",
          label: "Valor F",
          field: "valordeflete",
          sortable: true
        },
        {
          name: "proveedores",
          align: "center",
          label: "Proveedor",
          field: "proveedores"
        },
        // {
        //   name: "estado",
        //   align: "center",
        //   label: "Estado",
        //   field: row => `${this.parsearNombre(row.estado)}`
        // },
        {
          name: "created_at",
          align: "right",
          label: "Fecha Registro",
          field: row => this.activar ? row.last_modified : row.created_at,
          format: (val, row) => `${Fechas.larga(val)}`,
          sortable: true
        }
      ],
      data: []
    };
  },
  created: function() {
    // this.hello();
  },
  methods: {
    parsearNombre(arg) {
      // console.log(arg);
      let nombre = "";
      if (arg === "0") {
        nombre = "Sin Asignar";
      }
      if (arg === "1") {
        nombre = "Asignados";
      }
      if (arg === "2") {
        nombre = "Entregados";
      }
      if (arg === "3") {
        nombre = "Devueltos";
      }
      if (arg === "4") {
        nombre = "Proveedorr";
      }
      return nombre;
    },
    hello: function() {
      console.log("hello from mixin!");
    }
  }
};

const myMixinRegistro = {
  data() {
    return {
      pagination: {
        sortBy: "registro",
        descending: false,
        page: 1,
        rowsPerPage: 8
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
          field: "name",
          sortable: true
        },
        {
          name: "apellido",
          label: "Apellido",
          field: "lastname",
          sortable: true,
          align: "left",
          style: "width: 10px"
        },
        { name: "telf", label: "Telf", align: "left", field: "telf" },
        {
          name: "estado",
          align: "left",
          label: "Estado",
          field: row => this.parsearNombre(row.estado)
        },
        { name: "comuna", label: "Comuna", align: "left", field: "comuna" },
        {
          name: "provee",
          label: "Proveedor",
          field: "proveedores",
          align: "left",
          sortable: true
        },
        {
          name: "valordeflete",
          label: "Valor flete",
          field: "valordeflete",
          align: "left",
          sortable: true
        },
        {
          name: "responsable",
          label: "Responsable",
          field: "responsable",
          align: "left",
          sortable: true
        },
        {
          name: "boton",
          label: "Accion",
          field: "boton",
          align: "center",
          sortable: true
        }
      ]
    };
  },
  created: function() {
    // this.hello();
  },
  methods: {
    parsearNombre(arg) {
      console.log(arg);
      let nombre = "";
      if (arg === "0") {
        nombre = "En bodega";
      }
      if (arg === "1") {
        nombre = "Asignados";
      }
      if (arg === "2") {
        nombre = "Entregados";
      }
      if (arg === "3") {
        nombre = "Borrados";
      }
      if (arg === "4") {
        nombre = "Proveedorr";
      }
      return nombre;
    }
  }
};

const MixinDefault = {
  data() {
    return {
      optionsDeEstados: [
        {
          label: "En bodega",
          value: "0"
        },
        {
          label: "Asignados",
          value: "1"
        },
        {
          label: "Entregados",
          value: "2"
        },
        {
          label: "Borrados",
          value: "3"
        }
      ]
    };
  },
  created: function() {
    // this.hello();
  },
  methods: {
    fullName: function() {
      if (this.tab === "sinasingnar") {
        this.obtenerRegistros(0);
      }
      if (this.tab === "asignados") {
        this.obtenerRegistros(1);
      }
      if (this.tab === "entregados") {
        this.obtenerRegistros(2);
      }
      if (this.tab === "devuelto") {
        this.obtenerRegistros(3);
      }
      if (this.tab === "proveedor") {
        this.obtenerRegistros(4);
      }
      console.log(this.tab);
      return this.tab;
    },
    noti(val) {
      if (val === 1) {
        this.$q.notify({
          message: "Se actualizo correctamente",
          color: "white",
          textColor: "primary",
          position: "top"
        });
      }
      if (val === 2) {
        this.$q.notify({
          message: "Ya esta asignado a este usuario",
          color: "white",
          textColor: "primary",
          position: "top"
        });
      }
      if (val === 3) {
        this.$q.notify({
          message: "Oh oh, algo salio mal",
          color: "white",
          textColor: "red-5",
          position: "top"
        });
      }
      if (val === 4) {
        this.$q.notify({
          message: "No puedes dejar campos vacios",
          color: "white",
          textColor: "red-5",
          position: "top"
        });
      }
    },
    formatEstados(val) {
      let nombre = "";
      if (val === "0") {
        nombre = "En bodega";
      }
      if (val === "1") {
        nombre = "Asignados";
      }
      if (val === "2") {
        nombre = "Entregados";
      }
      if (val === "3") {
        nombre = "Borrados";
      }
      if (val === "4") {
        nombre = "Proveedorr";
      }
      return nombre;
    },
    formatFecha(val) {
      return Fechas.larga(val);
    }
  }
};

const storagelocal = {
  data() {
    return {
      dataLocal: null,
      idLocal: null,
      rolLocal: null
    };
  },
  created: function() {
    const todo = this.$q.localStorage.getAll();
    this.idLocal = todo.idUser;
    this.dataLocal = todo.UserDetalle;
    this.rolLocal = todo.role;
  },
  methods: {}
};

export { myMixin, myMixinRegistro, MixinDefault, storagelocal };

<template>
  <div class="q-pa-xs">
    <q-form @submit="agregar">
      <q-list>
        <q-item>
          <q-item-section>
            <q-input dense filled v-model="name" color="white" autofocus label="Buscar por ID"></q-input>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-select
              dense
              filled
              v-model="model"
              :options="options"
              option-label="name"
              option-value="value"
              map-options
              emit-value
            />
          </q-item-section>
          <q-item-section>
            <q-btn color="green" type="submit" label="Buscar"></q-btn>
          </q-item-section>
        </q-item>
        <!-- {{getFindId}} -->
        <q-item>
          <q-item-section>
            <q-card>
              <!-- <q-list v-if="getFindId" separator bordered>
                <q-item>
                  <q-item-section class="text-primary">Nombre:</q-item-section>
                  <q-item-section>{{getFindId.registro}}</q-item-section>
                  <q-item-section class="text-primary">Apellido</q-item-section>
                  <q-item-section>{{getFindId.lastname}}</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section class="text-primary">Comuna:</q-item-section>
                  <q-item-section>{{getFindId.comuna}}</q-item-section>
                  <q-item-section class="text-primary">Telefono</q-item-section>
                  <q-item-section>{{getFindId.telf}}</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section class="text-primary">Direccion:</q-item-section>
                  <q-item-section>{{getFindId.direccion}}</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section class="text-primary">Tipo de Pago:</q-item-section>
                  <q-item-section>{{getFindId.tipodepago}}</q-item-section>
                  <q-item-section class="text-primary">Control</q-item-section>
                  <q-item-section>{{getFindId.control}}</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section class="text-primary">Valor de Flete:</q-item-section>
                  <q-item-section>{{getFindId.valordeflete}}</q-item-section>
                  <q-item-section class="text-primary">Proveedor</q-item-section>
                  <q-item-section>{{getFindId.proveedores}}</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section class="text-primary">Responsable:</q-item-section>
                  <q-item-section>{{getFindId.responsable_name}}</q-item-section>
                  <q-item-section class="text-primary">Fecha Ingreso</q-item-section>
                  <q-item-section>{{getFindId.created_at}}</q-item-section>
                </q-item>
              </q-list>-->
              <q-table
                class="full-width colum"
                :pagination="initialPagination"
                grid
                :data="info"
                :columns="columns"
                row-key="name"
                hide-bottom
                dense
              >
                <template v-slot:item="props">
                  <div class="q-pa-xs col-xs-12 col-sm-12 col-md-12">
                    <q-list separator bordered>
                      <q-item>
                        <q-item-section class="text-primary">Nombre:</q-item-section>
                        <q-item-section>{{props.row.name}}</q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section class="text-primary">Apellido</q-item-section>
                        <q-item-section>{{props.row.lastname}}</q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section class="text-primary">Comuna:</q-item-section>
                        <q-item-section>{{props.row.comuna}}</q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section class="text-primary">Telefono</q-item-section>
                        <q-item-section>{{props.row.telf}}</q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section class="text-primary">Direccion:</q-item-section>
                        <q-item-section>{{props.row.direccion}}</q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section class="text-primary">Tipo de Pago:</q-item-section>
                        <q-item-section>{{props.row.tipodepago}}</q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section class="text-primary">Control</q-item-section>
                        <q-item-section>{{props.row.control}}</q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section class="text-primary">Valor de Flete:</q-item-section>
                        <q-item-section>{{props.row.valordeflete}}</q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section class="text-primary">Proveedor</q-item-section>
                        <q-item-section>{{props.row.proveedores}}</q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section class="text-primary">Estado</q-item-section>
                        <q-item-section>{{ formatEstados(props.row.estado)}}</q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section class="text-primary">Asignado a:</q-item-section>
                        <q-item-section v-if="props.row.responsable_name">{{props.row.responsable_name}}</q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section class="text-primary">Fecha Ingreso</q-item-section>
                        <q-item-section v-if="props.row.created_at">{{ formatFecha(props.row.created_at)}}</q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section class="text-primary">Modificado por:</q-item-section>
                        <q-item-section v-if="props.row.modificado">{{props.row.modificado}} - DNI: {{props.row.modificado_dni}}</q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section class="text-primary">Fecha de asignado</q-item-section>
                        <q-item-section v-if="props.row.last_modified">{{ formatFecha(props.row.last_modified)}}</q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </template>
              </q-table>
            </q-card>
          </q-item-section>
        </q-item>
      </q-list>
    </q-form>
  </div>
</template>

<script>
import { MixinDefault } from "../../mixins/mixin.js";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "IndexFiltros",
  components: {
    TablaMantenimiento: () => import("components/TablaMantenimiento")
  },
  computed: {},
  mixins:[MixinDefault],
  data() {
    return {
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 1
        // rowsNumber: xx if getting data from a server
      },
      name: "",
      model: 1,
      options: [
        {
          name: "ID",
          value: 1
        },
        {
          name: "Control",
          value: 2
        }
      ],
      columns: [
        {
          name: "name",
          required: true,
          label: "Nombre",
          align: "left",
          field: row => `${row.name} ${row.lastname}`,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "comuna",
          align: "left",
          label: "Comuna",
          field: "comuna",
          sortable: true
        },
        {
          name: "telf",
          label: "Telefono",
          align: "left",
          field: "telf",
          sortable: true
        },
        {
          name: "direccion",
          label: "Direccion",
          align: "left",
          field: "direccion"
        },
        {
          name: "tipodepago",
          label: "Tipo de Pago",
          align: "left",
          field: "tipodepago"
        },
        {
          name: "valordeflete",
          label: "Valor de Flete",
          align: "left",
          field: "valordeflete"
        },
        {
          name: "proveedores",
          label: "Proveedor",
          align: "left",
          field: "proveedores",
          sortable: true
        },
        {
          name: "responsable_name",
          label: "Responsable",
          align: "left",
          field: "responsable_name",
          sortable: true
        },
        {
          name: "created_at",
          label: "Fecha Ingreso",
          align: "left",
          field: "created_at",
          sortable: true
        }
      ],
      info: []
    };
  },
  computed: {
    ...mapGetters("mante", ["getFindId"])
  },
  methods: {
    ...mapActions("mante", ["callFindId"]),
    async agregar() {
      try {
        this.info = [];
        await this.callFindId({
          tipo: this.model,
          id: this.name
        });
        this.info.push(this.getFindId);
        this.name = "";
      } catch (e) {
        this.name = "";
        this.$q.notify({
          message: `No se encontro resultados ${e}`
        });
      }
    }
  },
  async created() {}
};
</script>

<style scoped>
</style>

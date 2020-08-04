<template>
  <div id="chart" class="q-pt-md">
    <apex-chart
      type="bar"
      height="240"
      :options="chartOptions"
      :series="series"
    ></apex-chart>
  </div>
</template>
<script type="text/babel">
import { mapGetters, mapActions, mapState } from "vuex";
// import VueApexCharts from "boot/vueApexCharts";
export default {
  props: ["info"],
  data() {
    return {
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
        {
          name: "Free Cash Flow",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: [
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct"
          ]
        },
        yaxis: {
          title: {
            text: "$ (thousands)"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return "$ " + val + " thousands";
            }
          }
        }
      }
    };
  },
  computed: {
    ...mapGetters("client", ["getClienteReport", "getClientes"])
  },
  methods: {
    ...mapActions("client", ["callClienteReport", "callCliente"])
  },
  async created() {
    await this.callClienteReport();
    // setTimeout(() => {
    // this.$q.loading.show();
    this.series = [
      {
        name: "Personas sanas",
        data: this.getClienteReport.graficSeriaS
      },
      {
        name: "Personas con síntomas",
        data: this.getClienteReport.graficSeriaCS
      }
    ];
    // this.series[0].data = this.getClienteReport.graficSeriaS;
    // this.series[1].data = this.getClienteReport.graficSeriaCS;

    this.chartOptions.xaxis = {
      type: "String",
      categories: this.getClienteReport.graficDate
    };
    // this.$q.loading.hide();
    // }, 3000);
  }
};
</script>

<style scoped>
.echarts {
  width: 400px;
  height: 400px;
}
</style>

<template>
  <div>
    <!--    {{chartOptions}}-->
    <apex-chart
      type="line"
      width="98%"
      :height="largo"
      :options="chartOptions"
      :series="series"
    ></apex-chart>
  </div>
</template>

<script>
export default {
  props: [
    "total_pagado",
    "total_por_pagado",
    "total_registro",
    "fecha",
    "largo",
    "name"
  ],
  name: "ApexHistorico",
  data() {
    return {
      series: [
        {
          name: "Pagados",
          type: "column",
          data: this.total_pagado
        },
        {
          name: "Por pagar",
          type: "area",
          data: this.total_por_pagado
        },
        {
          name: "Registros",
          type: "line",
          data: this.total_registro
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          stacked: false
        },
        stroke: {
          width: [2, 2, 5],
          curve: "smooth",
          show: true
        },
        theme: {
          palette: "palette1" // upto palette10
        },
        grid: {
          row: {
            colors: ["#fff", "#f2f2f2"]
          }
        },
        plotOptions: {
          bar: {
            columnWidth: "50%",
            endingShape: "rounded"
          }
        },
        fill: {
          // type: "gradient",
          type: ["gradient", "gradient", "gradient"],
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100]
          }
        },
        labels: this.fecha,
        markers: {
          size: 0
        },
        xaxis: {
          type: "string"
        },
        yaxis: {
          title: {
            text: "Paquetes"
          },
          min: 0
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function(y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " Paquetes";
              }
              return y;
            }
          }
        }
      }
    };
  }
};
</script>

<style scoped></style>

<template>
  <div>
    <apex-chart
      type="bar"
      width="98%"
      :height="largo"
      :options="chartOptions"
      :series="series"
    ></apex-chart>
  </div>
</template>

<script>
export default {
  // props: {
  //   valor: Array,
  //   claves: Array
  // },
  props: ["valor", "claves", "largo", "name"],
  name: "ApexBar",
  data() {
    return {
      series: [
        {
          name: "Entregas",
          data: this.valor
        }
      ],
      chartOptions: {
        theme: {
          palette: "palette1" // upto palette10
        },
        chart: {
          width: "100%",
          height: 380,
          type: "bar"
        },
        // colors: ["#1c76ff"],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "45%",
            // endingShape: "rounded"
            // distributed: true
            endingShape: "rounded"
          }
        },
        stroke: {
          show: true,
          width: 2
          // colors: ["transparent"]
        },
        dataLabels: {
          enabled: false
        },
        // labels: {
        //   style: {
        //     colors: colors,
        //     fontSize: "12px"
        //   }
        // },
        grid: {
          row: {
            colors: ["#fff", "#f2f2f2"]
          }
        },
        xaxis: {
          title: {
            text: this.name
          },
          categories: this.claves
        },
        fill: {
          type: "gradient",
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
        responsive: [
          {
            breakpoint: 1000,
            options: {
              plotOptions: {
                bar: {
                  horizontal: true
                }
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      }
    };
  }
};
</script>

<style scoped></style>

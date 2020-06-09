<script>
export default {
  components: {},
  props: {
    series: {
      type: Array,
      default: function() {
        return [];
      }
    },

    timestamp_graph: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    chartOptions() {
      return {
        dataLabels: {
          enabled: false
        },

        chart: {
          height: 350,
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: true,
              zoom: true,

              zoomin: true,
              zoomout: true,
              pan: true
            },
            autoSelected: 'zoom'
          }
        },

        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: this.timestamp_graph
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          }
        }
      };
    }
  },
  mounted() {},
  methods: {}
};
</script>

<template>
  <div class="dashboard-graph">
    <apexchart 
      :options="chartOptions" 
      :series="series" 
      type="area" />
  </div>
</template>

<style lang="scss" scoped>
.hidden {
  display: block !important;
}
</style>

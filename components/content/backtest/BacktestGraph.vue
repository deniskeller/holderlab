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
      type="area"
      height="350"
    />
  </div>
</template>

<style lang="scss">
.dashboard-graph {
  position: relative;

  &__grid {
    display: flex;
    flex-wrap: wrap;
    border-right: 1px solid $grey;
    border-bottom: 1px solid $grey;
    box-sizing: border-box;
    margin-left: -1px;
  }

  &__cell {
    position: relative;
    border-top: 1px solid $grey;
    border-left: 1px solid $grey;
    box-sizing: border-box;
    width: 20%;
    @include ifdesktop {
      height: em(160px);
    }
    @include ifmobile {
      height: em(100px);
    }
  }

  &__labels {
    position: absolute;

    &_column {
      flex-direction: column-reverse;
      top: em(-14px);
      left: em(14px);
      height: 100%;
    }

    &_row {
      width: 100%;
      padding-left: 10%;
      box-sizing: border-box;
      text-align: center;
      display: flex;
      @include ifdesktop {
        bottom: 0;
      }
      @include ifmobile {
        color: $grey;
        bottom: em(-20px);
      }
    }
  }

  &__label {
    $size: 12px;
    font-size: em($size);
    width: 22%;
    box-sizing: border-box;

    &_column {
      height: 50%;
    }
  }

  &__curve {
    position: absolute;
    fill: none;
    width: 100%;
    height: 100%;
    left: 0;

    &_blue {
      stroke: $blue;
      top: 0;
    }
    &_red {
      top: em(-20px);
      stroke: $red;
    }
  }
}
</style>

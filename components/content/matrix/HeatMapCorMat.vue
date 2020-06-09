<script>
export default {
  components: {},
  props: {
    series: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      chartOptions: {
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
            colorScale: {
              ranges: [
                {
                  from: -1,
                  to: -0.7,
                  name: 'high negative',
                  color: '#5C26C8'
                },
                {
                  from: -0.699,
                  to: -0.4,
                  name: 'medium negative',
                  color: '#003BF9'
                },
                {
                  from: -0.399,
                  to: -0.1,
                  name: 'low negative ',
                  color: '#0395FF'
                },
                {
                  from: -0.099,
                  to: 0.099,
                  name: 'no correlation',
                  color: '#C4C4C4'
                },
                {
                  from: 0.1,
                  to: 0.399,
                  name: 'low positive',
                  color: '#FEC36A'
                },
                {
                  from: 0.4,
                  to: 0.699,
                  name: 'medium positive',
                  color: '#FE846A'
                },
                {
                  from: 0.7,
                  to: 1,
                  name: 'high positive',
                  color: '#E92A00'
                }
              ]
            }
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#000']
          }
        }
      }
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<template>
  <div class="dashboard-graph">
    <apexchart 
      :options="chartOptions" 
      :series="series" 
      type="heatmap" />
  </div>
</template>

<style lang="scss" scoped>
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

<script>
// import coinsData from '~/assets/data/risk-coins.json';
import RiskCoin from '~/components/content/efficient-frontier/RiskCoin';
export default {
  components: {
    RiskCoin
  },
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
      // coinsData
      chartOptions: {
        chart: {
          type: 'scatter',
          zoom: {
            enabled: true,
            type: 'xy'
          },
          animations: {
            enabled: false
            // easing: 'easeinout', // linear, easeout, easein, easeinout, swing, bounce, elastic
            // speed: 800,
            // animateGradually: {
            //   enabled: false
            // },
            // dynamicAnimation: {
            //   enabled: true,
            //   speed: 350
            // }
          }
          // markers: {

          // },
        },

        colors: ['#00E396', '#FF4560', '#FEB019', '#008FFb'],
        xaxis: {
          // floating:true,
          // min:0.0,
          // max:1.0,
          labels: {
            formatter: function(val) {
              return parseFloat(val).toFixed(1);
            }
          }
        },
        yaxis: {
          // floating:true,
          // min:0.0,
          // max:1.0,
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
  
  <div class="risk-graph">
    <apexchart 
      :options="chartOptions" 
      :series="series" 
      type="scatter" />

    <div class="risk-graph__titles-left">
      <div class="risk-graph__title risk-graph__title_grey">
        LOWER
      </div>
      <div class="risk-graph__title">
        EXPECTED RETURNS
      </div>
      <div class="risk-graph__title risk-graph__title_grey">
        HIGHER
      </div>
    </div>
    <div class="risk-graph__titles">
      <div class="risk-graph__title">
        RISK VOLATILITY
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.risk-graph {
  position: relative;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  box-sizing: border-box;

  &__titles-left {
    position: absolute;
    width: 22.2em;
    display: flex;
    justify-content: space-between;
    top: 12.45em;
    left: -11.2em;
    transform: rotate(-90deg);
    @include ifmobile {
      display: none;
    }
  }

  &__titles {
    display: flex;
    justify-content: center;

    & > div {
      margin: 0 em(6px);
    }
  }
  &__title {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
    text-transform: uppercase;

    &_grey {
      color: $grey;
    }
  }

  &__screen {
    position: relative;
    width: em(600px);
    height: em(480px);
    padding-left: 1px;
  }

  &__area {
    position: absolute;
    top: -1px;
    left: em(60px);
    width: em(540px);
    height: em(420px);
  }

  &__column {
    position: absolute;
    top: 0;
    width: em(60px);
    height: 100%;
    background-color: $light-blue;
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
  }

  &__cell {
    position: relative;
    width: em(61px);
    height: em(61px);
    border: 1px solid $grey;
    box-sizing: border-box;
    margin: -1px 0 0 -1px;

    &_active {
      background-color: $light-blue;
    }
  }

  &__labels {
    position: absolute;
    display: flex;

    &_column {
      flex-direction: column-reverse;
      top: 0;
      line-height: 1;
    }

    &_row {
      bottom: 0;
      left: em(44px);
    }
  }

  &__label {
    $size: 12px;
    font-size: em($size);
    width: em(60px, $size);
    height: em(60px, $size);
    color: $grey;
    display: flex;
    padding-left: em(6px, $size);
    box-sizing: border-box;
    align-items: flex-end;
  }

  &__curve {
    position: absolute;
    fill: none;
    stroke: $blue;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
</style>

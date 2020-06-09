<script>
import backtestPortfolioReturns from '~/assets/data/backtest-portfolio-returns.json';

export default {
  components: {},

  props: {
    full_static_data_back_test: {
      type: Object,
      default() {
        return {
          abs_profit_percent: 0,
          abs_profit_usd: 0,
          capitalization: 0,
          capitalization_end_period_btc: 0,
          capitalization_end_period_usd: 0,
          max_pros_num: 0,
          max_pros_perc: 0,
          profit_btc: '',
          profit_percent: '',
          profit_usd: '',
          standard_deviation: 0
        };
      }
    }
  },

  data() {
    return {
      backtestPortfolioReturns,
      optimalVisible: false
    };
  },

  computed: {},

  mounted() {},

  methods: {}
};
</script>

<template>
  <div class="backtest__portfolio-returns">
    <div
      :class="{ is_visible: optimalVisible }"
      class="backtest__portfolio-returns-mobile"
    >
      <div
        class="backtest__portfolio-returns-mobile__title"
        @click="optimalVisible = !optimalVisible"
      >
        Portfolio Returns
        <svg
          class="backtest__portfolio-returns-mobile__arrow-list"
          viewBox="0 0 8 6"
        >
          <path
            d="M0.9375 0.71875L4 3.78125L7.0625 0.71875L8 1.65625L4 5.65625L0 1.65625L0.9375 0.71875Z"
          />
        </svg>
      </div>

      <div class="backtest__portfolio-returns-mobile__items">
        <BaseCenterTitle 
          type="h2" 
          class="backtest__portfolio-returns-title">
          Portfolio Returns
        </BaseCenterTitle>

        <div class="backtest__portfolio-returns-table">
          <table>
            <thead>
              <tr>
                <th 
                  class="thead-title" 
                  scope="col">Final return</th>
                <th 
                  class="thead-title" 
                  scope="col">Profit/Loss</th>
                <th 
                  class="thead-title" 
                  scope="col">St.Deviation</th>
                <th 
                  class="thead-title" 
                  scope="col">Profit Peak</th>
                <th 
                  class="thead-title" 
                  scope="col">Maximum drawdown</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td 
                  class="tbody-text" 
                  aria-label="Final return">
                  {{
                    full_static_data_back_test.capitalization_end_period_usd
                  }}$ /
                  {{ full_static_data_back_test.capitalization_end_period_btc }}
                  BTC
                </td>
                <td 
                  class="tbody-text" 
                  aria-label="Profit/Loss">
                  {{ full_static_data_back_test.profit_usd }}$ /
                  {{ full_static_data_back_test.profit_percent }}%
                </td>
                <td 
                  class="tbody-text" 
                  aria-label="St.Deviation">
                  {{ full_static_data_back_test.standard_deviation }}
                </td>
                <td 
                  class="tbody-text" 
                  aria-label="Profit Peak">
                  {{ full_static_data_back_test.abs_profit_usd }}$ /
                  {{ full_static_data_back_test.abs_profit_percent }}%
                </td>
                <td 
                  class="tbody-text" 
                  aria-label="Maximum drawdown">
                  {{ full_static_data_back_test.max_pros_num }}$ /
                  {{ full_static_data_back_test.max_pros_perc }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.backtest__portfolio-returns {
  margin-bottom: em(90px);
  @include ifmobile {
    margin-bottom: 0;
  }

  &-title {
    margin-bottom: em(20px);
    @include ifmobile {
      display: none;
    }
  }

  &-table {
    table {
      border-collapse: collapse;
      margin: 0;
      padding: 0;
      width: 100%;
      table-layout: fixed;
    }

    table tr th {
      font-size: em(18px);
      padding: 0.35em 0;
    }

    table th,
    table td {
      font-size: em(14px);
      text-align: center;
    }

    table tr td {
      color: $white;
      text-align: center;
      background: linear-gradient(180deg, #5c26c8 0%, #4272e8 100%);
      box-shadow: inset 0px 4px 0px rgba(0, 0, 0, 0.25);
      border-collapse: collapse;
      padding: em(25px) 0 em(15px);
      @include ifmobile {
        background: none;
        box-shadow: none;
        padding: em(45px) 0 em(20px);
      }
    }
  }

  .tbody-text {
    @include ifmobile {
      color: $white;
      text-align: right;
    }
  }
}

.backtest__portfolio-returns-mobile {
  @include ifmobile {
    display: block;
    padding: em(20px) em(15px) em(15px);
    background: $purple;
  }

  &__title {
    display: none;
    @include ifmobile {
      $size: 14px;
      font-size: em($size);
      font-weight: bold;
      color: #ffee57;
      text-decoration: underline;
      text-transform: uppercase;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
  }

  &__arrow-list {
    width: em(12px);
    height: em(9px);
    fill: #ffee57;
    position: absolute;
    top: em(8px);
    right: em(32px);

    @include ifparent('.is_visible') {
      transform: scaleY(-1);
    }
  }

  &__items {
    @include ifmobile {
      overflow: hidden;
      max-height: 0;
    }
    @include ifmobile {
      @include ifparent('.is_visible') {
        min-height: em(250px);
        max-height: 100%;
      }
    }
  }
}

@include ifmobile {
  table {
    border: 0;
  }

  table thead {
    display: none;
  }
  table tr {
    display: block;
  }
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }
  table td:before {
    content: attr(aria-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
    color: $green;
  }
  table td:last-child {
    border-bottom: 0;
  }
}
</style>

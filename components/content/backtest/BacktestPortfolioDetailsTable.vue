<script>
import { mapState, mapMutations } from 'vuex';

import backtestPortfolioDetails from '~/assets/data/backtest-portfolio-details.json';

export default {
  components: {},
  props: {
    table_data_back_test: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      backtestPortfolioDetails,
      optimalVisible: false
    };
  },
  computed: {
    ...mapState('page', ['activeMarket']),
    is_active_market: {
      /* all or any name market */
      get() {
        let buff;
        if (this.activeMarket) {
          buff = this.activeMarket.market_title;
        } else {
          buff = 'all';
        }
        if (buff === 'all') {
          return false;
        } else {
          return true;
        }
      }
    }
  },
  mounted() {},
  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <div class="backtest__portfolio-details">
    <div
      :class="{ is_visible: optimalVisible }"
      class="backtest__portfolio-details-mobile"
    >
      <div
        class="backtest__portfolio-details-mobile__title"
        @click="optimalVisible = !optimalVisible"
      >
        Portfolio Details
        <svg
          class="backtest__portfolio-details-mobile__arrow-list"
          viewBox="0 0 8 6"
        >
          <path
            d="M0.9375 0.71875L4 3.78125L7.0625 0.71875L8 1.65625L4 5.65625L0 1.65625L0.9375 0.71875Z"
          />
        </svg>
      </div>

      <div class="backtest__portfolio-details-mobile__items">
        <div class="backtest__portfolio-details-header">
          <BaseCenterTitle 
            type="h2" 
            class="backtest__portfolio-details-title"
          >Portfolio Details</BaseCenterTitle
          >
          <div
            v-if = "is_active_market"
            class="save-portfolio"
            @click="setPopup('backtest-save-portfolio-popup')"
          >
            <span class="save-portfolio__text">SAVE</span>
            <img
              class="save-portfolio__img"
              src="/img/save-portfolio.svg"
              alt=""
            >
          </div>
        </div>
        <div class="backtest__portfolio-details-table">
          <div class="tbl-header">
            <table 
              cellpadding="0" 
              cellspacing="0" 
              border="0">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Allocation</th>
                  <th scope="col">Return</th>
                  <th scope="col">P & L</th>
                  <th scope="col">Profit Peak</th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="tbody-overflow">
            <BaseScrollBlock2>
              <div class="tbl-content">
                <table 
                  cellpadding="0" 
                  cellspacing="0" 
                  border="0">
                  <tbody 
                    v-for="item in table_data_back_test" 
                    :key="item.id">
                    <tr>
                      <td 
                        class="td-name" 
                        aria-label="Name">
                        <BaseCoin
                          :title="item.id_coin"
                          class="currencies-img"
                        />
                        <span class="currencie">{{ item.name }}</span>
                        <span class="space">&nbsp;</span>
                        <span class="short-name">{{ item.symbol }}</span>
                      </td>
                      <td aria-label="Allocation">
                        <span class="money">{{ item.capital }}$</span>
                        <span class="slash"> / </span>
                        <span class="percent">{{ item.percent }}%</span>
                      </td>
                      <td aria-label="Final Return">
                        <span class="money">{{ item.capital_end }}$</span>
                        <span class="slash"> / </span>
                        <span 
                          class="percent"
                        >{{ item.capital_end_percent }}%</span
                        >
                      </td>
                      <td aria-label="Profit/Loss">
                        <span class="money">{{ item.profit_usd }}$</span>
                        <span class="slash"> / </span>
                        <span class="percent">{{ item.profit_percent }}%</span>
                      </td>
                      <td aria-label="Profit Peak">
                        <span class="money">{{ item.abs_profit_usd }}$</span>
                        <span class="slash"> / </span>
                        <span 
                          class="percent"
                        >{{ item.abs_profit_percent }}%</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </BaseScrollBlock2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.backtest__portfolio-details {
  margin-bottom: em(40px);
  &-header {
    position: relative;
    margin-bottom: em(20px);

    @include ifmobile {
      display: none;
    }

    .save-portfolio {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 17%;

      &__img {
        width: em(18px);
        height: em(18px);
        margin-left: em(3px);
      }
      &__text {
        font-size: em(12px);
        line-height: em(14px);
        font-weight: 600;
        color: #c4c4c4;
      }
    }
    .save-portfolio:hover {
      .save-portfolio__text {
        color: $black;
      }
    }
  }
}
.backtest__portfolio-details-table {
  position: relative;
  display: block;
  padding-right: em(15px);
  text-align: center;

  @include ifmobile {
    padding: em(30px) em(20px) em(0px) em(0px);
    overflow: hidden;
  }

  thead > tr > th {
    font-size: em(18px);
    line-height: em(35px);
    font-weight: 600;
    color: $black;
    @include ifmobile {
      font-size: em(12px);
      color: $green;
    }
  }
  table > tbody {
    width: 100%;
    overflow: auto;
  }

  .td-name {
    padding-left: em(25px);
    text-align: left;
    @include ifmobile {
      padding-left: 15px;
      text-align: left;
    }
  }

  tbody > tr > td {
    color: $white;
    text-align: center;
    border-bottom: 1px solid #dedede;
    border-collapse: collapse;
    padding: em(15px) 0;
    position: relative;

    .currencies-img {
      width: em(20px);
      height: em(20px);
      border-radius: 50%;
      position: absolute;
      top: 30%;
      left: em(0px);
      @include ifmobile {
        position: absolute;
        top: 42%;
        left: em(0px);
      }
    }
  }

  table {
    width: 100%;
    table-layout: fixed;
    padding: 0px em(20px);
    @include ifmobile {
      width: em(340px);
      padding: 0;
    }
  }
  .tbody-overflow {
    height: 100%;
    max-height: em(246px);
    background: linear-gradient(180deg, #5c26c8 0%, #4272e8 100%);
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    @include ifmobile {
      background: none;
      box-shadow: none;
    }
  }
  .tbl-content {
    height: 100%;
    max-height: em(246px);
    width: 100%;
  }
  th {
    text-align: center;
    font-weight: 600;
    font-size: em(18px);
    padding: 0.35em 0;
  }
  td {
    text-align: center;
    vertical-align: middle;
    font-size: em(14px);
    @include ifmobile {
      font-size: em(10px);
    }
  }
}

.backtest__portfolio-details-mobile {
  @include ifmobile {
    display: block;
    padding: em(20px) em(0px) em(15px) em(17px);
    background: $purple;
  }

  .currencie {
    @include ifmobile {
      display: block;
    }
  }
  .space {
    @include ifmobile {
      display: none;
    }
  }
  .money {
    @include ifmobile {
      display: block;
    }
  }

  .slash {
    @include ifmobile {
      display: none;
    }
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
      padding-right: em(17px);
    }
  }

  &__arrow-list {
    width: em(12px);
    height: em(9px);
    fill: #ffee57;
    position: absolute;
    top: em(8px);
    right: em(50px);

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
</style>

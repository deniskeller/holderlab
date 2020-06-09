<script>
import { mapMutations, mapState, mapActions } from 'vuex';

import ApiService from '@/services/ApiService';

import BacktestGraph from '~/components/content/backtest/BacktestGraph';
import QuestionIcon from '~/components/icons/QuestionIcon';
import BacktestTimeFilter from '~/components/content/backtest/BacktestTimeFilter';
import BacktestInvestment from '~/components/content/backtest/BacktestInvestment';
import BacktestAsideAllocatedAssets from '~/components/content/backtest/BacktestAsideAllocatedAssets';
import BacktestAddCurrencies from '~/components/content/backtest/BacktestAddCurrencies';
import MatrixLoadPortfolioPopup from '~/components/content/matrix/MatrixLoadPortfolioPopup';
import BacktestSavePortfolioPopup from '~/components/content/backtest/BacktestSavePortfolioPopup';
import DeletePortfolioPopup from '~/components/content/DeletePortfolioPopup';
import BacktestPortfolioDetailsTable from '~/components/content/backtest/BacktestPortfolioDetailsTable';
import BacktestPortfolioReturnsTable from '~/components/content/backtest/BacktestPortfolioReturnsTable';

export default {
  components: {
    BacktestGraph,
    QuestionIcon,
    BacktestTimeFilter,
    BacktestInvestment,
    BacktestAsideAllocatedAssets,
    BacktestAddCurrencies,
    MatrixLoadPortfolioPopup,
    BacktestSavePortfolioPopup,
    DeletePortfolioPopup,
    BacktestPortfolioDetailsTable,
    BacktestPortfolioReturnsTable
  },

  data() {
    return {
      buttonInactive: true,
      time_start: null,
      timeFilterData: null,
      time_end: null,
      capitalization: '',
      is_btc_graph: false,
      // percent: 0,
      flagShowModalBactest: true,
      activeButtomBacktest: true
      // is_flag_account_update: false
    };
  },

  computed: {
    ...mapState('page', [
      'activePortfelCoinList',
      'selectedCoinList',
      'whiteListForMarkets',
      'activeMarket',
      'poolBackTest',
      'dataGraphDeviation',
      'timestampGraph',
      'dataGraphPerformanceBackTestUsd',
      'dataGraphPerformanceBackTestBtc',
      'tableDataBackTest',
      'fullStaticDataBackTest',
      'analyzedPortfolios',
      'isPathOnNewPortfolio',
      'loadPortfolioButton',
      'userInfo'
    ]),

    get_status_account() {
      return this.userInfo.status_account;
    },

    isVipAcc() {
      if (this.get_status_account == 2 || this.get_status_account == 1) {
        return true;
      } else {
        return false;
      }
    },

    get_trial_status() {
      return this.userInfo.is_trial_uses;
    },

    is_trial() {
      if (this.get_trial_status && !this.isVipAcc) {
        return true;
      } else false;
    },

    is_computed_flag_show_modal: {
      get() {
        if (this.isVipAcc) return false;
        else return this.flagShowModalBactest;
      }
    },

    percent() {
      let percent = 0;
      for (let item of this.selected_coins) {
        percent += parseFloat(item.percent) || 0;
      }
      return Math.round(percent * 100) / 100;
    },

    load_portfolio_button: {
      get: function() {
        return this.loadPortfolioButton;
      },
      set: function(value) {
        this.setOnLoadPortfolioButton(value);
      }
    },

    get_analyzed_portfolios() {
      return this.analyzedPortfolios;
    },

    is_inactive_button() {
      if (
        !this.time_start ||
        !this.time_end ||
        this.capitalization === '' ||
        this.selectedCoinList.length === 0 ||
        this.percent != 100
      ) {
        return true;
      } else {
        return false;
      }
    },

    full_static_data_back_test: {
      get() {
        return this.fullStaticDataBackTest;
      },

      set(value) {
        this.setFullStaticDataBackTest(value);
      }
    },

    table_data_back_test: {
      get() {
        return this.tableDataBackTest;
      },

      set(value) {
        this.setTableDataBackTest(value);
      }
    },

    timestamp_graph: {
      get() {
        return this.timestampGraph;
      },

      set(value) {
        this.setTimestampGraph(value);
      }
    },

    data_graph_deviation: {
      get() {
        return this.dataGraphDeviation;
      },

      set(value) {
        this.setDataGraphDeviation(value);
      }
    },

    data_graph_performance_backtest_usd: {
      get() {
        return this.dataGraphPerformanceBackTestUsd;
      },

      set(value) {
        this.setDataGraphPerformanceBackTestUsd(value);
      }
    },

    data_graph_performance_backtest_btc: {
      get() {
        return this.dataGraphPerformanceBackTestBtc;
      },
      set(value) {
        this.setDataGraphPerformanceBackTestBtc(value);
      }
    },

    selected_coins() {
      return this.selectedCoinList;
    },

    is_show() {
      if (this.graph.length > 0) return true;
      else {
        return false;
      }
    },

    graph() {
      if (this.is_btc_graph) {
        return this.data_graph_performance_backtest_btc;
      } else {
        return this.data_graph_performance_backtest_usd;
      }
    },

    get_coin_list_from_active_portfolios() {
      let temp = [];
      for (let item of this.selectedCoinList) {
        temp.push(item.title);
      }
      return temp;
    },

    // activeButtomBacktest() {
    //   if(this.activeButtomReturnActivatePortfolio) {
    //     return false;
    //   }
    //   else {
    //     return true;
    //   }
    // },

    activeButtomReturnActivatePortfolio(value) {
      if (this.isPathOnNewPortfolio) {
        return false;
      } else {
        return true;
      }
    },

    get_coin_list_from_whitelist() {
      return this.whiteListForMarkets.data[this.activeMarket.market_title];
    },

    get_big_pool_weight_efficient_frontier: {
      get() {
        return this.poolBackTest;
      },
      set(params) {
        this.setPoolBackTest(params);
      }
    }
  },

  mounted() {
    // console.log('----mounted dashboard----');
    // if (!this.$cookies.get('secret_token')) {
    //   this.$router.push({ path: '/landing-modal/hello/' });
    // } else {
    this.setOnLoadPortfolioButton();
    // }
  },

  beforeDestroy() {
    this.setOffPathInNewPortfolio();
    this.setAllSelectedCoinList([]);
    this.clearParamsBacktestTimeFilter();
    this.setOffLoadPortfolioButton();
    this.setTableDataBackTest([]);
    this.setDataGraphPerformanceBackTestUsd([]);
    this.setDataGraphPerformanceBackTestBtc([]);
    this.setDataGraphDeviation([]);
  },

  methods: {
    ...mapActions('page', ['makeRequesBackTest', 'getMessage']),

    ...mapMutations('page', [
      'setPopup',
      'setPoolBackTest',
      'setDataGraphPerformanceBackTestUsd',
      'setDataGraphDeviation',
      'setDataGraphPerformanceBackTestBtc',
      'setTimestampGraph',
      'setTableDataBackTest',
      'setFullStaticDataBackTest',
      'setOffPathInNewPortfolio',
      'clearParamsBacktestTimeFilter',
      'setDeepCopyAnalyzedPortfolios',
      'setAllSelectedCoinList',
      'copyOptionsActivatePortfolioFilterFromBacktestTime',
      'setOnLoadPortfolioButton',
      'setOffLoadPortfolioButton'
    ]),

    usePro(modal) {
      if (this.is_computed_flag_show_modal) {
        this.setPopup('upgrade-popup');
      } else {
        this.modal;
      }
    },

    percentChange(value) {
      this.buttonInactive = value;
    },

    save_and_continue(value) {
      this.setDeepCopyAnalyzedPortfolios(this.selected_coins);
      this.copyOptionsActivatePortfolioFilterFromBacktestTime();
      this.$router.push({ path: '/create-new-portfolio/portfolio-activation' });
    },

    backTest() {
      if (this.is_computed_flag_show_modal) {
        this.setPopup('upgrade-popup');
      } else {
        if (this.selected_coins.length === 0) {
          this.getMessage({
            message: 'Select coins',
            status: 'error'
          });
        } else {
          let param = {
            time_start: Math.round(this.time_start / 1000),
            time_end: Math.round(this.time_end / 1000),
            data: JSON.stringify(this.selected_coins),
            porog: Number(this.timeFilterData.threshold_rebalance),
            cron: this.timeFilterData.rebalance_period,
            timestamp: this.timeFilterData.rebalance_time_period,
            capitalization: Number(this.capitalization.replace('$', '')),
            section: 5,
            calcul_button: ''
          };
          this.makeRequesBackTest(param);
        }
      }
    }
  }
};
</script>

<template>
  <div class="backtest">
    <BaseContainer 
      :single="true" 
      class="backtest__container">
      <div class="backtest__top-container">
        <div class="backtest__headline">
          <BaseHeadline 
            title="Backtest" 
            class="backtest__headline-title">
            <div class="backtest__headline-subtitle">
              Test your strategy, select a time period, a balancing strategy and
              specify the amount of funds
            </div>
          </BaseHeadline>
        </div>
        <div
          class="load-portfolio"
          @click="usePro(setPopup('rebalancing-load-portfolio-popup'))"
        >
          <img
            class="load-portfolio__img"
            src="/img/load-portfolio.svg"
            alt=""
          >
          <span class="load-portfolio__text">LOAD PORTFOLIO</span>
        </div>
      </div>
      <div class="backtest__launch-container launch-container">
        <div class="launch-container-tools">
          <div class="launch-container-tools__select-block">
            <div class="launch-container-tools__select-block-title">
              START DATE
            </div>
            <BaseDataInput
              v-model="time_start"
              :from="time_end"
              placeholder="DD/MM/YY"
              class="launch-container-tools__select-block-dateinput"
            />
          </div>
          <div class="launch-container-tools__select-block">
            <div class="launch-container-tools__select-block-title">
              END DATE
            </div>
            <BaseDataInput
              :to="time_start"
              v-model="time_end"
              placeholder="DD/MM/YY"
              class="launch-container-tools__select-block-dateinput"
            />
          </div>

          <div class="launch-container-tools__select-block">
            <div class="launch-container-tools__select-block-title">
              ADD AMOUNT
            </div>
            <BaseInput3
              v-model="capitalization"
              type="text"
              maxlength = "8"
              name="name"
              value="capitalization"
              prefix="$"
              placeholder="$0"
              class="launch-container-tools__select-block-amount"
            />
          </div>
        </div>

        <div class="launch-container__balancing">
          <div class="launch-container__balancing-title">
            SELECT REBALANCING OPTIONS
          </div>
          <BacktestTimeFilter
            :button="false"
            v-model="timeFilterData"
            class="launch-container__balancing-filter"
          />
        </div>
        <BaseButton
          :is-inactive="is_inactive_button"
          type="primary"
          class="launch-container__launch-button"
          @click.native="backTest"
        >
          LAUNCH
        </BaseButton>
      </div>
      <div 
        v-show="is_show" 
        class="backtest__portfolio-performance">
        <div class="backtest__portfolio-performance-header">
          <BaseCenterTitle
            type="h2"
            class="backtest__portfolio-performance-header-title"
          >Portfolio Performance Chart</BaseCenterTitle
          >
          <div class="backtest__portfolio-performance-header-slider">
            <span class="slider-currencies slider-currencies-usd">$USD</span>
            <BaseCheckboxSlider2
              v-model="is_btc_graph"
              :is-active="is_btc_graph"
              class="slider"
            />
            <span class="slider-currencies slider-currencies-btc">BTC</span>
          </div>
        </div>
        <BacktestGraph
          :series="graph"
          :timestamp_graph="timestamp_graph"
          class="backtest__portfolio-performancegraph"
        />
      </div>

      <div 
        v-show="is_show" 
        class="backtest__allocated-assets">
        <div class="backtest__allocated-assets-header">
          <BaseCenterTitle
            type="h2"
            class="backtest__portfolio-allocated-assets-title"
          >Deviation of Allocated Assets %</BaseCenterTitle
          >
        </div>
        <BacktestGraph
          :series="data_graph_deviation"
          :timestamp_graph="timestamp_graph"
          class="backtest__allocated-assets-graph"
        />
      </div>

      <BacktestPortfolioReturnsTable
        v-show="is_show"
        :full_static_data_back_test="full_static_data_back_test"
      />

      <BacktestPortfolioDetailsTable
        v-show="is_show"
        :table_data_back_test="table_data_back_test"
      />

      <div class="backtest__save-portfolio-btn">
        <BaseButton
          type="secondary"
          class=""
          @click.native="setPopup('backtest-save-portfolio-popup')"
        >
          SAVE PORTFOLIO
        </BaseButton>
      </div>
    </BaseContainer>

    <BaseCenterTitle 
      type="h2" 
      class="backtest-assets-content-title">
      Selection of Crypto Assets
    </BaseCenterTitle>
    <BaseContainer class="backtest__base-container">
      <div class="backtest__content backtest-content">
        <BaseTitle 
          type="h3" 
          class="backtest-content__subtitle">
          SELECT ASSETS
        </BaseTitle>
        <BacktestAddCurrencies
          :search="true"
          :pages="true"
          :tags="true"
          :coin_list="selected_coins"
          :whitelist="get_coin_list_from_whitelist"
          class="backtest__add-assets"
        />
        <div 
          v-show="!activeButtomBacktest == activeButtomReturnActivatePortfolio" 
          class="backtest__buttons">
          <BaseButton
            :is-inactive="activeButtomReturnActivatePortfolio"
            to="/create-new-portfolio/portfolio-activation"
            class="backtest__button backtest__button_re"
          >
            <svg 
              viewBox="0 0 21 10" 
              class="backtest__button-arrow-icon">
              <path
                d="M10.5156 2.01562C12.7969 2.01562 14.8438 2.6875 16.6562 4.03125C18.4688 5.375 19.7344 7.10938 20.4531 9.23438L18.1094 9.98438C17.5781 8.35938 16.6094 7.04688 15.2031 6.04688C13.8281 5.01562 12.2656 4.5 10.5156 4.5C8.57812 4.5 6.85938 5.125 5.35938 6.375L9.01562 9.98438H0.015625V0.984375L3.57812 4.59375C5.54688 2.875 7.85938 2.01562 10.5156 2.01562Z"
              />
            </svg>
          </BaseButton>
          <BaseButton
            :is-inactive="activeButtomReturnActivatePortfolio"
            type="primary"
            class="backtest__button"
            @click.native="save_and_continue"
          >
            SAVE AND CONTINUE
          </BaseButton>
        </div>
      </div>
      <BaseAside class="backtest-base-aside">
        <BacktestAsideAllocatedAssets
          :plus="false"
          :selected_coins="selected_coins"
          title="PORTFOLIO WEIGHT"
          subtitle="Allocated"
          class="efficient-frontier__aside-allocated-asset"
          @percent="percentChange"
        />
      </BaseAside>
    </BaseContainer>

    <MatrixLoadPortfolioPopup 
      type_="saved"
      page_ = "backtest"
      class="" />
    <BacktestSavePortfolioPopup class="" />
    <DeletePortfolioPopup class="" />
  </div>
</template>

<style lang="scss" scoped>
.backtest {
  &__base-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__top-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
    .backtest__headline {
      @include ifmobile {
        background: $purple;
        text-align: center;
        color: $white;
        width: 100%;
      }
      .backtest__headline-subtitle {
        @include ifmobile {
          display: none;
        }
      }
    }
    .load-portfolio {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      @include ifmobile {
        display: none;
      }

      &__img {
        width: em(24px);
        height: em(20px);
        margin-right: em(3px);
      }
      &__text {
        font-size: em(12px);
        line-height: em(14px);
        font-weight: 600;
        color: #c4c4c4;
      }
    }
    .load-portfolio:hover {
      .load-portfolio__text {
        color: $black;
      }
    }
  }

  .launch-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    margin-bottom: em(90px);

    @include ifmobile {
      justify-content: center;
      margin-bottom: 0;
      padding: em(30px) em(15px);
    }

    .launch-container-tools {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      max-width: em(530px);

      @include ifmobile {
        margin-bottom: em(30px);
      }

      &__select-block {
        width: 100%;
        max-width: em(155px);
        text-align: center;
        @include ifmobile {
          max-width: em(110px);
        }
        &-amount {
          width: 100%;
          max-width: em(155px);
        }
        &-title {
          font-size: em(12px);
          line-height: em(18px);
          color: #c4c4c4;
          margin-bottom: em(8px);
        }
      }
    }

    &__balancing {
      text-align: center;
      max-width: em(370px);
      @include ifmobile {
        margin-bottom: em(30px);
      }
      &-title {
        font-size: em(12px);
        line-height: em(18px);
        color: #c4c4c4;
        margin-bottom: em(8px);
        @include ifmobile {
          margin-bottom: em(15px);
        }
      }
      &-filter {
        display: flex;
        align-items: center;
        max-width: em(370px);
        height: em(48px);
        background: $blue;
      }
    }
  }

  &__portfolio-performance {
    margin-bottom: em(90px);

    @include ifmobile {
      margin-bottom: em(40px);
    }
    &-header {
      position: relative;
      margin-bottom: em(20px);
      &-title {
        @include ifmobile {
          margin-bottom: em(20px);
        }
      }
      &-slider {
        position: absolute;
        top: 19%;
        right: 0;
        display: flex;
        align-items: center;
        @include ifmobile {
          position: static;
          justify-content: center;
          margin-bottom: em(30px);
        }
        .slider {
          margin-left: em(15px);
          margin-right: em(15px);
        }
        .slider-currencies {
          font-size: em(12px);
          line-height: em(18px);
          font-weight: 600;
        }
      }
    }
  }

  &__allocated-assets {
    margin-bottom: em(90px);
    &-header {
      position: relative;
      margin-bottom: em(20px);

      @include ifmobile {
        margin-bottom: em(40px);
      }
    }
  }

  &__buttons {
    margin-top: em(40px);
    @include ifmobile {
      display: none;
    }
  }

  &__button {
    &_re {
      min-width: em(63px);
      &:hover {
        svg {
          fill: $white;
        }
      }
    }
  }

  &__save-portfolio-btn {
    display: none;
    @include ifmobile {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: em(40px);
    }
  }

  &__button-arrow-icon {
    width: em(24px);
    height: em(11px);
    fill: $blue;
    transition: fill $speed;
  }

  .backtest-assets-content-title {
    @include ifmobile {
      margin-bottom: em(20px);
    }
  }

  &__content {
    width: 100%;
    max-width: em(623px);
    .backtest-content__subtitle {
      @include ifmobile {
        text-align: center;
        margin-bottom: em(20px);
      }
    }
  }

  .backtest-base-aside {
    width: em(320px);
    @include ifmobile {
      width: 100%;
      order: -1;
    }
  }

  &__asset-allocation {
    display: none;
    @include ifmobile {
      display: block;
    }
  }
}
</style>

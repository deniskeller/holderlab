<script>
import { mapMutations, mapState, mapActions } from 'vuex';

import ApiService from '@/services/ApiService';
import RiskGraph2 from '~/components/content/efficient-frontier/RiskGraph2';

import BacktestAddCurrencies from '~/components/content/backtest/BacktestAddCurrencies';
import EfficientFrontierParameters from '~/components/content/efficient-frontier/EfficientFrontierParameters';
import EfficientFrontierParameters2 from '~/components/content/efficient-frontier/EfficientFrontierParameters2';
import MatrixLoadPortfolioPopup from '~/components/content/matrix/MatrixLoadPortfolioPopup';
import BacktestSavePortfolioPopup from '~/components/content/backtest/BacktestSavePortfolioPopup';
import UpgradePopup from '~/components/content/UpgradePopup';
import UpgradeProPopup from '~/components/content/UpgradeProPopup';

export default {
  components: {
    RiskGraph2,
    BacktestAddCurrencies,
    EfficientFrontierParameters,
    EfficientFrontierParameters2,
    BacktestSavePortfolioPopup,
    MatrixLoadPortfolioPopup,
    UpgradePopup,
    UpgradeProPopup
  },

  data() {
    return {
      list_select: [
        'Optimal Portfolio',
        'Minimum Volatility Portfolio',
        'Maximum Volatility Portfolio'
      ],
      list_select_2: {
        'Optimal Portfolio': 'portfel_sharpe_portfolio',
        'Minimum Volatility Portfolio': 'portfel_min_variance_port',
        'Maximum Volatility Portfolio': 'portfel_max_variance_port'
      },

      optimalVisible: false,
      minVisible: false,
      is_50000: false,
      maxVisible: false,
      buff_type_portfolio: null,
      type_portfolio: null,
      name: '',
      data_request: {
        value_radio: null,
        time_start: null,
        time_end: null,
        is_click: null
      },
      show_item_flag: false,
      is_flag_account_update: false,
      flagShowModalEfficientFr: false
    };
  },

  computed: {
    ...mapState('page', [
      'selectedCoinList',
      'whiteListForMarkets',
      'activeMarket',
      'bigPoolWeightEfficientFrontier',
      'bigStatisticDataEfficientFrontier',
      'loadPortfolioButton',
      'userInfo',
      'flagShowEffectiveMargin',
      'seriesEffectiveMargin'
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

    is_computed_flag_show_modal: {
      get() {
        if (this.isVipAcc) return false;
        else return this.flagShowModalEfficientFr;
      },
      set(value) {
        this.flagShowModalEfficientFr = true;
      }
    },

    load_portfolio_button: {
      get: function() {
        return this.loadPortfolioButton;
      },
      set: function(value) {
        this.setOnLoadPortfolioButton(value);
      }
    },

    computed_series() {
      return this.seriesEffectiveMargin;
    },

    selected_coins: {
      get() {
        return this.selectedCoinList;
      },
      set(value) {
        this.setAddItemInSelectedCoinList(value);
      }
    },

    get_coin_list_from_active_portfolios() {
      let temp = [];
      for (let item of this.selected_coins) {
        temp.push(item.title);
      }
      return temp;
    },

    get_coin_list_from_whitelist() {
      return this.whiteListForMarkets.data[this.activeMarket.market_title];
    },

    is_show_item() {
      return this.flagShowEffectiveMargin;
    },

    get_big_pool_weight_efficient_frontier() {
      return this.bigPoolWeightEfficientFrontier;
    },

    statistics_data() {
      return this.bigStatisticDataEfficientFrontier;
    }
  },

  watch: {
    data_request() {
      this.requesFullEffectiveMargin();
    }
  },

  mounted() {
    // if (!this.$cookies.get('secret_token')) {
    //   this.$router.push({ path: '/landing-modal/hello/' });
    // } else {
    //   // console.log('hi');
    // }

    // console.log('----mounted dashboard----');
    // if (!this.$cookies.get('secret_token')) {
    //   this.$router.push({ path: '/landing-modal/hello/' });
    // } else {
    this.setOnLoadPortfolioButton();
    // }
  },

  beforeDestroy() {
    this.setOffLoadPortfolioButton();
    this.setAllSelectedCoinList([]);
    this.setFlagShowEffectiveMargin(false);
    this.clearBigPoolWeightEfficientFrontier();
    this.cleatBigStatisticDataEfficientFrontier();
    this.delNewIdSavedEffectiveMargin();
  },

  methods: {
    ...mapActions('page', [
      'postSaveEfficientFrontier',
      'makeRequesFullEffectiveMargin'
    ]),

    ...mapMutations('page', [
      'setPopup',
      'setBigPoolWeightEfficientFrontier',
      'setBigStatisticDataEfficientFrontier',
      //-------------------------------
      'setDellItemInSelectedCoinList',
      'setAddItemInSelectedCoinList',
      'setOnLoadPortfolioButton',
      'setOffLoadPortfolioButton',
      'setAllSelectedCoinList',
      'setFlagShowEffectiveMargin',
      'cleatBigStatisticDataEfficientFrontier',
      'clearBigPoolWeightEfficientFrontier',
      'delNewIdSavedEffectiveMargin'
    ]),

    usePro(modal) {
      if (this.is_computed_flag_show_modal) {
        this.setPopup('upgrade-popup');
      } else {
        this.modal;
      }
    },

    savePortfolio() {
      if (this.type_portfolio != null) {
        if (this.buff_type_portfolio != this.type_portfolio) {
          this.delNewIdSavedEffectiveMargin();
        }
        this.buff_type_portfolio = this.type_portfolio;
        this.postSaveEfficientFrontier({
          type_portfolio: this.list_select_2[this.type_portfolio],
          name: this.name,
          market: this.activeMarket.market_title
        });
      }
    },

    requesFullEffectiveMargin() {
      console.log('---Reques Short Effective Margin---');
      if (this.get_coin_list_from_active_portfolios.length === 0) {
        this.$toast.error('Select coins').goAway(2000);
      } else {
        if (this.data_request.value_radio == '50000') {
          this.is_50000 = true;
        } else {
          this.is_50000 = false;
        }
        this.makeRequesFullEffectiveMargin({
          time_start: Math.round(this.data_request.time_start / 1000),
          time_end: Math.round(this.data_request.time_end / 1000),
          data: JSON.stringify(this.get_coin_list_from_active_portfolios),
          is_50000: this.is_50000,
          calcul_button: ''
        });
        if (this.is_50000) this.$router.push({ path: '/account/history/' });
      }
    }
  }
};
</script>

<template>
  <div class="efficient-frontier">
    <BaseContainer :single="true">
      <div class="efficient-frontier__top-container">
        <div class="efficient-frontier__headline-title">
          <BaseHeadline
            title="Portfolio Optimization"
            class="efficient-frontier__headline"
          >
            <div class="efficient-frontier__headline-subtitle">
              We are looking for the perfect balance between risk and return, in
              accordance with Markowitz theory, which results in optimal asset
              weights
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

      <EfficientFrontierParameters2
        v-model="data_request"
        type_component="mobile"
        class="efficient-frontier-base-aside__parameters-mobile"
      />

      <RiskGraph2
        v-show="is_show_item"
        :series="computed_series"
        class="efficient-frontier__risk-graph"
      />

      <div 
        v-show="is_show_item" 
        class="efficient-frontier__table">
        <div class="efficient-frontier__table-top">
          <table class="main-table">
            <tbody class="main-tbody">
              <tr class="row-1">
                <td>
                  <table class="table-td">
                    <caption class="left-caption">
                      Min Volatility Portfolio
                    </caption>
                    <thead>
                      <tr>
                        <th 
                          scope="col" 
                          class="table-th__name">NAME</th>
                        <th 
                          scope="col" 
                          class="table-th__value">WEIGHT</th>
                      </tr>
                    </thead>
                    <tbody
                      v-for="item in get_big_pool_weight_efficient_frontier.portfel_min_variance_port"
                      :key="item.index"
                    >
                      <tr>
                        <td 
                          aria-label="Name" 
                          class="main-table__td-name">
                          <BaseCoinMini
                            :title="item.id_coin"
                            class="item-coin"
                          />
                          {{ item.name }} ({{ item.short }})
                        </td>
                        <td 
                          aria-label="Weight" 
                          class="main-table__td-value">
                          {{ item.percent }}%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>
                  <table class="table-td">
                    <caption class="middle-caption">
                      Optimal Portfolio
                    </caption>
                    <thead>
                      <tr>
                        <th 
                          scope="col" 
                          class="table-th__name">NAME</th>
                        <th 
                          scope="col" 
                          class="table-th__value">WEIGHT</th>
                      </tr>
                    </thead>
                    <tbody
                      v-for="item in get_big_pool_weight_efficient_frontier.portfel_sharpe_portfolio"
                      :key="item.index"
                    >
                      <tr>
                        <td 
                          aria-label="Name" 
                          class="main-table__td-name">
                          <BaseCoinMini
                            :title="item.id_coin"
                            class="item-coin"
                          />
                          {{ item.name }} ({{ item.short }})
                        </td>
                        <td 
                          aria-label="Weight" 
                          class="main-table__td-value">
                          {{ item.percent }} %
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>
                  <table class="table-td">
                    <caption class="right-caption">
                      Max Volatility Portfolio
                    </caption>
                    <thead>
                      <tr>
                        <th 
                          scope="col" 
                          class="table-th__name">NAME</th>
                        <th 
                          scope="col" 
                          class="table-th__value">WEIGHT</th>
                      </tr>
                    </thead>
                    <tbody
                      v-for="item in get_big_pool_weight_efficient_frontier.portfel_max_variance_port"
                      :key="item.index"
                    >
                      <tr>
                        <td 
                          aria-label="Name" 
                          class="main-table__td-name">
                          <BaseCoinMini
                            :title="item.id_coin"
                            class="item-coin"
                          />
                          {{ item.name }} ({{ item.short }})
                        </td>
                        <td 
                          aria-label="Weight" 
                          class="main-table__td-value">
                          {{ item.percent }} %
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <tr class="row-2 border-none">
                <td 
                  colspan="3" 
                  class="border-none">
                  <table class="second-table">
                    <caption class="second-table__title">
                      Portfolio Performance Indicators
                    </caption>
                    <tbody>
                      <tr class="border-none">
                        <td class="border-none">
                          <table class="">
                            <tbody>
                              <tr>
                                <td
                                  class="border-none second-table__td-name"
                                  aria-label="Name"
                                >
                                  RETURN
                                </td>
                                <td
                                  aria-label="Weight"
                                  class="border-none second-table__td-value"
                                >
                                  {{
                                    statistics_data.min_variance_port.returns
                                  }}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  aria-label="Name"
                                  class="border-none second-table__td-name"
                                >
                                  VOLATILITY
                                </td>
                                <td
                                  aria-label="Weight"
                                  class="border-none second-table__td-value"
                                >
                                  {{
                                    statistics_data.min_variance_port.volatility
                                  }}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  aria-label="Name"
                                  class="border-none second-table__td-name"
                                >
                                  SHARPE RATIO
                                </td>
                                <td
                                  aria-label="Weight"
                                  class="border-none second-table__td-value"
                                >
                                  {{
                                    statistics_data.min_variance_port
                                      .sharpe_ratio
                                  }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td class="border-none">
                          <table class="">
                            <tbody>
                              <tr>
                                <td
                                  class="border-none second-table__td-name"
                                  aria-label="Name"
                                >
                                  RETURN
                                </td>
                                <td
                                  aria-label="Weight"
                                  class="border-none second-table__td-value"
                                >
                                  {{ statistics_data.sharpe_portfolio.returns }}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  aria-label="Name"
                                  class="border-none second-table__td-name"
                                >
                                  VOLATILITY
                                </td>
                                <td
                                  aria-label="Weight"
                                  class="border-none second-table__td-value"
                                >
                                  {{
                                    statistics_data.sharpe_portfolio.volatility
                                  }}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  aria-label="Name"
                                  class="border-none second-table__td-name"
                                >
                                  SHARPE RATIO
                                </td>
                                <td
                                  aria-label="Weight"
                                  class="border-none second-table__td-value"
                                >
                                  {{
                                    statistics_data.sharpe_portfolio
                                      .sharpe_ratio
                                  }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td class="border-none">
                          <table class="">
                            <tbody>
                              <tr>
                                <td
                                  class="border-none second-table__td-name"
                                  aria-label="Name"
                                >
                                  RETURN
                                </td>
                                <td
                                  aria-label="Weight"
                                  class="border-none second-table__td-value"
                                >
                                  {{
                                    statistics_data.max_variance_port.returns
                                  }}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  aria-label="Name"
                                  class="border-none second-table__td-name"
                                >
                                  VOLATILITY
                                </td>
                                <td
                                  aria-label="Weight"
                                  class="border-none second-table__td-value"
                                >
                                  {{
                                    statistics_data.max_variance_port.volatility
                                  }}
                                </td>
                              </tr>
                              <tr>
                                <td
                                  aria-label="Name"
                                  class="border-none second-table__td-name"
                                >
                                  SHARPE RATIO
                                </td>
                                <td
                                  aria-label="Weight"
                                  class="border-none second-table__td-value"
                                >
                                  {{
                                    statistics_data.max_variance_port
                                      .sharpe_ratio
                                  }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div 
        v-show="is_show_item" 
        class="efficient-frontier__mobile-table">
        <div
          :class="{ is_visible: optimalVisible }"
          class="efficient-frontier-tools"
        >
          <div
            class="efficient-frontier-tools__title"
            @click="optimalVisible = !optimalVisible"
          >
            Optimal Portfolio
            <svg 
              class="efficient-frontier-tools__arrow-list" 
              viewBox="0 0 8 6">
              <path
                d="M0.9375 0.71875L4 3.78125L7.0625 0.71875L8 1.65625L4 5.65625L0 1.65625L0.9375 0.71875Z"
              />
            </svg>
          </div>

          <div class="efficient-frontier-tools__items">
            <table class="table-mobile">
              <thead>
                <tr>
                  <th 
                    scope="col" 
                    class="table-mobile__td-title">NAME</th>
                  <th 
                    scope="col" 
                    class="table-mobile__td-title">WEIGHT</th>
                </tr>
              </thead>
              <tbody
                v-for="item in get_big_pool_weight_efficient_frontier.portfel_min_variance_port"
                :key="item.index"
              >
                <tr>
                  <td 
                    aria-label="Name" 
                    class="table-mobile__td-name">
                    <BaseCoinMini 
                      :title="item.id_coin" 
                      class="item-coin" />
                    {{ item.name }} ({{ item.short }})
                  </td>
                  <td 
                    aria-label="Weight" 
                    class="table-mobile__td-value">
                    {{ item.percent }} %
                  </td>
                </tr>
              </tbody>
            </table>

            <table class="table-mobile-performance">
              <caption class="table-mobile-performance__title">
                Portfolio Performance Indicators
              </caption>

              <tbody>
                <tr>
                  <td
                    aria-label="Name"
                    class="table-mobile-performance__td-name"
                  >
                    RETURN
                  </td>
                  <td
                    aria-label="Weight"
                    class="table-mobile-performance__td-value"
                  >
                    {{ statistics_data.min_variance_port.returns }}
                  </td>
                </tr>
                <tr>
                  <td
                    aria-label="Name"
                    class="table-mobile-performance__td-name"
                  >
                    VOLATILITY
                  </td>
                  <td
                    aria-label="Weight"
                    class="table-mobile-performance__td-value"
                  >
                    {{ statistics_data.min_variance_port.volatility }}
                  </td>
                </tr>
                <tr>
                  <td
                    aria-label="Name"
                    class="table-mobile-performance__td-name"
                  >
                    SHARPE RATIO
                  </td>
                  <td
                    aria-label="Weight"
                    class="table-mobile-performance__td-value"
                  >
                    {{ statistics_data.min_variance_port.sharpe_ratio }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          :class="{ is_visible: minVisible }"
          class="efficient-frontier-tools"
        >
          <div
            class="efficient-frontier-tools__title"
            @click="minVisible = !minVisible"
          >
            MIN. VOLATILITY PORTFOLIO
            <svg 
              class="efficient-frontier-tools__arrow-list" 
              viewBox="0 0 8 6">
              <path
                d="M0.9375 0.71875L4 3.78125L7.0625 0.71875L8 1.65625L4 5.65625L0 1.65625L0.9375 0.71875Z"
              />
            </svg>
          </div>

          <div class="efficient-frontier-tools__items">
            <table class="table-mobile">
              <thead>
                <tr>
                  <th 
                    scope="col" 
                    class="table-mobile__td-title">NAME</th>
                  <th 
                    scope="col" 
                    class="table-mobile__td-title">WEIGHT</th>
                </tr>
              </thead>
              <tbody
                v-for="item in get_big_pool_weight_efficient_frontier.portfel_sharpe_portfolio"
                :key="item.index"
              >
                <tr>
                  <td 
                    aria-label="Name" 
                    class="table-mobile__td-name">
                    <BaseCoinMini 
                      :title="item.id_coin" 
                      class="item-coin" />
                    {{ item.name }} ({{ item.short }})
                  </td>
                  <td 
                    aria-label="Weight" 
                    class="table-mobile__td-value">
                    {{ item.value }}%
                  </td>
                </tr>
              </tbody>
            </table>

            <table class="table-mobile-performance">
              <caption class="table-mobile-performance__title">
                Portfolio Performance Indicators
              </caption>

              <tbody>
                <tr>
                  <td
                    aria-label="Name"
                    class="table-mobile-performance__td-name"
                  >
                    RETURN
                  </td>
                  <td
                    aria-label="Weight"
                    class="table-mobile-performance__td-value"
                  >
                    {{ statistics_data.sharpe_portfolio.returns }}
                  </td>
                </tr>
                <tr>
                  <td
                    aria-label="Name"
                    class="table-mobile-performance__td-name"
                  >
                    VOLATILITY
                  </td>
                  <td
                    aria-label="Weight"
                    class="table-mobile-performance__td-value"
                  >
                    {{ statistics_data.sharpe_portfolio.volatility }}
                  </td>
                </tr>
                <tr>
                  <td
                    aria-label="Name"
                    class="table-mobile-performance__td-name"
                  >
                    SHARPE RATIO
                  </td>
                  <td
                    aria-label="Weight"
                    class="table-mobile-performance__td-value"
                  >
                    {{ statistics_data.sharpe_portfolio.sharpe_ratio }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          :class="{ is_visible: maxVisible }"
          class="efficient-frontier-tools"
        >
          <div
            class="efficient-frontier-tools__title"
            @click="maxVisible = !maxVisible"
          >
            MAX. VOLATILITY PORTFOLIO
            <svg 
              class="efficient-frontier-tools__arrow-list" 
              viewBox="0 0 8 6">
              <path
                d="M0.9375 0.71875L4 3.78125L7.0625 0.71875L8 1.65625L4 5.65625L0 1.65625L0.9375 0.71875Z"
              />
            </svg>
          </div>

          <div class="efficient-frontier-tools__items">
            <table class="table-mobile">
              <thead>
                <tr>
                  <th 
                    scope="col" 
                    class="table-mobile__td-title">NAME</th>
                  <th 
                    scope="col" 
                    class="table-mobile__td-title">WEIGHT</th>
                </tr>
              </thead>
              <tbody
                v-for="item in get_big_pool_weight_efficient_frontier.portfel_max_variance_port"
                :key="item.index"
              >
                <tr>
                  <td 
                    aria-label="Name" 
                    class="table-mobile__td-name">
                    <BaseCoinMini 
                      :title="item.id_coin" 
                      class="item-coin" />
                    {{ item.name }} ({{ item.short }})
                  </td>
                  <td 
                    aria-label="Weight" 
                    class="table-mobile__td-value">
                    {{ item.value }}%
                  </td>
                </tr>
              </tbody>
            </table>

            <table class="table-mobile-performance">
              <caption class="table-mobile-performance__title">
                Portfolio Performance Indicators
              </caption>

              <tbody>
                <tr>
                  <td
                    aria-label="Name"
                    class="table-mobile-performance__td-name"
                  >
                    RETURN
                  </td>
                  <td
                    aria-label="Weight"
                    class="table-mobile-performance__td-value"
                  >
                    {{ statistics_data.max_variance_port.returns }}
                  </td>
                </tr>
                <tr>
                  <td
                    aria-label="Name"
                    class="table-mobile-performance__td-name"
                  >
                    VOLATILITY
                  </td>
                  <td
                    aria-label="Weight"
                    class="table-mobile-performance__td-value"
                  >
                    {{ statistics_data.max_variance_port.volatility }}
                  </td>
                </tr>
                <tr>
                  <td
                    aria-label="Name"
                    class="table-mobile-performance__td-name"
                  >
                    SHARPE RATIO
                  </td>
                  <td
                    aria-label="Weight"
                    class="table-mobile-performance__td-value"
                  >
                    {{ statistics_data.max_variance_port.sharpe_ratio }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div 
        v-if = "activeMarket.market_title!='all'"
        v-show="is_show_item" 
        class="efficient-frontier__save-portfolio">
        <BaseTitle 
          type="h3" 
          class="efficient-frontier__save-portfolio__title">
          SAVE PORTFOLIO SETTINGS
        </BaseTitle>

        <BaseSelect2
          :list="list_select"
          v-model = "type_portfolio"
          type="form"
          name="date"
          class="efficient-frontier__save-portfolio-dataselect"
        >
          Choose portfolio
        </BaseSelect2>

        <BaseInput
          :editable="true"
          v-model = "name"
          icon="folder"
          placeholder="Create portfolio name"
          class="efficient-frontier__save-portfolio-choose"
        />

        <BaseButton
          type="secondary"
          class="efficient-frontier__save-portfolio-btn"
          @click.native="savePortfolio"
        >
          SAVE PORTFOLIO
        </BaseButton>

        <div 
          class="save-portfolio" 
          @click="savePortfolio">
          <span class="save-portfolio__text">SAVE</span>
          <img
            class="save-portfolio__img"
            src="/img/save-portfolio.svg"
            alt=""
          >
        </div>
      </div>
    </BaseContainer>

    <div class="crypto-assets-selection">
      <BaseCenterTitle 
        type="h2" 
        class="crypto-assets-selection__title"
      >Selection of Crypto Assets</BaseCenterTitle
      >

      <BaseContainer>
        <BaseContent class="crypto-assets-selection__base-content">
          <div class="crypto-assets-selection__content">
            <BaseTitle
              type="h3"
              class="crypto-assets-selection__content-subtitle"
            >
              SELECT ASSETS
            </BaseTitle>
            <BacktestAddCurrencies
              :search="true"
              :pages="true"
              :tags="true"
              :coin_list="selected_coins"
              :whitelist="get_coin_list_from_whitelist"
              class="crypto-assets-selection__content-add-assets"
            />
          </div>
        </BaseContent>
        <BaseAside class="efficient-frontier-base-aside">
          <EfficientFrontierParameters
            v-model="data_request"
            class="efficient-frontier-base-aside__parameters"
          />
        </BaseAside>
      </BaseContainer>
    </div>

    <BacktestSavePortfolioPopup class="" />
    <MatrixLoadPortfolioPopup 
      type_="saved"
      class="" />
    <UpgradePopup class="upgrade__popup" />
    <UpgradeProPopup class="upgrade__popup" />
  </div>
</template>

<style lang="scss" scoped>
.efficient-frontier__headline-title {
  @include ifmobile {
    background: $purple;
    text-align: center;
    color: $white;
    width: 100%;
  }
  .efficient-frontier__headline {
    &-subtitle {
      @include ifmobile {
        display: none;
      }
    }
  }
}
.efficient-frontier {
  padding-bottom: em(60px);
  @include ifmobile {
    padding-bottom: 0;
  }
  &__top-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
    .efficient-frontier__headline {
      max-width: em(618px);
    }
    @include ifdesktop {
      height: em(100px);
      margin-bottom: em(70px);
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
  &__risk-graph {
    width: 100%;
    margin-bottom: em(30px);
  }
  &__save-portfolio {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    position: relative;
    @include ifmobile {
      flex-direction: column;
      margin-bottom: em(30px);
      padding-bottom: em(30px);
      padding-top: em(40px);
    }
    &__title {
      margin-bottom: em(20px);
      @include ifdesktop {
        display: none;
      }
    }
    &-dataselect,
    &-choose {
      width: 100%;
      max-width: em(420px);
      @include ifmobile {
        max-width: em(350px);
      }
    }
    &-dataselect {
      @include ifmobile {
        margin-bottom: em(25px);
      }
    }
    &-btn {
      margin-top: em(30px);
      @include ifdesktop {
        display: none;
      }
    }
    .save-portfolio {
      display: flex;
      flex-direction: row;
      // align-items: center;
      cursor: pointer;
      @include ifmobile {
        display: none;
      }
      &__img {
        width: em(18px);
        height: em(18px);
        margin-left: em(3px);
      }
      &__text {
        font-size: em(12px);
        line-height: em(28px);
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
  &__table {
    width: 100%;
    margin-bottom: em(35px);
    @include ifmobile {
      display: none;
    }
    &-top {
      width: 100%;
      background: linear-gradient(180deg, #5c26c8 0%, #4272e8 100%);
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
      padding-bottom: em(20px);
      table {
        border-collapse: collapse;
        border-spacing: 0;
        border: 0;
        border: none;
        margin: 0 auto;
        padding: 0;
        width: 20.4em;
      }
      thead tr th {
        font-size: em(14px);
        color: #81d540;
        padding: em(17px) 0 em(14px);
      }
      table caption {
        font-size: em(18px);
        line-height: em(36px);
        background: #fff;
        color: $black;
        width: 100%;
        border-bottom: 1px solid #fff;
        border-spacing: 0;
        border: 0;
        padding: 0;
        margin: 0;
      }
      table tr td {
        border-spacing: 0;
        border: 0;
        padding: 0;
        margin: 0;
        border-bottom: 1px solid #dedede;
        font-size: em(16px);
        line-height: em(46px);
        color: $white;
      }
      table th,
      table td {
        padding: 0;
        margin: 0;
        text-align: center;
        border-spacing: 0;
        border: 0;
        padding: 0;
        margin: 0;
      }
      table th {
        font-size: 0.85em;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        border-spacing: 0;
        border: 0;
        padding: 0;
        margin: 0;
      }
    }
  }
  &-base-aside {
    @include ifmobile {
      display: none;
    }
  }

  &__mobile-table {
    @include ifdesktop {
      display: none;
    }
  }
}
.item-coin {
  display: inline-block;
  top: 2px;
  position: relative;
}

.main-table {
  .main-tbody {
    .row-1 {
      border-collapse: unset;
      border-spacing: 10px 10px;
      width: 98%;
      margin: 0 auto;
      .table-td {
        .left-caption {
          margin-left: em(-15px);
          padding-right: em(15px);
        }
        .middle-caption {
        }
        .right-caption {
          margin-right: -1.3em;
          padding-left: 1.038em;
        }
        .table-th__name {
          text-align: center;
        }
        .table-th__value {
          text-align: left;
        }
      }
    }
  }
  .main-table__td-name {
    text-align: center;
    padding-left: 2.25em;
    width: 9.925em;
  }
  .main-table__td-value {
    text-align: left;
    padding-left: 0.4em;
  }
}

.row-2 {
  .second-table__title {
    font-size: em(15px);
    padding-top: em(15px);
    padding-bottom: em(20px);
    color: #81d540;
    text-transform: uppercase;
    background: none;
  }
  .border-none {
    border: none;
  }
  .second-table__td-name {
    font-size: em(14px);
    font-weight: bold;
    text-align: left;
    width: 11em;
    padding-left: 5.65em;
  }
  .second-table__td-value {
    font-size: em(14px);
    font-weight: bold;
    text-align: left;
  }
}

.efficient-frontier-base-aside__parameters-mobile {
  display: none;
  @include ifmobile {
    display: flex;
  }
}

.efficient-frontier-tools {
  display: block;
  padding: em(20px) em(30px) em(0px);
  background: $purple;
  &:last-child {
    padding-bottom: em(20px);
  }

  &__title {
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
  &__arrow-list {
    width: em(12px);
    height: em(9px);
    fill: #ffee57;
    position: absolute;
    right: 17px;

    @include ifparent('.is_visible') {
      transform: scaleY(-1);
    }
  }

  &__items {
    overflow: hidden;
    max-height: 0;

    @include ifparent('.is_visible') {
      min-height: em(380px);
      max-height: 100%;
      margin-top: em(20px);
    }

    .table-mobile {
      width: 100%;
      margin-bottom: em(30px);

      &__td-title {
        width: 50%;
        text-align: center;
        color: $green;
        height: em(40px);
      }
      &__td-name,
      &__td-value {
        color: $white;
        height: em(50px);
        text-align: center;
      }
      &__td-name {
        width: 55%;
        text-align: left;
        padding-left: em(40px);
      }
    }

    .table-mobile-performance {
      width: 100%;
      &__title {
        font-size: em(14px);
        text-transform: uppercase;
        color: $green;
        line-height: em(40px);
      }
      &__td-name,
      &__td-value {
        color: $white;
        height: em(50px);
        text-align: center;
      }
      &__td-name {
        text-align: left;
        width: 55%;
        padding-left: em(40px);
      }
    }
  }
}

.crypto-assets-selection {
  &__title {
    @include ifmobile {
      margin-bottom: em(30px);
    }
  }
  &__base-content {
    @include ifmobile {
      padding-bottom: 0;
    }
  }
  &__content {
    &-subtitle {
      @include ifmobile {
        text-align: center;
        margin-bottom: em(20px);
      }
    }
  }
}
</style>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import NavDashboard from '~/components/nav/NavDashboard';
import DashboardGraph from '~/components/content/dashboard/DashboardGraph';
import DashboardInvestment from '~/components/content/dashboard/DashboardInvestment';
import DashboardMore from '~/components/content/dashboard/DashboardMore';
import QuestionIcon from '~/components/icons/QuestionIcon';
import DashboardRebalancePeriod from '~/components/content/dashboard/DashboardRebalancePeriod';
import DashboardPortfolioContent from '~/components/content/dashboard/DashboardPortfolioContent';
import DashboardCreateNewPortfolio from '~/components/content/dashboard/DashboardCreateNewPortfolio';
import AddToReadyMadePopup from '~/components/content/dashboard/AddToReadyMadePopup';
import DashboardPopup from '~/components/content/dashboard/DashboardPopup';
import DeleteCurrencyPopup from '~/components/content/dashboard/DeleteCurrencyPopup';
import DeletePortfolioPopup from '~/components/content/DeletePortfolioPopup';
import UnpablishedPortfolioPopup from '~/components/content/UnpablishedPortfolioPopup';

export default {
  components: {
    NavDashboard,
    DashboardGraph,
    DashboardInvestment,
    DashboardMore,
    QuestionIcon,
    DashboardPopup,
    AddToReadyMadePopup,
    DashboardPortfolioContent,
    DashboardCreateNewPortfolio,
    DashboardRebalancePeriod,
    DeleteCurrencyPopup,
    DeletePortfolioPopup,
    UnpablishedPortfolioPopup
  },

  data() {
    return {
      // options_portfel: [],
      crons_mask_for_filter_grafs: ['ALL TIME', 'DAY', 'MONTH', 'YEAR'],
      index_time_stamp: '1',
      trailing_stop_coefficient: 0,
      is_trailing_stop: false,
      switchactive: 1,
      ready_made_portfolio_data: {
        name: null,
        description: null
      },
      deleteCurrencyName: '',
      toolsVisible: false,
      is_capitalications_in_btc: false,
      data_select_1: [
        {
          market_title: 'Move in BTC',
          market_id: '1'
        },
        {
          market_title: 'Move in USD',
          market_id: '2'
        }
      ],
      data_select_2: [
        {
          market_title: 'Bitcoin',
          market_id: '1'
        },
        {
          market_title: 'USD',
          market_id: '2'
        }
      ]
    };
  },

  computed: {
    ...mapState('page', [
      'dataGrafForAllTime',
      'dataGrafForDay',
      'dataGrafForMonth',
      'dataGrafForYear',
      'activePortfelCoinList',
      'shortStatisticsData',
      'shortPortfolioList',
      'bestReadeMadePortfolio',
      'userInfo',
      /*---new variable---*/

      'userMarketList',
      'activeMarket',
      'idActivePortfolio',
      'portfolioInformations',
      'readyMadeInfo',
      'optionsForDashboard'
    ]),

    options_portfel() {
      return this.optionsForDashboard;
    },

    show_element() {
      if (this.id_portfel == 'all') {
        return false;
      } else {
        return true;
      }
    },

    active_market: {
      /* all or any name market */
      get() {
        return this.activeMarket;
      },
      set(value) {
        this.setActiveMarket(value);
      }
    },

    id_portfel: {
      get() {
        return this.idActivePortfolio;
      },

      set(value) {
        if (value.market_title) {
          this.setIdActivePortfolio(value.market_title);
        } else {
          this.setIdActivePortfolio(value);
        }
      }
    },

    get_portfolio_informations() {
      return this.portfolioInformations;
    },

    user_markets_list() {
      let buff = {
        market: [],
        value: []
      };
      for (let item of this.userMarketList) {
        buff.market.push(item.market);
        buff.value.push(item.balance_portfel_usd);
      }
      return buff;
    },

    get_status_account() {
      return this.userInfo.status_account;
    },

    get_account_name() {
      // """return best ReadeMade Portfolio from store"""
      return this.userInfo.login;
    },

    best_reade_made_portfolio_info: {
      // """return best ReadeMade Portfolio from store"""
      get() {
        return this.bestReadeMadePortfolio;
      }
    },

    short_portfolio_list: {
      // """return short portfolio list from store"""
      get() {
        if (this.id_portfel == 'all') return this.shortPortfolioList;
        else {
          return this.shortPortfolioList.filter(item => {
            if (item.market.market_title == this.id_portfel) return item;
          });
        }
      }
    },

    get_portfels_coin_lists: {
      // """return portfel coin list"""
      get() {
        return this.activePortfelCoinList;
      }
    },

    get_one_portfel_coin_list() {
      // """return portfel coin list"""
      if (this.id_portfel != 'all') {
        return this.activePortfelCoinList[0];
      } else {
        return {
          name: '',
          market: {
            market_title: '',
            market_id: '0'
          },
          values: [
            {
              full_name: '',
              statistics: {
                all: 0,
                day: 0,
                month: 0,
                year: 0
              },
              balance: 0
            }
          ]
        };
      }
    },

    get_return_usd_time_stamp() {
      if (this.get_portfel_graf_data.statistics.return_usd) {
        return this.get_portfel_graf_data.statistics.return_usd;
      } else {
        return '0';
      }
    },

    get_return_btc_time_stamp() {
      if (this.get_portfel_graf_data.statistics.return_btc) {
        return this.get_portfel_graf_data.statistics.return_btc;
      } else {
        return '0';
      }
    },

    get_return_persent_time_stamp() {
      if (this.get_portfel_graf_data.statistics.return_persent) {
        return this.get_portfel_graf_data.statistics.return_persent;
      } else {
        return '0';
      }
    },

    get_portfel_graf_data() {
      switch (this.index_time_stamp) {
        case '0' || 0:
          return this.dataGrafForAllTime;
        case '1' || 1:
          return this.dataGrafForDay;
        case '2' || 2:
          return this.dataGrafForMonth;
        case '3' || 3:
          return this.dataGrafForYear;
      }
    },

    get_ready_made_info() {
      return this.readyMadeInfo;
    },

    data_graf() {
      let params = {
        pdate: this.get_portfel_graf_data.portfolios_data.values.pdate,
        series: null
      };
      if (this.is_capitalications_in_btc) {
        params.series = [
          {
            name: 'Capitalizations in BTC',
            data: this.get_portfel_graf_data.balance_in_bitcoins.value
          }
        ];
      } else {
        params.series = [
          {
            name: 'Capitalizations in USD',
            data: this.get_portfel_graf_data.portfolios_data.values.value
          }
        ];
      }
      return params;
    }
  },

  watch: {
    id_portfel() {
      this.active_market = this.set_active_market(this.id_portfel);
      this.setChangeTimestamp(0, this.id_portfel);
      this.setChangeTimestamp(1, this.id_portfel);
      this.setChangeTimestamp(2, this.id_portfel);
      this.setChangeTimestamp(3, this.id_portfel);
    }
  },

  mounted() {
    // console.log('----mounted dashboard----');
    // if (!this.$cookies.get('secret_token')) {
    //   this.$router.push({ path: '/landing-modal/hello/' });
    // } else {
    this.getPortfels(this.id_portfel);
    this.is_trailing_stop = this.get_portfolio_informations.is_trailing_stop;
    this.trailing_stop_coefficient = this.get_portfolio_informations.trailing_stop_coefficient;
    this.getShortPortfolioInfo();
    this.setChangeTimestamp(0, this.id_portfel);
    this.setChangeTimestamp(1, this.id_portfel);
    this.setChangeTimestamp(2, this.id_portfel);
    this.setChangeTimestamp(3, this.id_portfel);
    // }
  },

  methods: {
    ...mapActions('page', [
      'getShortPortfolioInfo',
      'publishReadyMadePortfolio',
      'getPortfels',
      'makeRequestSetTrellinStopCoefficient',
      'makeRequesPostTimeStampPortfelData'
    ]),

    ...mapMutations('page', [
      'setPopup',
      'setDataGrafForAllTime',
      'setDataGrafForDay',
      'setDataGrafForMonth',
      'setDataGrafForYear',
      'setShortPortfolioList',
      /* new method */
      'setActiveMarket',
      'setIdActivePortfolio'
    ]),

    updateSetPopup() {
      if (this.get_ready_made_info.is_published)
        this.setPopup('unpablished-portfolio-popup');
      else {
        this.setPopup('add-to-ready-made-popup');
      }
    },

    set_active_market(id_portfel) {
      let active_market;
      for (let item of this.userMarketList) {
        if (id_portfel == item.market.market_title) {
          active_market = {
            market_title: item.market.market_title,
            market_id: item.market.market_id,
            portfel_id: item.market.portfel_id,
            balance: item.balance_portfel_usd
          };
          break;
        }
      }
      return active_market;
    },

    setChangeTimestamp(index_time_stamp, id_portfel) {
      let params = {
        params: {
          hidden_crons_mask: index_time_stamp,
          set_crons_mask_button: ''
        },
        id_portfel: id_portfel
      };
      this.makeRequesPostTimeStampPortfelData(params);
    },

    set_data(value) {
      console.log('ready_made_portfolio_data');
      this.ready_made_portfolio_data = value;

      this.publishReadyMadePortfolio({
        id_portfels: this.id_portfel,
        name: this.ready_made_portfolio_data.name,
        description: this.ready_made_portfolio_data.description,
        load_ready_made_portfel_button: ''
      });
    },

    setRequestSetTrellinStopCoefficient() {
      let params = {
        id_portfels: this.id_portfel,
        trailing_stop_coefficient: this.trailing_stop_coefficient,
        trailing_stop_flag: this.is_trailing_stop,
        trailing_stop_form_button: ''
      };
      this.makeRequestSetTrellinStopCoefficient(params);
    },

    getStatus() {
      if (this.get_status_account == 0 || this.get_status_account == 1) {
        this.is_trailing_stop = false;
        this.setPopup('upgrade-pro-popup');
      }
      if (this.get_status_account == 2) {
        this.setRequestSetTrellinStopCoefficient();
        return this.is_trailing_stop;
      }
    }
  }
};
</script>

<template>
  <div class="dashboard">
    <NavDashboard class="dashboard__nav" />

    <BaseContainer>
      <div class="dashboard__content">
        <div class="dashboard__top-container">
          <div class="dashboard__headline-title">
            <BaseHeadline title="Dashboard" />
          </div>
          <div class="dashboard__settings-container">
            <div
              v-show="show_element"
              class="dashboard__settings"
              @click="setPopup('dashboard-popup')"
            >
              <div class="dashboard__settings-title">
                SETTINGS
              </div>
              <BaseSettings class="dashboard__settings-icon" />
            </div>

            <BaseCheckbox
              v-show="show_element"
              :is_active= "get_ready_made_info.is_published"
              class="to-ready-made-desctop"
              @click.native="updateSetPopup()"
            >
              Add to Ready-Made
            </BaseCheckbox>
          </div>
        </div>
        <BaseSwitch
          :items="crons_mask_for_filter_grafs"
          :active="switchactive"
          :index="index_time_stamp"
          v-model="index_time_stamp"
          class="dashboard__time-switch-mobile"
        />

        <div class="dashboard__graph-slider">
          <span class="graph-slider__title">$USD</span>
          <BaseCheckboxSlider2
            v-model="is_capitalications_in_btc"
            :is-active="is_capitalications_in_btc"
            class="graph-slider__slider"
          />
          <span class="graph-slider__title">BTC</span>
        </div>
        <DashboardGraph
          :series="data_graf.series"
          :timestamp_graph="data_graf.pdate"
          class="dashboard__graph"
        />
        <DashboardInvestment
          :is_capitalications_in_btc ="is_capitalications_in_btc"
          :maxdrawndawn="
            get_portfolio_informations.short_statistics_data.max_drawndawn
          "
          :portfoliovalue="
            get_portfolio_informations.short_statistics_data.portfolio_value
          "
          :portfoliovalue_btc="
            get_portfolio_informations.short_statistics_data.portfolio_value_in_btc
          "
          :get_return_persent_time_stamp="get_return_persent_time_stamp"
          :get_return_usd_time_stamp="get_return_usd_time_stamp"
          :get_return_btc_time_stamp="get_return_btc_time_stamp"
          :totalreturn="
            get_portfolio_informations.short_statistics_data.total_return
          "
          :totalreturn_btc="
            get_portfolio_informations.short_statistics_data.total_return_in_btc
          "
          class="dashboard__investment"
        />
      </div>

      <BaseAside class="dashboard__baseaside">
        <div class="dashboard__top-container">
          <BaseSelect
            :list="user_markets_list.market"
            :list-second="user_markets_list.value"
            :currencies="true"
            v-model="id_portfel"
            :myvalue="active_market"
            type="money"
            name="Binance"
            class="dashboard__choose-currency"
          >
            <BaseCurrency
              :title="active_market.market_title"
              :id_market="active_market.market_id"
            />

            <div class="base-select-list__second">
              {{ active_market.balance }}
            </div>
          </BaseSelect>

          <BaseSwitch
            :items="crons_mask_for_filter_grafs"
            :active="switchactive"
            :index="index_time_stamp"
            v-model="index_time_stamp"
            class="dashboard__time-switch"
          />
        </div>

        <div class="dashboard-tools-desktop">
          <div class="dashboard-card dashboard__card">
            <div
              :class="[
                get_return_persent_time_stamp.charAt(0) === '-'
                  ? 'dashboard-card__value_red'
                  : 'dashboard-card__value_green'
              ]"
              class="dashboard-card__value"
            >
              {{ get_return_persent_time_stamp }}%
            </div>
            <div class="dashboard-card__text">
              RETURN %
            </div>
          </div>

          <div class="dashboard-card dashboard__card">
            <div
              :class="[
                get_return_usd_time_stamp.charAt(0) === '-'
                  ? 'dashboard-card__value_red'
                  : 'dashboard-card__value_green'
              ]"
              class="dashboard-card__value"
            >
              <div
                v-if ="!is_capitalications_in_btc">
                {{ get_return_usd_time_stamp }}$
              </div>
              <div
                v-else>
                {{ get_return_btc_time_stamp }}BTC
              </div>
            </div>
            <div class="dashboard-card__text">
              RETURN <span v-if ="!is_capitalications_in_btc">$</span><span v-else>BTC</span>
            </div>
          </div>

          <div 
            v-show="show_element" 
            class="dashboard-card dashboard__card">
            <BaseInput4
              v-model="trailing_stop_coefficient"
              :value="trailing_stop_coefficient"
              type="number"
              name="name"
              placeholder="0%"
              class="dashboard-card__value-input"
            />

            <div 
              v-if="!is_trailing_stop" 
              class="dashboard-card__text">
              SET PERCENTAGE FOR TRAILING STOP
            </div>

            <div 
              v-if="is_trailing_stop" 
              class="dashboard-card__text--after">
              TRAILING STOP
            </div>

            <BaseCheckboxSlider
              v-model="is_trailing_stop"
              class="dashboard-card__checkbox-slider"
              @click.native="getStatus"
            />

            <nuxt-link 
              to="/help/" 
              class="dashboard-card__question-link">
              <QuestionIcon class="dashboard-card__question" />
            </nuxt-link>
          </div>

          <div 
            v-show = "show_element"
            class="emergency-select">
            <div class="emergency-select__title">EMERGENCY OPTION</div>
            <!--"data_select"-->
            <!--:list= "data_select_1"-->
            <!--:list-second="data_select_2"-->
            <BaseSelectEmergency
              :list="['Move in BTC', 'Move in USD']"
              :list-second="['Bitcoin', 'USDT']"
              :currencies="true"
              v-model="deleteCurrencyName"
              type="money"
              name="Binance"
              class="dashboard__choose-currency-select"
            >
              <div class="base-select-list__second">
                SELECT
              </div>
            </BaseSelectEmergency>
          </div>

          <div 
            v-show = "show_element"
            class="dashboard__rebalance-info">
            <BaseButton
              to="/rebalancing-tab"
              type="primary"
              class="dashboard__aside-button"
            >
              Rebalancing TAB
            </BaseButton>
            
            <DashboardRebalancePeriod 
              :periods="options_portfel"
            />
            
          </div>
        </div>

        <div 
          :class="{ is_visible: toolsVisible }" 
          class="dashboard-tools">
          <div
            class="dashboard-tools__title"
            @click="toolsVisible = !toolsVisible"
          >
            PORTFOLIO TOOLS
            <svg 
              class="dashboard-tools__arrow-list" 
              viewBox="0 0 8 6">
              <path
                d="M0.9375 0.71875L4 3.78125L7.0625 0.71875L8 1.65625L4 5.65625L0 1.65625L0.9375 0.71875Z"
              />
            </svg>
          </div>

          <div class="dashboard-tools__items">
            <div 
              v-show = "show_element"
              class="dashboard-tools__rebalance-info">
              <BaseButton
                to="/rebalancing-tab"
                type="primary"
                class="dashboard-tools__aside-button"
              >
                Rebalancing TAB
              </BaseButton>
              <DashboardRebalancePeriod 
                :periods="options_portfel"
              />
            </div>

            <div class="dashboard-tools-card">
              <BaseInput4
                v-model="trailing_stop_coefficient"
                :value="trailing_stop_coefficient"
                type="number"
                name="name"
                placeholder="0%"
                class="dashboard-tools-card__value-input"
              />

              <div 
                v-if="!is_trailing_stop" 
                class="dashboard-tools-card__text">
                SET PERCENTAGE FOR TRAILING STOP
              </div>
              <div
                v-if="is_trailing_stop"
                class="dashboard-tools-card__text--after"
              >
                TRAILING STOP
              </div>
              <BaseCheckboxSlider
                v-model="is_trailing_stop"
                class="dashboard-tools-card__checkbox-slider"
                @click.native="getStatus"
              />
            </div>

            <div class="dashboard-tools__emergency-select">
              <div class="dashboard-tools__emergency-select__title">
                EMERGENCY OPTION
              </div>
              <BaseSelectEmergency
                :list="['Move in BTC', 'Move in USD']"
                :list-second="['Bitcoin', 'USDT']"
                :currencies="true"
                v-model="deleteCurrencyName"
                type="money"
                name="Binance"
                class="dashboard-tools__choose-currency-select"
              >
                <div class="base-select-list__second">
                  SELECT
                </div>
              </BaseSelectEmergency>
            </div>
            <div 
              v-if="show_element" 
              class="dashboard-tools__to-ready-made">
              <BaseCheckbox
                :is_active= "get_ready_made_info.is_published"
                class="to-ready-made-mobile"
                @click.native="updateSetPopup()"
              >
                Add to Ready-Made
              </BaseCheckbox>
            </div>
          </div>
        </div>
      </BaseAside>
    </BaseContainer>

    <BaseContainer :single="true">
      <DashboardPortfolioContent
        v-for="(item, index) in get_portfels_coin_lists"
        :key="index"
        :portfeldata="item.values"
        :portfelname="item.name"
        :portfelmarket="item.market"
        class="rebalancing-tab__content"
      />
    </BaseContainer>
    <BaseContainer 
      :single="true" 
      class="dashboard-container">
      <DashboardCreateNewPortfolio
        :short_portfolio_list="short_portfolio_list"
        :name="get_account_name"
      />
    </BaseContainer>

    <DashboardMore
      v-if = "best_reade_made_portfolio_info"
      :ready_made_portfolio="best_reade_made_portfolio_info"
      class="dashboard__more"
    />
    <DeleteCurrencyPopup
      :delete-currency-name="deleteCurrencyName"
      class="dashboard__delete-currency-popup"
    />

    <DashboardPopup
      :portfolio_id="id_portfel"
      :get_one_portfel_coin_list="get_one_portfel_coin_list"
      :balance="active_market.balance"
      class="dashboard__popup"
    />
    <AddToReadyMadePopup
      class="dashboard__add-to-ready-made-popup"
      @setmadeportfolio="set_data"
    />
    <DeletePortfolioPopup
      class=""/>
      
    <UnpablishedPortfolioPopup
      class=""/>
  </div>
</template>

<style lang="scss" scoped>
.dashboard__headline-title {
  @include ifmobile {
    background: $purple;
    text-align: center;
    color: $white;
  }
}
.dashboard {
  &__baseaside {
    width: em(262px);
    @include ifmobile {
      width: 100%;
    }
  }
  .dashboard-container {
    padding-bottom: 0;
  }
  &__nav {
    @include ifmobile {
      display: none;
    }
  }
  &__content {
    @include ifdesktop {
      width: em(720px);
    }
  }
  &__top-container {
    position: relative;
    @include ifdesktop {
      height: em(100px);
      margin-bottom: em(10px);
    }
  }
  &__choose-currency {
    width: 100%;
    margin-bottom: em(25px);
    @include ifmobile {
      display: none;
    }
  }
  &__choose-currency-select {
    width: em(130px);
    /*height: em(30px);*/
    @include ifmobile {
      // display: none;
    }
  }
  &__time-switch {
    $size: 13.3px;
    font-size: em($size);
    @include ifmobile {
      display: none;
    }
  }
  &__time-switch-mobile {
    @include ifdesktop {
      display: none;
    }
    justify-content: center;
    margin: em(20px) 0 em(30px);
  }
  &__aside-help {
    margin-top: em(40px);
  }
  &__investment {
    margin-top: em(40px);
  }
  &__banner {
    display: block;
    width: 100%;
    margin-top: em(30px);
    @include ifmobile {
      display: none;
    }
  }

  &__settings-container {
    position: absolute;
    top: em(8px);
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  &__settings {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: em(34px);

    @include ifmobile {
      display: none;
    }

    &-title {
      $size: 12px;
      font-size: em($size);
      font-weight: bold;
      color: $blue;
      margin-right: em(8px, $size);
    }

    &-icon {
      fill: $blue;
      transition: fill $speed;
    }
  }

  &__card {
    margin-bottom: em(5px);
  }

  &__aside-button {
    margin-right: em(23px);
    min-width: em(210px);
    @include ifmobile {
      display: none;
    }
  }

  &__more {
    @include ifmobile {
      display: none;
    }
  }

  &__graph {
    @include ifmobile {
      margin: 0 em(2px);
    }
  }

  &__rebalance-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: em(28px);
  }
  .base-container_single {
    padding-top: 0;
  }

  &__graph-slider {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: em(15px);
    .graph-slider__slider {
      margin-right: em(10px);
      margin-left: em(10px);
    }
  }
}

.dashboard-card {
  position: relative;
  box-sizing: border-box;

  @include ifdesktop {
    min-height: em(156px);
    border: 1px solid $grey;
    padding: em(28px) em(16px) em(16px) em(30px);
  }
  @include ifmobile {
    border-bottom: 1px solid $grey;
    padding: em(15px) 0;
    margin: 0 em(15px);
  }

  &__value {
    $size: 26px;
    font-size: em($size);

    &-input {
      width: 100%;
      max-width: em(100px);
      margin-bottom: em(10px);
    }
    &_red {
      color: $red;
    }
    &_green {
      color: $green;
    }
  }

  &__text {
    $size: 11px;
    font-size: em($size);
    font-weight: bold;
  }
  &__text--after {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
  }

  &__question {
    position: absolute;
    top: em(30px);
    right: em(18px);
    width: em(20px);
    height: em(20px);
    fill: $grey;
    transition: fill $speed;

    &:hover {
      fill: $blue;
    }
  }

  &__checkbox-slider {
    margin-top: em(12px);
    @include ifmobile {
      position: absolute;
      top: 25%;
      right: 0;
    }
  }

  &__question-link {
    @include ifmobile {
      display: none;
    }
  }
}

.to-ready-made-desctop {
  @include ifmobile {
    display: none;
  }
}
.emergency-select {
  background: #e4745c;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: em(13px) em(10px) em(13px) em(10px);

  &__title {
    color: $white;
    font-size: em(10px);
    text-transform: uppercase;
    margin-right: em(15px);
  }
  .base-select-list__second {
    font-size: em(12px);
    text-align: right;
    color: #c4c4c4;
  }
}

.dashboard-tools-desktop {
  @include ifmobile {
    display: none;
  }
}

.dashboard-tools {
  display: none;
  @include ifmobile {
    display: block;
    padding: em(20px) em(30px) em(20px);
    background: $purple;
  }

  &__items {
    @include ifdesktop {
      display: flex;
      margin-top: em(30px);
    }
    @include ifmobile {
      overflow: hidden;
      max-height: 0;
      transition: max-height $speed linear;
    }
    @include ifparent('.is_visible') {
      min-height: 18em;
      max-height: 100%;
    }
    .dashboard-tools__rebalance-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-top: em(30px);
      margin-bottom: em(25px);
      @include ifmobile {
        justify-content: space-around;
      }
    }
    .dashboard-tools-card {
      background: $white;
      border-radius: 4px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      position: relative;
      padding: em(7px) em(16px) em(10px);
      margin-bottom: em(25px);
      margin-top: em(25px);
      .dashboard-tools-card__value-input {
        width: 100%;
        max-width: 6.25em;
        margin-bottom: 0.625em;
      }
      .dashboard-tools-card__text,
      .dashboard-tools-card__text--after {
        font-size: em(10px);
        font-weight: bold;
      }
      .dashboard-tools-card__checkbox-slider {
        position: absolute;
        right: em(30px);
        top: 35%;
      }
    }
    .dashboard-tools__emergency-select {
      border-radius: 4px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      background: #e4745c;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: em(13px) em(10px) em(13px) em(10px);
      margin-bottom: em(25px);
      height: em(67px);

      &__title {
        color: $white;
        font-size: em(10px);
        text-transform: uppercase;
        margin-right: em(15px);
      }
      .dashboard-tools__choose-currency-select {
        width: 8.125em;
      }
      .base-select-list__second {
        font-size: em(12px);
        text-align: right;
        color: #c4c4c4;
      }
    }
    .dashboard-tools__to-ready-made {
      width: 100%;
      text-align: center;
      .to-ready-made-mobile {
        color: $white;
      }
    }
  }
  &__title {
    $size: 14px;
    font-size: em($size);
    font-weight: bold;
    color: $grey;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  &__arrow-list {
    width: em(12px);
    height: em(9px);
    fill: $grey;
    position: absolute;
    right: 17px;
    top: 5px;

    @include ifdesktop {
      display: none;
    }

    @include ifparent('.is_visible') {
      transform: scaleY(-1);
    }
  }
}
</style>

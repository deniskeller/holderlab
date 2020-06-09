<script>
import { mapState, mapMutations, mapActions } from 'vuex';

// import ApiServiceRebalance from '@/services/ApiServiceRebalance';
// import ApiServiceOther from '@/services/ApiServiceOther';

import NavDashboard from '~/components/nav/NavDashboard';
import RebalancingTabContent from '~/components/content/rebalancing-tab/RebalancingTabContent';
import RebalancingLoadPortfolioPopup from '~/components/content/rebalancing-tab/RebalancingLoadPortfolioPopup';

export default {
  components: {
    NavDashboard,
    RebalancingLoadPortfolioPopup,
    RebalancingTabContent
  },

  data() {
    return {
      flagShowModalRebalance: true
    };
  },

  computed: {
    ...mapState('page', [
      'isFlagPortfolioUpdate',
      'userInfo',
      'userMarketList',
      'idActivePortfolio',
      'activeMarket',
      'portfolioCoinList',
      'activeRebalancePortfolio',
      'lastRebalanceDate',
      'rebalanceOptions',
      'isSaveOptionButtom',
      'isChangePortfolioList',
      'backupPortfolios',
      'savedPortfolios',
      'isChangeAndRebalansePortfolioList',
      'isLoadsSavedPortfolio',
      'loadPortfolioButton'
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

    is_computed_flag_show_modal: {
      get() {
        if (this.isVipAcc) return false;
        else return this.flagShowModalRebalance;
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

    portfolio_coin_list: {
      get() {
        return this.portfolioCoinList;
      },
      set(value) {
        let buff = [];
        for (let item of value) {
          buff.push({
            id_coin: item.id_coin,
            asset_price: item.asset_price,
            piece_of_coin: item.piece_of_coin,
            is_accumulation: item.is_accumulation,
            percent: item.percent,
            percent_real: item.percent_real,
            rebalance: item.rebalance,
            change: item.change,
            short: item.short,
            title: item.title,
            statistics: item.statistics
          });
        }
        this.setAllPortfolioCoinList(buff);
      }
    },

    active_rebalance_portfolio: {
      // """return portfel coin list """
      get() {
        try {
          return this.activeRebalancePortfolio;
        } catch (err) {
          return [];
        }
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

    stack_saved_portfolios: {
      get() {
        return this.savedPortfolios;
      },
      set(value) {
        this.setSavedPortfolios(value);
      }
    },

    stack_backup: {
      get() {
        return this.backupPortfolios;
      },
      set(value) {
        this.setBackupPortfolios(value);
      }
    },

    rebalance_options: {
      get() {
        return this.rebalanceOptions;
      },
      set(value) {
        this.setRebalanceOptions(value);
      }
    },

    last_rebalance_date: {
      get() {
        return this.lastRebalanceDate;
      },
      set(value) {
        this.setLastRebalanceDate(value);
      }
    },

    user_markets_list() {
      let buff = {
        market: [],
        value: []
      };
      for (let item of this.userMarketList) {
        try {
          if (item.market.market_title != 'all') {
            buff.market.push(item.market);
            buff.value.push(item.balance_portfel_usd);
          }
        } catch (e) {
          console.log(e);
        }
      }
      return buff;
    }
  },

  watch: {
    id_portfel() {
      if (this.id_portfel == 'all') {
        this.$router.push({ path: '/dashboard/' });
      } else {
        this.showActualPortfolio({
          id_portfels: this.id_portfel
        });
      }
    },

    isFlagPortfolioUpdate() {
      this.showActualPortfolio({
        id_portfels: this.id_portfel
      });
    },

    isLoadsSavedPortfolio() {
      this.showActualPortfolio({
        id_portfels: this.id_portfel
      });
    },

    isSaveOptionButtom() {
      this.make_request_change_options(this.id_portfel);
    },

    isChangePortfolioList() {
      let params = {
        id_portfel: this.id_portfel,
        is_rebalance_now: false
      };
      this.make_request_change_portfolio_coin_list(params);
    },

    isChangeAndRebalansePortfolioList() {
      let params = {
        id_portfel: this.id_portfel,
        is_rebalance_now: true
      };
      this.make_request_change_portfolio_coin_list(params);
    }
  },

  mounted() {
    // if (!this.$cookies.get('secret_token')) {
    //   this.$router.push({ path: '/landing-modal/hello/' });
    // } else {
    if (this.active_market.market_title == 'all') {
      for (let item of this.user_markets_list.market) {
        if (item.market_title != 'all') {
          this.id_portfel = item.market_title;
          break;
        }
      }
    }
    if (this.id_portfel == 'all') {
      this.$router.push({ path: '/dashboard/' });
    } else {
      this.showActualPortfolio({
        id_portfels: this.id_portfel
      });
    }
    // }

    // console.log('----mounted load_portfolio_button----');
    // if (!this.$cookies.get('secret_token')) {
    //   this.$router.push({ path: '/landing-modal/hello/' });
    // } else {
    this.setOnLoadPortfolioButton();
    // }
  },

  beforeDestroy() {
    this.setOffLoadPortfolioButton();
  },

  methods: {
    ...mapActions('page', [
      'postSavedPortfolios',
      'showActualPortfolio',
      'postChangeOtionsPortfolio',
      'postChangePortfolioCoinList'
    ]),
    ...mapMutations('page', [
      'setMessageSuccess',
      'setPopup',
      'setIdActivePortfolio',
      'setActiveMarket',
      'setPortfolioInformations',
      'setActivePortfelCoinList',
      'setActiveRebalancePortfolio',
      'setAddItemInSelectedCoinList',
      'setAllPortfolioCoinList',
      'setLastRebalanceDate',
      'setRebalanceOptions',
      'setBackupPortfolios',
      'setSavedPortfolios',
      'setOnLoadPortfolioButton',
      'setOffLoadPortfolioButton',
      'setIsFlagPortfolioUpdate'
    ]),

    usePro(modal) {
      if (this.is_computed_flag_show_modal) {
        // this.setPopup('upgrade-popup');
        this.setPopup(modal);
      } else {
        this.setPopup(modal);
      }
    },

    setIsFlagPortfolioUpdate() {
      this.isFlagPortfolioUpdate = !this.isFlagPortfolioUpdate;
    },

    get_actual_portfolio(id_portfels) {
      this.showActualPortfolio({
        id_portfels: id_portfels
      });
    },

    make_request_change_portfolio_coin_list(params) {
      let buff = {};
      for (let item of this.portfolio_coin_list) {
        buff[item.short] = {
          // distribution: Number(item.distribution) / 100,
          distribution: 1,
          piece_of_coin: item.piece_of_coin,
          is_accumulation: item.is_accumulation,
          rebalance: item.rebalance,
          is_accumulation: false,
          percent: item.percent
        };
      }
      this.postChangePortfolioCoinList({
        coin_list: JSON.stringify(buff),
        id_portfels: params.id_portfel,
        is_rebalance_now: params.is_rebalance_now
      });
    },

    make_request_change_options(id_portfels) {
      let param = {
        id_portfels: id_portfels,
        cripto_index: this.rebalance_options.cripto_index,
        porog: this.rebalance_options.threshold_rebalance,
        cron: this.rebalance_options.rebalance_period,
        period: this.rebalance_options.rebalance_time_period
      };
      this.postChangeOtionsPortfolio(param);
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
    }
  }
};
</script>

<template>
  <div class="rebalancing-tab">
    <NavDashboard class="rebalancing-tab__nav" />
    <BaseContainer :single="true">
      <div class="rebalancing-tab__headline">
        <BaseHeadline
          title="Rebalance tab"
          class="rebalancing-tab__headline-title"
        />
      </div>

      <div class="rebalancing-tab__header-buttons">
        <BaseButton
          class="rebalancing-tab__header-button"
          @click.native="setPopup('rebalancing-load-portfolio-popup')"
        >
          SAVED PORTFOLIOS
        </BaseButton>

        <BaseButton
          class="rebalancing-tab__header-button"
          @click.native="usePro('rebalancing-tab-popup')"
        >
          EDIT WEIGHT
        </BaseButton>
        
        <BaseSelect
          :list="user_markets_list.market"
          :list-second="user_markets_list.value"
          :currencies="true"
          v-model="id_portfel"
          :myvalue="active_market"
          type="money"
          name="Binance"
          class="rebalancing-tab__choose-currency"
        >
          <BaseCurrency
            :title="active_market.market_title"
            :id_market="active_market.market_id"
          />

          <div class="base-select-list__second">
            {{ active_market.balance }}
          </div>
        </BaseSelect>
      </div>

      <RebalancingTabContent
        :rebalance_options="rebalance_options"
        :last_rebalance_date="last_rebalance_date"
        :portfels_coin_lists="active_rebalance_portfolio"
        :selected_coins="portfolio_coin_list"
        class="rebalancing-tab__content"
      />
    </BaseContainer>
    <RebalancingLoadPortfolioPopup class="" />
    
  </div>
</template>

<style lang="scss" scoped>
.rebalancing-tab__headline {
  margin-bottom: 0;
  @include ifmobile {
    background: $purple;
    text-align: center;
    color: $white;
  }
}
.rebalancing-tab__headline-title {
  margin-bottom: 0;
}
.rebalancing-tab {
  &__nav {
    @include ifmobile {
      display: none;
    }
  }
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: em(40px);
  }
  &__header-buttons {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: em(20px) 0 em(30px) 0;
    @include ifmobile {
      justify-content: center;
      margin: em(20px) 0 em(30px) 0;
    }
  }
  &__header-button {
    margin: 0 em(4px);
  }
  &__banner {
    width: 100%;
    display: block;
    margin-bottom: em(15px);
  }

  &__choose-currency {
    width: em(262px);
    margin-left: em(30px);
    @include ifmobile {
      display: none;
    }
  }

  &__plate-tip {
    margin-bottom: em(15px);
  }

  &__plate-buttons {
    display: flex;
    align-items: center;
  }

  &__filter {
    margin-right: em(40px);
  }
}
</style>

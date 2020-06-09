<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import Logo from '~/components/header/Logo';
import User from '~/components/header/User';
import Bell from '~/components/header/Bell';
import HeaderSettings from '~/components/header/HeaderSettings';

export default {
  middleware: 'authenticated',
  components: {
    Logo,
    User,
    Bell,
    HeaderSettings
  },

  data() {
    return {};
  },

  computed: {
    ...mapState('page', [
      'userInfo',
      'userMarketsBalanceList',
      'idActivePortfolio',
      'activeMarket',
      'userMarketList',
      'loadPortfolioButton',
      'count_dont_viewed'
    ]),

    load_portfolio_button: {
      get: function() {
        return this.loadPortfolioButton;
      },
      set: function(value) {
        this.setOffLoadPortfolioButton(value);
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

    active_market: {
      /* all or any name market */
      get() {
        return this.activeMarket;
      },
      set(value) {
        this.setActiveMarket(value);
      }
    },

    status_account() {
      return this.userInfo.status_account;
    },

    user_markets_balance_list() {
      // """return user markets balance list"""
      return this.userMarketsBalanceList;
    },

    user_markets_list: {
      // """return user  market-list from store"""
      get() {
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
      set(value) {
        this.setUserMarketList2(value);
      }
    },

    get_count_dont_viewed: {
      get() {
        return this.count_dont_viewed;
      }
    },

    flag_is_message() {
      if (this.count_dont_viewed > 0) {
        return true;
      }
      return false;
    }
  },

  watch: {
    // id_portfel: function() {
    //   this.$router.push({ path: '/landing-modal/hello/' });
    // },

    id_portfel: function() {
      this.active_market = this.set_active_market(this.id_portfel);
      this.getPortfels(this.id_portfel);
      this.postSavedPortfolios({
        market_name: this.id_portfel,
        type_portfolio: 'both'
      });
      this.setFlagShowEffectiveMargin(false);
      this.setTableDataBackTest([]);
      this.clearBigPoolWeightEfficientFrontier();
      this.cleatBigStatisticDataEfficientFrontier();
      this.setDataGraphPerformanceBackTestUsd([]);
      this.setDataGraphPerformanceBackTestBtc([]);
      this.setDataGraphDeviation([]);
    }
  },

  mounted() {},

  methods: {
    ...mapActions('page', [
      'makeRequestWhiteList',
      'getPortfels',
      'getBalance',
      'postSavedPortfolios'
    ]),

    ...mapMutations('page', [
      'setDataGraphPerformanceBackTestUsd',
      'setDataGraphPerformanceBackTestBtc',
      'setDataGraphDeviation',
      'setActiveMarket',
      'setUserMarketList2',
      'setTableDataBackTest',
      'setIdActivePortfolio',
      'setPopup',
      'setUserInfo',
      'setOffLoadPortfolioButton',
      'clearBigPoolWeightEfficientFrontier',
      'cleatBigStatisticDataEfficientFrontier',
      'setFlagShowEffectiveMargin',
      'setCountDontViewed'
    ]),

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
      if (!active_market) {
        return {
          market_title: 'all',
          market_id: '0',
          portfel_id: '0',
          balance: null
        };
      } else return active_market;
    }
  }
};
</script>

<template>
  <div class="header">
    <Logo class="header__logo" />
    <BaseSelect
      :list="user_markets_list.market"
      :list-second="user_markets_list.value"
      :currencies="true"
      v-model="id_portfel"
      :myvalue="active_market"
      type="header-money"
      name="Binance"
      class="header__choose-currency"
    >
      <BaseCurrency
        :title="active_market.market_title"
        :id_market="active_market.market_id"
      />

      <div class="base-select-list__second">
        {{ active_market.balance }}
      </div>
    </BaseSelect>

    <BaseButton
      v-show="load_portfolio_button"
      type="white"
      class="header__rebalance-button"
      @click.native="setPopup('rebalancing-load-portfolio-popup')"
    >
      LOAD PORTFOLIO
    </BaseButton>
    
    <User class="header__user" />
    <HeaderSettings class="header__settings" />
    <Bell 
      :is-active="flag_is_message" 
      class="header__bell" />
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  @include ifdesktop {
    align-items: center;
  }
  @include ifmobile {
    justify-content: flex-end;
    padding: em(30px) em(20px) 0 0;
    box-sizing: border-box;
    background: $purple;
  }

  &__logo {
    margin-left: em(12px);
    width: em(400px);
    @include ifmobile {
      display: none;
    }
  }
  &__choose-currency {
    @include ifdesktop {
      width: em(292px);
      margin-right: em(20px);
    }
    @include ifmobile {
      position: absolute;
      top: em(70px);
      left: em(15px);
      width: calc(100% - 1.875em);
    }
  }
  &__user {
    @include ifdesktop {
      margin-right: em(50px);
    }
    @include ifmobile {
      margin-right: em(17px);
      margin-top: em(-1px);
    }
  }
  &__settings {
    @include ifdesktop {
      margin-right: em(42px);
    }
    @include ifmobile {
      margin-right: em(17px);
    }
  }
  &__rebalance-button {
    $size: 10px;
    font-size: em($size);
    height: em(24px, $size);
    font-weight: normal;
    margin-right: em(17px, $size);
    @include ifdesktop {
      display: none;
    }
  }
}
</style>

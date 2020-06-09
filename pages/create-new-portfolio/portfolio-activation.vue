<script>
/*portfolio-activation.vue*/
import { mapMutations, mapState, mapActions } from 'vuex';
import RebalancingTimeFilterActivationPortfolio from '~/components/content/RebalancingTimeFilter2';
// import RebalancingTimeFilterActivationPortfolio from '~/components/content/RebalancingTimeFilterActivationPortfolio';
import AllocatedAssetItem from '~/components/content/AllocatedAssetItem';
import NavCreateNewPortfolio from '~/components/nav/NavCreateNewPortfolio';
import PlateTip from '~/components/content/PlateTip';
import QuestionIcon from '~/components/icons/QuestionIcon';

export default {
  components: {
    NavCreateNewPortfolio,
    PlateTip,
    AllocatedAssetItem,
    RebalancingTimeFilterActivationPortfolio,
    QuestionIcon
  },

  data() {
    return {
      descriptions: null,
      isButtomActiveClick: false
    };
  },

  computed: {
    ...mapState('page', [
      'analyzedPortfolios',
      'name_portfolio',
      'isSaveOptionButtomInActivatePortfolio',
      'paramsActivatePortfolioTimeFilter',
      'activeMarket',
      'idSavedNewPortfolio',
      'isPathOnNewPortfolio',
      'isDoneRequestActivationNewPortfolio',
      'name_portfolio',
      'isPathOnDashboard',
      'userMarketList',
      'name_portfolio'
    ]),

    active_market: {
      /* all or any name market */
      get() {
        return this.activeMarket;
      }
    },

    balance_in_market() {
      return this.active_market.balance;
    },

    title() {
      return 'Portfolio "' + this.name_portfolio + '" activation';
    },

    rebalance_options: {
      get() {
        return this.paramsActivatePortfolioTimeFilter;
      },
      set(val) {
        this.setParamsActivatePortfolioTimeFilter(val);
      }
    },

    main_portfel_name() {
      if (this.name_portfolio != null && this.name_portfolio != '') {
        return this.name_portfolio;
      }
    },

    get_analyzed_portfolios() {
      return this.analyzedPortfolios;
    },

    percent() {
      let percent = 0;
      for (let item of this.get_analyzed_portfolios) {
        percent += parseFloat(item.percent) || 0;
      }
      return Math.round(percent * 100) / 100;
    },

    is_show() {
      if (this.get_analyzed_portfolios.length > 0) {
        return true;
      } else {
        return false;
      }
    },

    is_activate_portfolio() {
      if (this.is_show && this.percent == 100) {
        return false;
      } else {
        return true;
      }
    }
  },

  watch: {
    isSaveOptionButtomInActivatePortfolio() {
      this.requesPostSavedPortfel(this.rebalance_options);
    },

    isDoneRequestActivationNewPortfolio() {
      console.log('isDoneRequestActivationNewPortfolio');
      if (this.isButtomActiveClick) {
        // this.requesPostSavedPortfel(this.rebalance_options);
        this.isButtomActiveClick = false;
        this.activationNewPortfolio(this.idSavedNewPortfolio);
        this.setIdSavedNewPortfolio(null);
        this.setAllAnalyzedPortfolios([]);
        this.$router.push({ path: '/dashboard' });
      }
    }
  },

  mounted() {
    if (this.get_analyzed_portfolios.length === 0) {
      if (!this.isPathOnDashboard) {
        this.$toast.error('Please download market data').goAway(2500);
        this.$router.push({ path: '/create-new-portfolio/' });
      } else {
        this.setOffPathInDashboard();
        this.$router.push({ path: '/dashboard/' });
      }
    }
  },

  beforeDestroy() {
    if (!this.isPathOnNewPortfolio) {
      // если уход со страницы произведен не на бектест то очищаем стор
      this.setOffPathInDashboard();
      this.setIsShowItemFlagShortEffectiveMargin(false);
      this.clearPoolWeightEfficientFrontier();
      this.clearEfficientFrontierStatisticsData();
      this.clearTempSeriesShortEffectiveMargin();
      this.setParamsActivatePortfolioTimeFilter({
        threshold_rebalance: '0',
        rebalance_time_period: 1,
        rebalance_period: 'day'
      });
    }
  },

  methods: {
    ...mapActions('page', [
      'makeRequesPostSavedPortfel',
      'getMessage',
      'loadedSavedPortfolio'
    ]),
    ...mapMutations('page', [
      'setOnPathInNewPortfolio',
      'setDeepCopySelectedCoinList',
      'copyOptionsBacktestTimeFilterFromActivatePortfolio',
      'setParamsActivatePortfolioTimeFilter',
      'clearEfficientFrontierStatisticsData',
      'clearPoolWeightEfficientFrontier',
      'clearTempSeriesShortEffectiveMargin',
      'setIdSavedNewPortfolio',
      'setAllAnalyzedPortfolios',
      'setIsShowItemFlagShortEffectiveMargin',
      'setOffPathInDashboard'
    ]),

    clickActiveteButtom() {
      console.log('click');
      this.isButtomActiveClick = true;
      this.requesPostSavedPortfel(this.rebalance_options);
    },

    goInBackTest() {
      console.log('goInBackTest');
      this.setOnPathInNewPortfolio();
      this.copyOptionsBacktestTimeFilterFromActivatePortfolio();
      this.setDeepCopySelectedCoinList(this.get_analyzed_portfolios);
      this.$router.push({ path: '/backtest' });
    },

    requesPostSavedPortfel(content) {
      console.log('requesPostSavedPortfel');
      let param = {
        portfel_name: this.main_portfel_name,
        data_portfel: JSON.stringify(this.get_analyzed_portfolios),
        options: JSON.stringify(content),
        description: this.descriptions,
        market: this.active_market.market_title,
        post_saved_portfel_button: ''
      };
      this.makeRequesPostSavedPortfel(param);
    },

    activationNewPortfolio(id_saved_portfels) {
      console.log('activationNewPortfolio');
      if (id_saved_portfels) {
        let params = {
          type_loads_portfolio: 'saved',
          id_: id_saved_portfels,
          market: this.active_market.market_title
        };
        this.loadedSavedPortfolio(params);
      } else {
        let message = {
          message: 'Invalid Saved Portfolio id',
          status: 'error'
        };
        this.getMessage(message);
      }
    }
  }
};
</script>

<template>
  <div class="portfolio-activation">
    <NavCreateNewPortfolio class="portfolio-activation__nav" />

    <BaseContainer>
      <BaseContent>
        <div class="matrix__headline">
          <BaseHeadline
            :title="title"
            class="matrix__headline-title"
          >
            <div class="matrix__headline-subtitle">
              Check your chosen assets and set balancing periods and “voila”
              your portfolio is ready!
            </div>
          </BaseHeadline>
        </div>
        <PlateTip
          title="REBALANCE MODE"
          class="portfolio-activation__plate-tip"
        >
          <RebalancingTimeFilterActivationPortfolio
            v-model="rebalance_options"
            :threshold_rebalance="rebalance_options.threshold_rebalance"
            :rebalance_time_period="rebalance_options.rebalance_time_period"
            :rebalance_period="rebalance_options.rebalance_period"
            class="portfolio-activation__filter"
          />
        </PlateTip>
        <BaseAllocatedHeader 
          :percent="percent" 
          title="Allocated" />
        <div class="portfolio-activation__allocated">
          <BaseScrollBlock2>
            <!--{{ get_analyzed_portfolios }}-->
            <AllocatedAssetItem
              v-for="(item, index) in get_analyzed_portfolios"
              :key="index"
              :balance="balance_in_market"
              :title="item.title"
              :short="item.short"
              :rank="item.rank"
              :price="item.price"
              :hour24="item.change"
              :percent="item.percent"
              :id_coin="item.id_coin"
              :limit_in_coin="item.min_limits_amount"
              :limit_in_usd="item.min_limits_amoun_in_usd"
              :close="false"
              class="portfolio-activation__allocated-asset"
            />
          </BaseScrollBlock2>
        </div>

        <div class="portfolio-activation__buttons">
          <BaseButton
            to="/create-new-portfolio/efficient-frontier"
            type="secondary"
            class="portfolio-activation__button"
          >
            BACK
          </BaseButton>
          <BaseButton
            :is-inactive="is_activate_portfolio"
            type="primary"
            class="portfolio-activation__button"
            @click.native="clickActiveteButtom"
          >
            Activate
          </BaseButton>

          <BaseButton
            :is-inactive="is_activate_portfolio"
            type="orange"
            class="portfolio-activation__button portfolio-activation__button_right"
            @click.native="goInBackTest"
          >
            BACKTEST
            <QuestionIcon class="portfolio-activation__question-icon" />
          </BaseButton>
        </div>
      </BaseContent>

      <BaseAside>
        <BaseHelpBanner2
          href="https://docs.holderlab.io/knowledge-base/threshold-rebalancing-assets/"
          style="background-image: url(/img/help/4.png)"
        >
          ABOUT ASSET<br >BALANCING
        </BaseHelpBanner2>
      </BaseAside>
    </BaseContainer>
  </div>
</template>

<style lang="scss" scoped>
.matrix__headline {
  @include ifmobile {
    background: $purple;
    text-align: center;
    color: $white;
    width: 100%;
  }
  .matrix__headline-subtitle {
    @include ifmobile {
      display: none;
    }
  }
}

.portfolio-activation {
  &__nav {
    @include ifmobile {
      display: none;
    }
  }
  &__plate-tip {
    @include ifdesktop {
      margin: em(40px) 0 em(20px);
    }
    @include ifmobile {
      .time-filter {
        justify-content: center;
      }
      margin-bottom: em(25px);
    }
  }

  &__allocated {
    margin-bottom: em(40px);
  }

  &__buttons {
    position: relative;
    @include ifmobile {
      text-align: center;
    }
  }

  &__button {
    &_right {
      @include ifdesktop {
        position: absolute;
        right: 0;
      }
    }
  }

  &__question-icon {
    width: em(24px);
    height: em(24px);
    fill: $white;
    margin: 0 em(-10px) 0 em(10px);
  }
}
</style>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';

import ApiService from '@/services/ApiService';
import NavCreateNewPortfolio from '~/components/nav/NavCreateNewPortfolio';
import AsideAllocatedAssets from '~/components/content/AsideAllocatedAssets';
import RiskSlider from '~/components/content/efficient-frontier/RiskSlider';
import RiskGraph from '~/components/content/efficient-frontier/RiskGraph';
import EfficientFrontierPopup from '~/components/content/create-new-portfolio/EfficientFrontierPopup';

export default {
  components: {
    NavCreateNewPortfolio,
    AsideAllocatedAssets,
    RiskSlider,
    RiskGraph,
    EfficientFrontierPopup
  },

  data() {
    return {
      series: [],
      time_start: null,
      time_end: null,
      risk_rate: 1,
      // show_item_flag: false,
      buttonInactive: true,
      percent: 0
    };
  },

  computed: {
    ...mapState('page', [
      'analyzedPortfolios',
      'backupAnalyzedPortfolios',
      'efficientFrontierStatisticsData',
      'poolWeightEfficientFrontier',
      'newPortfolio',
      'whiteListForMarkets',
      'activeMarket',
      'tempSeriesShortEffectiveMargin',
      'is_show_item_flag_short_effective_margin'
    ]),

    show_item_flag() {
      return this.is_show_item_flag_short_effective_margin;
    },

    is_inactive_button() {
      if (this.percent != 100) {
        return true;
      } else {
        return false;
      }
    },

    computed_series: {
      get() {
        return this.tempSeriesShortEffectiveMargin;
      },
      set(value) {
        this.setTempSeriesShortEffectiveMargin(value);
      }
    },

    get_portfolios() {
      return this.analyzedPortfolios;
    },

    is_buttom_active() {
      if (
        this.time_start &&
        this.time_end &&
        this.get_coin_name_list.length > 0
      ) {
        return false;
      } else {
        return true;
      }
    },

    get_data_with_market() {
      return this.whiteListForMarkets.data[this.activeMarket.market_title];
    },

    get_pool_weight_efficient_frontier() {
      switch (true) {
        case this.risk_rate == 0:
          return this.poolWeightEfficientFrontier.portfel_max_variance_port;

        case this.risk_rate == 1:
          return this.poolWeightEfficientFrontier.portfel_sharpe_portfolio;

        case this.risk_rate == 2:
          return this.poolWeightEfficientFrontier.portfel_min_variance_port;

        default:
          this.$toast
            .error('Error risk rate (' + this.risk_rate + ')')
            .goAway(1500);
          return this.poolWeightEfficientFrontier.portfel_sharpe_portfolio;
      }
    },

    statistics_data: {
      get: function() {
        switch (true) {
          case this.risk_rate == 0:
            return this.efficientFrontierStatisticsData.min_variance_port;

          case this.risk_rate == 1:
            return this.efficientFrontierStatisticsData.sharpe_portfolio;

          case this.risk_rate == 2:
            return this.efficientFrontierStatisticsData.max_variance_port;

          default:
            this.$toast
              .error('Error risk rate (' + this.risk_rate + ')')
              .goAway(1500);
            return this.efficientFrontierStatisticsData.sharpe_portfolio;
        }
      },

      set: function(newValue) {
        this.setEfficientFrontierStatisticsData(newValue);
      }
    },

    get_coin_name_list() {
      let temp = [];
      for (let item of this.analyzedPortfolios) {
        temp.push(item.title);
      }
      return JSON.stringify(temp);
    },

    get_optimal_porfolio() {
      return this.analyzedPortfolios;
    }
  },

  watch: {
    risk_rate() {
      console.log(this.risk_rate);
      this.set_efficient_frontier_data_in_active_portfel();
    }
  },

  mounted() {
    // console.log('-------EFFICIENT FRONTIER-------');
    // if (!this.$cookies.get('secret_token')) {
    //   this.$router.push({ path: '/landing-modal/hello/' });
    // } else {
    if (this.get_portfolios.length === 0) {
      this.$toast.error('Please download market data').goAway(2500);
      this.$router.push({ path: '/create-new-portfolio/' });
    }
    // }
  },

  methods: {
    ...mapActions('page', ['makeRequesShortEffectiveMargin']),
    ...mapMutations('page', [
      'setUpdateAnalyzedPortfolios',
      'setEfficientFrontierStatisticsData',
      'setTempSeriesShortEffectiveMargin'
    ]),

    percentChange(value) {
      this.buttonInactive = value;
    },

    set_efficient_frontier_data_in_active_portfel() {
      this.setUpdateAnalyzedPortfolios(this.get_pool_weight_efficient_frontier);
    },

    requesShortEffectiveMargin() {
      console.log('---Reques Short Effective Margin---');
      let params = {
        time_start: Math.round(this.time_start / 1000),
        time_end: Math.round(this.time_end / 1000),
        data: this.get_coin_name_list,
        calcul_button: ''
      };
      this.makeRequesShortEffectiveMargin(params);
    },

    calculate() {
      if (this.percent === 100) {
        this.buttonInactive = false;
      } else {
        this.buttonInactive = true;
      }
    }
  }
};
</script>

<template>
  <div class="efficient-frontier">
    <NavCreateNewPortfolio class="efficient-frontier__nav" />
    <BaseContainer>
      <BaseContent>
        <div class="matrix__headline">
          <BaseHeadline
            title="Portfolio optimization"
            class="matrix__headline-title"
          >
            <div class="matrix__headline-subtitle">
              We are looking for the perfect balance between risk and profitability, according to the Markowitz theory, which leads to optimal asset weight
            </div>
          </BaseHeadline>
        </div>

        <div class="calculate-container">
          <div class="calculate-container__select-block">
            <div class="calculate-container__select-block-title">
              START DATE
            </div>

            <BaseDataInput
              v-model="time_start"
              :from="time_end"
              placeholder="DD/MM/YY"
              class="launch-container__select-block-dateinput"
            />
          </div>

          <div class="calculate-container__select-block">
            <div class="calculate-container__select-block-title">END DATE</div>
            <BaseDataInput
              :to="time_start"
              v-model="time_end"
              placeholder="DD/MM/YY"
              class="launch-container__select-block-dateinput"
            />
          </div>

          <BaseButton
            :is-inactive="is_buttom_active"
            type="primary"
            class="calculate-container__launch-button"
            @click.native="requesShortEffectiveMargin"
          >
            CALCULATE
          </BaseButton>
        </div>

        <RiskSlider
          v-show="show_item_flag"
          v-model="risk_rate"
          class="efficient-frontier__risk-slider"
        />

        <div 
          v-show="show_item_flag" 
          class="risk-info">
          <div class="risk-info-item">
            <div class="risk-info-item__value">
              {{ statistics_data.returns }}
            </div>
            <div class="risk-info-item__name">RETURNS</div>
          </div>

          <div class="risk-info-item">
            <div class="risk-info-item__value">
              {{ statistics_data.volatility }}
            </div>
            <div class="risk-info-item__name">VOLATILITY</div>
          </div>

          <div class="risk-info-item">
            <div class="risk-info-item__value">
              {{ statistics_data.sharpe_ratio }}
            </div>
            <div class="risk-info-item__name">SHARPE RATIO</div>
          </div>
        </div>

        <RiskGraph
          v-show="show_item_flag"
          :series="computed_series"
          class="efficient-frontier__risk-graph"
        />

        <div class="efficient-frontier__buttons">
          <BaseButton
            to="/create-new-portfolio/correlation-matrix"
            class="efficient-frontier__button efficient-frontier__button-back"
          >
            BACK
          </BaseButton>
          <BaseButton
            :is-inactive="is_inactive_button"
            to="/create-new-portfolio/portfolio-activation"
            type="primary"
            class="efficient-frontier__button"
          >
            NEXT STEP
          </BaseButton>
        </div>
      </BaseContent>

      <BaseAside class="efficient-frontier__base-aside">
        <BaseHelpBanner2
          href="https://docs.holderlab.io/knowledge-base/cryptocurrency-portfolio-optimization/"
          style="background-image: url(/img/help/3.png)"
          class="efficient-frontier__help-banner"
        >
          ABOUT PORTFOLIO OPTIMIZATION
        </BaseHelpBanner2>
        <AsideAllocatedAssets
          :aside_allocated_assets="get_optimal_porfolio"
          v-model="percent"
          title="YOUR OPTIMAL PORTFOLIO WEIGHTS"
          subtitle="Asset weights"
          class="efficient-frontier__aside-allocated-asset"
          @percent="percentChange"
        />
      </BaseAside>
    </BaseContainer>

    <EfficientFrontierPopup
      :aside_allocated_assets="get_optimal_porfolio"
      :data_with_market="get_data_with_market"
      class="efficient-frontier__popup"
    />
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

.efficient-frontier {
  &__nav {
    @include ifmobile {
      display: none;
    }
  }
  &__risk-slider {
    margin-bottom: em(20px);
  }
  &__risk-graph {
    @include ifdesktop {
      margin: em(17px) 0 em(60px);
    }
    @include ifmobile {
      $size: 9px;
      font-size: em($size);
      margin: em(30px, $size) 0 em(30px, $size) em(0px, $size);
    }
  }

  &__aside-plus {
    margin-bottom: em(40px);
  }

  &__aside-allocated-asset {
    margin-bottom: em(6px);
  }

  &__help-banner {
    margin-bottom: em(50px);
  }

  &__buttons {
    @include ifmobile {
      text-align: center;
    }
  }

  &__aside-button {
    margin-left: em(15px);
    @include ifmobile {
      margin-left: calc(50% - 106px);
    }
  }

  &__base-aside {
    padding-bottom: em(50px);
  }
}

.calculate-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  max-width: em(475px);
  width: 100%;
  margin-bottom: em(30px);
  @include ifmobile {
    padding-top: em(30px);
    flex-direction: column;
    align-items: center;
  }
  &__select-block {
    max-width: em(155px);
    width: 100%;
    text-align: center;
    @include ifmobile {
      margin-bottom: em(20px);
    }
    &-title {
      font-size: em(12px);
      line-height: em(18px);
      color: #c4c4c4;
      margin-bottom: em(8px);
    }
  }
  &__balancing {
    text-align: center;
    max-width: em(370px);
    &-title {
      font-size: em(12px);
      line-height: em(18px);
      color: #c4c4c4;
      margin-bottom: em(8px);
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

.risk-info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: em(30px);
  .risk-info-item {
    .risk-info-item__value {
      font-size: em(26px);
      line-height: em(32px);
    }
    .risk-info-item__name {
      font-size: em(14px);
      font-weight: 600;
    }
  }
}
</style>

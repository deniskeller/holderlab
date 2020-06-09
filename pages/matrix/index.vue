<script>
/*index.vue*/
import { mapMutations, mapState, mapActions } from 'vuex';

import matrixAverageAssets from '~/assets/data/matrix-average-assets.json';
import HeatMapCorMat from '~/components/content/matrix/HeatMapCorMat';
import MarketPastGraph from '~/components/content/market/MarketPastGraph';
import MatrixAverageAssets from '~/components/content/matrix/MatrixAverageAssets';
import PlateTip from '~/components/content/PlateTip';

import MatrixAddCurrencies from '~/components/content/matrix/MatrixAddCurrencies';
import AsidePacks from '~/components/aside/AsidePacks';
import MatrixLoadPortfolioPopup from '~/components/content/matrix/MatrixLoadPortfolioPopup';

export default {
  components: {
    HeatMapCorMat,
    MarketPastGraph,
    MatrixAverageAssets,
    PlateTip,
    MatrixAddCurrencies,
    AsidePacks,
    MatrixLoadPortfolioPopup
  },

  data() {
    return {
      cron_id: 3,
      show_coin_type: 2,
      data: null,
      tags: true,
      matrixAverageAssets,
      is_flag_account_update: false
    };
  },

  computed: {
    ...mapState('page', [
      'activePortfelCoinList',
      'bigCorrelationData',
      'selectedCoinList',
      'whiteListForMarkets',
      'activeMarket',
      'loadPortfolioButton'
    ]),

    load_portfolio_button: {
      get: function() {
        return this.loadPortfolioButton;
      },
      set: function(value) {
        this.setOnLoadPortfolioButton(value);
      }
    },

    selected_coins: {
      get() {
        return this.selectedCoinList;
      },
      set(value) {
        this.setAddItemInSelectedCoinList(value);
      }
    },

    // load_portfolio_button: {
    //   get: function() {
    //     return this.loadPortfolioButton;
    //   },
    //   set: function(value) {
    //     this.setLoadPortfolioButton(value);
    //   }
    // },

    // show_portfolio_button() {
    //   if(!this.loadPortfolioButton) {
    //     console.log('biba');
    //     return true;
    //   }
    // },

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

    get_average_value() {
      return this.bigCorrelationData.average;
    },

    get_correlation_data: {
      get() {
        return this.bigCorrelationData;
      },
      set(params) {
        this.setBigCorrelationData(params);
      }
    },

    computed_series() {
      return this.get_correlation_data.data_for_chart;
    },

    get_coin_list() {
      console.log('cor_for_one_coin');
      console.log(this.show_coin_type);
      let buff = [];
      if (this.bigCorrelationData.cor_for_one_coin.length === 0) {
        return buff;
      }
      switch (Number(this.show_coin_type)) {
        case 0:
          for (let item of this.bigCorrelationData.cor_for_one_coin) {
            if (item.values > 0) {
              buff.push(item);
            }
          }
          return buff;

        case 1:
          for (let item of this.bigCorrelationData.cor_for_one_coin) {
            if (item.values < 0) {
              buff.push(item);
            }
          }
          return buff;

        case 2:
          return this.bigCorrelationData.cor_for_one_coin;
      }
    },

    is_show_item() {
      if (this.bigCorrelationData.cor_for_one_coin.length > 0) {
        return true;
      } else {
        // поменять
        return false;
      }
    }
  },

  // watch: {},

  mounted() {
    // if (!this.$cookies.get('secret_token')) {
    //   this.$router.push({ path: '/landing-modal/hello/' });
    // } else {
    //   // console.log('  hi  ');
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
  },

  methods: {
    ...mapActions('page', ['makeRequesShortCalculationMatrix']),

    ...mapMutations('page', [
      'setPopup',
      'setAddAsset',
      'setBigCorrelationData',
      //-------------------------------
      'setDellItemInSelectedCoinList',
      'setAddItemInSelectedCoinList',
      'setLoadPortfolioButton',
      'setOnLoadPortfolioButton',
      'setOffLoadPortfolioButton',
      'setAllSelectedCoinList'
    ]),

    usePro(modal) {
      // if (this.is_flag_account_update) {
      //   this.modal;
      // } else {
      //   this.setPopup('upgrade-popup');
      // }
    },

    requesShortCalculationMatrix() {
      if (this.get_coin_list_from_active_portfolios.length === 0) {
        this.$toast.success('Select coins').goAway(1500);
      } else {
        let params = {
          cron: String(this.cron_id),
          data: JSON.stringify(this.get_coin_list_from_active_portfolios),
          calcul_button: '',
          main: true
        };
        this.makeRequesShortCalculationMatrix(params);
        // .then(response => {
        //   this.get_correlation_data = response.data;
        //   if (response.message != '') {
        //     this.getMessage(response.message, response.status);
        //   }
        // })
        // .catch(error => {
        //   this.$toast.error(error.message).goAway(1500);
        //   console.log('short portfolio info ' + error.message);
        // });
      }
    },

    // async makeRequesShortCalculationMatrix(params) {
    //   const response = await ApiService.short_calculation_matrix(params);
    //   let data = response.data;
    //   return data;
    // },

    getMessage(message, status) {
      if (message != '') {
        switch (status) {
          case 'ok':
            console.log('Message', message);
            this.$toast.success(message).goAway(1500);
            break;
          case 'error':
            console.log('Error:', message);
            this.$toast.error(message).goAway(1500);
            break;
        }
      }
    }
  }
};
</script>

<template>
  <div class="matrix">
    <BaseContainer :single="true">
      <div class="matrix__top-container">
        <div class="matrix__headline">
          <BaseHeadline
            title="Crypto Correlation Matrix "
            class="matrix__headline-title"
          >
            <div class="matrix__headline-subtitle">
              Check the correlation of your portfolio, find uncorrelated or
              slightly correlated cryptocurrencies to create a diversified
              portfolio
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

      <div class="matrix-switcher matrix__switcher">
        <div class="matrix-switcher-col">
          <div class="matrix-switcher__row">
            <div class="matrix-switcher__title">Time</div>
            <BaseSwitch
              v-model="cron_id"
              :active="cron_id"
              :items="['3 MONTH', '6 MONTH', '1 YEAR', '2 YEAR']"
              class="matrix-switcher__switch"
            />
          </div>
        </div>

        <BaseButton
          type="primary"
          class="matrix-switcher__btn"
          @click.native="requesShortCalculationMatrix"
        >
          LAUNCH
        </BaseButton>
      </div>

      <div 
        v-show="is_show_item" 
        class="matrix__content">
        <HeatMapCorMat 
          :series="computed_series" 
          class="matrix__graph" />
      </div>

      <div
        v-show="is_show_item"
        class="correlation-matrix-assets correlation-matrix__assets"
      >
        <div class="correlation-matrix-assets__show">
          <div class="correlation-matrix-assets__show-title">Show</div>
          <!--['CORRELATED', 'NOT CORRELATED', 'ALL']-->
          <BaseSwitch
            :items="['POSITIVE', 'NEGATIVE', 'ALL']"
            :active="show_coin_type"
            v-model="show_coin_type"
            class="correlation-matrix-assets__show-switch"
          />
        </div>

        <PlateTip
          title="THE AVERAGE CORRELATION OF PORTFOLIO"
          class="correlation-matrix-assets__plate-tip"
        >
          <div class="correlation-matrix-assets__plate-tip-number">
            <div
              class="correlation-matrix-assets__plate-tip-number-correlation-value"
            >
              high positive correlation
            </div>
            {{ get_average_value }}
          </div>
        </PlateTip>

        <div class="correlation-matrix-assets__header">
          <div class="correlation-matrix-assets__header-title">ASSETS</div>
          <div class="correlation-matrix-assets__header-title">
            DEGREE OF CORRELATION
          </div>
        </div>

        <BaseScrollBlock class="correlation-matrix-assets__scroll-block">
          <div class="correlation-matrix-assets__average">
            <MatrixAverageAssets
              v-for="(item, index) in get_coin_list"
              :key="index"
              :title="item.name"
              :id_coin="item.id_coin"
              :degree="item.values"
            />
          </div>
        </BaseScrollBlock>
      </div>
    </BaseContainer>

    <BaseContainer class="matrix__content-assets">
      <BaseContent class="crypto-assets-selection__base-content">
        <div class="">
          <BaseTitle 
            type="h3" 
            class="matrix__content-assets-subtitle">
            SELECT ASSETS
          </BaseTitle>
          <MatrixAddCurrencies
            :search="true"
            :pages="true"
            :tags="tags"
            :coin_list="selectedCoinList"
            :whitelist="get_coin_list_from_whitelist"
            class="matrix__add-assets"
          />
        </div>
      </BaseContent>
      <BaseAside class="correlation-matrix__base-aside">
        <div class="correlation-matrix__aside-headline">
          <BaseTitle type="h3">
            GET READY-MADE PORTFOLIO
          </BaseTitle>
          Look at the best performance portfolio
        </div>

        <AsidePacks class="matrix__aside-packs" />
        
      </BaseAside>
    </BaseContainer>
    <MatrixLoadPortfolioPopup 
      type_="saved" 
      class="" />
  </div>
</template>

<style lang="scss" scoped>
.matrix {
  .matrix__headline {
    @include ifmobile {
      background: $purple;
      text-align: center;
      color: $white;
      width: 100%;
    }
    .matrix__headline-subtitle {
      width: 100%;
      max-width: em(550px);
      @include ifmobile {
        display: none;
      }
    }
  }

  &__top-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
    @include ifdesktop {
      height: em(100px);
      margin-bottom: em(43px);
    }
    @include ifmobile {
      margin-bottom: em(15px);
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

  &__switcher {
    margin-bottom: em(50px);
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    @include ifmobile {
      flex-direction: column;
      align-items: center;
    }
    .matrix-switcher-col {
      display: flex;
      flex-direction: column;
      @include ifdesktop {
        width: em(639px);
      }
      @include ifmobile {
        $size: 12px;
        font-size: em($size);
        padding: em(20px, $size) em(15px, $size) 0;
      }
      .matrix-switcher__row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: em(17px);
        @include ifmobile {
          flex-direction: column;
          align-items: center;
        }
        .matrix-switcher__title {
          @include ifmobile {
            text-transform: uppercase;
            margin-bottom: em(10px);
          }
        }
        .matrix-switcher__switch {
          @include ifmobile {
            width: 100%;
            justify-content: space-between;
          }
        }
      }
      .matrix-switcher__row:last-child {
        margin-bottom: 0;
      }
    }

    .matrix-switcher__btn {
      margin-top: em(30px);
    }
  }

  &__content {
    margin-bottom: em(46px);
  }

  .correlation-matrix-assets {
    @include ifmobile {
      margin-bottom: em(40px);
    }
    &__plate-tip {
      @include ifdesktop {
        margin-right: em(60px);
      }
      @include ifmobile {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 em(8px);
        .plate-tip__title {
          margin-bottom: 0;
        }
      }

      &-number {
        $size: 12px;
        font-size: em($size);
        font-weight: bold;
        color: $white;
        display: flex;
        flex-direction: row;
        @include ifmobile {
          justify-content: center;
        }
        &-correlation-value {
          margin-right: em(50px);
          color: #c4c4c4;
        }
      }
    }
    &__header {
      margin-top: em(15px);
      margin-bottom: em(6px);
      display: flex;
      justify-content: space-between;

      @include ifdesktop {
        padding-right: em(62px);
      }
      @include ifmobile {
        padding: 0 em(15px);
      }

      &-title {
        $size: 12px;
        font-size: em($size);
        color: $grey;
        font-weight: bold;
      }
    }
    &__scroll-block {
      /*height: em(600px);*/
    }
    &__show {
      width: 100%;
      max-width: em(639px);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: em(50px);
      @include ifmobile {
        flex-direction: column;
        align-items: center;
        margin-bottom: em(20px);
      }
    }
  }

  &__content-assets {
    padding-top: 0;
    height: 100%;
    .crypto-assets-selection__base-content {
      @include ifmobile {
        padding-bottom: 0;
      }
      .matrix__content-assets-subtitle {
        @include ifmobile {
          text-align: center;
        }
      }
    }
  }

  .correlation-matrix__base-aside {
    @include ifmobile {
      display: none;
    }
  }

  &__add-assets {
    @include ifdesktop {
      margin-bottom: em(80px);
    }
  }
}
</style>

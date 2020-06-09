<script>
/*correlation-matrix.vue*/
import { mapMutations, mapState, mapActions } from 'vuex';
import NavCreateNewPortfolio from '~/components/nav/NavCreateNewPortfolio';
import AsidePacks from '~/components/aside/AsidePacks';
import PlateTip from '~/components/content/PlateTip';
import AverageAsset from '~/components/content/AverageAsset';
import HeatMapCorMatPopup from '~/components/content/matrix/HeatMapCorMatPopup';

export default {
  components: {
    NavCreateNewPortfolio,
    AsidePacks,
    PlateTip,
    AverageAsset,
    HeatMapCorMatPopup
  },

  data() {
    return {
      cron_id: '0',
      show_coin_type: '0'
    };
  },

  computed: {
    ...mapState('page', [
      'analyzedPortfolios',
      'correlationDataForThreeMounth',
      'correlationDataForSixMounth',
      'correlationDataForYear',
      'correlationDataForTwoYear'
    ]),

    get_portfolios() {
      return this.analyzedPortfolios;
    },

    get_analyzed_portfolios() {
      let temp = [];
      for (let item of this.analyzedPortfolios) {
        temp.push(item.title);
      }
      return JSON.stringify(temp);
    },

    get_correlation_data() {
      switch (this.cron_id) {
        case '0':
          return this.correlationDataForThreeMounth;
        case '1':
          return this.correlationDataForSixMounth;
        case '2':
          return this.correlationDataForYear;
        case '3':
          return this.correlationDataForTwoYear;
        default:
          return {
            cor_for_one_coin: [],
            average: 0,
            data_for_chart: [],
            is_default: true
          };
      }
    },

    get_average_value() {
      switch (this.cron_id) {
        case '0':
          return this.correlationDataForThreeMounth.average;
        case '1':
          return this.correlationDataForSixMounth.average;
        case '2':
          return this.correlationDataForYear.average;
        case '3':
          return this.correlationDataForTwoYear.average;
        default:
          return 0;
      }
    },

    get_data_for_chart() {
      switch (this.cron_id) {
        case '0':
          return this.correlationDataForThreeMounth.data_for_chart;

        case '1':
          return this.correlationDataForSixMounth.data_for_chart;

        case '2':
          return this.correlationDataForYear.data_for_chart;

        case '3':
          return this.correlationDataForTwoYear.data_for_chart;
        default:
          return [];
      }
    },

    get_coin_list() {
      let buff = [];
      if (this.get_correlation_data.cor_for_one_coin.length === 0) {
        return buff;
      }
      switch (this.show_coin_type) {
        case '0':
          for (let item of this.get_correlation_data.cor_for_one_coin) {
            if (item.values > 0) {
              buff.push(item);
            }
          }
          return buff;

        case '1':
          for (let item of this.get_correlation_data.cor_for_one_coin) {
            if (item.values < 0) {
              buff.push(item);
            }
          }
          return buff;

        case '2':
          return this.get_correlation_data.cor_for_one_coin;
      }
    }
  },

  mounted() {
    if (this.get_portfolios.length === 0) {
      this.$toast
        .error('Please select coins for your new portfolio.')
        .goAway(2500);
      this.$router.push({ path: '/create-new-portfolio/' });
    } else {
      this.requesShortCalculationMatrix('0');
      this.requesShortCalculationMatrix('1');
      this.requesShortCalculationMatrix('2');
      this.requesShortCalculationMatrix('3');
    }
  },

  methods: {
    ...mapActions('page', ['makeRequesShortCalculationMatrix']),
    ...mapMutations('page', ['setPopup']),

    requesShortCalculationMatrix(cron_id) {
      this.makeRequesShortCalculationMatrix({
        cron: cron_id,
        data: this.get_analyzed_portfolios,
        calcul_button: '',
        main: false
      });
    },

    on_click_change_time_stamp() {
      switch (this.cron_id) {
        case '0':
          if (this.correlationDataForThreeMounth.is_default) {
            this.requesShortCalculationMatrix('0');
          }
          break;

        case '1':
          if (this.correlationDataForSixMounth.is_default) {
            this.requesShortCalculationMatrix('1');
          }
          break;

        case '2':
          if (this.correlationDataForYear.is_default) {
            this.requesShortCalculationMatrix('2');
          }
          break;

        case '3':
          if (this.correlationDataForTwoYear.is_default) {
            this.requesShortCalculationMatrix('3');
          }
          break;

        default:
          this.$toast.error('Error cron ' + this.cron_id + ' key').goAway(1500);
          console.log('Error cron key ' + this.cron_id);
      }
    }
  }
};
</script>

<template>
  <div class="correlation-matrix">
    <NavCreateNewPortfolio class="correlation-matrix__nav" />

    <BaseContainer>
      <BaseContent>
        <div class="matrix__headline">
          <BaseHeadline
            title="Correlation matrix"
            class="matrix__headline-title"
          >
            <div class="matrix__headline-subtitle">
              The main goal of the correlation matrix is to find uncorrelated or weakly correlated cryptocurrencies to create a diversified portfolio
            </div>
          </BaseHeadline>
        </div>

        <div class="correlation-matrix-switcher correlation-matrix__switcher">
          <div class="correlation-matrix-switcher__row">
            <div class="correlation-matrix-switcher__title">Time</div>
            <BaseSwitch
              :active="2"
              :items="['3 MONTH', '6 MONTH', '1 YEAR', '2 YEAR']"
              v-model="cron_id"
              class="correlation-matrix-switcher__switch"
              @click.native="on_click_change_time_stamp"
            />
          </div>
          <div class="correlation-matrix-switcher__row">
            <div class="correlation-matrix-switcher__title">Show</div>
            <BaseSwitch
              :items="['POSITIVE', 'NEGATIVE', 'ALL']"
              :active="2"
              v-model="show_coin_type"
              class="correlation-matrix-switcher__switch"
            />
          </div>
        </div>

        <div class="correlation-matrix-assets correlation-matrix__assets">
          <PlateTip
            title="THE AVERAGE CORRELATION OF THE PORTFOLIO"
            class="correlation-matrix-assets__plate-tip"
          >
            <div class="correlation-matrix-assets__plate-tip-number">
              {{ get_average_value }}
            </div>
          </PlateTip>

          <div class="correlation-matrix-assets__header">
            <div class="correlation-matrix-assets__header-title">
              ASSETS
            </div>
            <div class="correlation-matrix-assets__header-title">
              DEGREE OF CORRELATION
            </div>
          </div>

          <BaseScrollBlock class="correlation-matrix-assets__scroll-block">
            <div class="correlation-matrix-assets__average">
              <AverageAsset
                v-for="(item, index) in get_coin_list"
                :key="index"
                :title="item.name"
                :id_coin="item.id_coin"
                :degree="item.values"
              />
            </div>
          </BaseScrollBlock>

          <div class="correlation-matrix__buttons">
            <BaseButton 
              to="/create-new-portfolio" 
              type="secondary">
              BACK
            </BaseButton>
            <BaseButton
              to="/create-new-portfolio/efficient-frontier"
              type="primary"
            >
              NEXT STEP
            </BaseButton>
          </div>
        </div>
      </BaseContent>

      <BaseAside class="correlation-matrix__base-aside">
        <span @click="setPopup('matrix-graph-popup')">
          <BaseHelpBanner
            style="background-image: url(/img/help/2.png)"
            class="create-new-portfolio__help-banner"
          >
            SHOW MATRIX
          </BaseHelpBanner>
        </span>

        <div class="correlation-matrix__aside-headline">
          <BaseTitle type="h3">
            GET READY-MADE PORTFOLIO
          </BaseTitle>
          Look at the best performance portfolio
        </div>

        <AsidePacks class="create-new-portfolio__aside-packs" />
      </BaseAside>
    </BaseContainer>
    <HeatMapCorMatPopup 
      :series="get_data_for_chart" 
      class="" />
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
    width: 100%;
    max-width: em(650px);
    @include ifmobile {
      display: none;
    }
  }
}

.correlation-matrix {
  &__nav {
    @include ifmobile {
      display: none;
    }
  }
  &__switcher {
    margin-bottom: em(50px);
    @include ifdesktop {
      width: em(513px);
    }
    @include ifmobile {
      $size: 12px;
      font-size: em($size);
      padding: em(20px, $size) em(15px, $size) 0;
    }
  }

  &__base-aside {
    @include ifmobile {
      display: none;
    }
  }

  &__assets {
    @include ifdesktop {
      margin-top: em(15px);
    }

    @include ifdesktop {
      width: 100%;
    }
  }

  &__buttons {
    @include ifmobile {
      text-align: center;
    }
  }

  &__aside-headline {
    padding: 0 em(15px);
  }
}

.correlation-matrix-switcher {
  &__row {
    display: flex;
    justify-content: space-between;
    margin: em(15px) 0;
  }
  &__switch {
    .base-switch__item {
      width: em(130px, 12px);
    }
  }
}

.correlation-matrix-assets {
  &__plate-tip {
    @include ifdesktop {
      margin-right: em(60px);
    }
    @include ifmobile {
      display: flex;
      justify-content: space-between;
      padding-left: em(15px);
      padding-right: em(15px);

      .plate-tip__title {
        margin-bottom: 0;
      }
    }

    &-number {
      $size: 12px;
      font-size: em($size);
      font-weight: bold;
      color: $white;
    }
  }
  &__header {
    margin-top: em(15px);
    margin-bottom: em(6px);
    display: flex;
    justify-content: space-between;

    @include ifdesktop {
      padding-right: em(80px);
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
    /*height: em(608px);*/
    margin-bottom: em(40px);
  }
}
</style>

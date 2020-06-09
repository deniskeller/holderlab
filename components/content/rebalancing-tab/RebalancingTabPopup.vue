<script>
/* RebalancingTabPopup */
import { mapMutations, mapState } from 'vuex';
import RebalanceAddCurrencies from '~/components/content/add-currencies/RebalanceAddCurrencies';
import RebalanceAllocatedAssets from '~/components/content/rebalancing-tab/RebalanceAllocatedAssets';
import AddCurrenciesTags from '~/components/content/add-currencies/AddCurrenciesTags';
import RebalancingStopList from '~/components/content/rebalancing-tab/RebalancingStopList';
import RebalancingAssetList from '~/components/content/rebalancing-tab/RebalancingAssetList';
export default {
  components: {
    RebalanceAddCurrencies,
    RebalanceAllocatedAssets,
    AddCurrenciesTags,
    RebalancingStopList,
    RebalancingAssetList
  },
  props: {
    selected_coins: {
      type: Array,
      default: function() {
        return [];
      }
    },

    data_with_market: {
      type: Array,
      default: function() {
        return [];
      }
    },

    is_rebalance: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // buttonInactive: true
    };
  },
  computed: {
    ...mapState('page', [
      'rebalanceEditPortfolioPercent',
      'activeRebalancePortfolio',
      'portfolioCoinList',
      'percentSelectedCoinList'
    ]),
    get_percent() {
      return this.percentSelectedCoinList;
    },

    percent() {
      let percent = 0;
      for (let item of this.selected_coins) {
        percent += parseFloat(item.percent) || 0;
      }
      return Math.round(percent * 100) / 100;
    },

    is_zero_percent() {
      for (let item of this.selected_coins) {
        if (parseFloat(item.percent) == 0) {
          return true;
        }
      }
      return false;
    },

    buttonInactive() {
      if (this.percent == 100 && !this.is_zero_percent) return false;
      else return true;
    },

    active_rebalance_portfolio() {
      try {
        return this.activeRebalancePortfolio;
      } catch (err) {
        return [];
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
    }
  },
  methods: {
    ...mapMutations('page', [
      'setPopup',
      'setRebalanceEditPortfolioPercent',
      'setAllPortfolioCoinList',
      'setIsChangePortfolioList',
      'setIsChangeAndRebalansePortfolioList'
    ]),
    // percentChange(value) {
    //   this.buttonInactive = value;
    // },

    click_for_cancel_buttom() {
      this.portfolio_coin_list = this.active_rebalance_portfolio;
    },

    click_save_buttom() {
      this.setIsChangePortfolioList();
      this.setPopup(null);
    },

    click_save_and_rebalanse() {
      this.setIsChangeAndRebalansePortfolioList();
      this.setPopup(null);
    }
  }
};
</script>

<template>
  <BasePopup class="rebalancing-tab-popup">
    <BaseHeadline 
      title="Edit portfolio weights" 
      class="base-popup__headline">
      Edit you rebalanced asset weights
    </BaseHeadline>
    <!--<BaseSearchField class="rebalancing-tab-popup__search rebalancing-tab-popup__search-desktop"/>-->
    <!--<AddCurrenciesTags class="rebalancing-tab-popup__tags"/>-->
    <div class="rebalancing-tab-popup__select-list">
      <div class="select-list__stop-block">
        <BaseTitle 
          type="h3" 
          class="stop-block__title"
        >Stoplist (rebalancing is disabled)</BaseTitle
        >
        <RebalancingStopList
          :aside_allocated_assets="selected_coins"
          class="stop-block__items"
        />
      </div>

      <div class="select-list__asset-block">
        <BaseTitle 
          type="h3" 
          class="asset-block__title"
        >Asset Accumulation</BaseTitle
        >
        <RebalancingAssetList
          :aside_allocated_assets="selected_coins"
          class="asset-block__items"
        />
      </div>
    </div>

    <RebalanceAllocatedAssets
      :aside_allocated_assets="selected_coins"
      class="rebalancing-tab-popup__allocated-assets"
      
    />

    <div class="rebalancing-tab-popup__add-title">
      ADD ASSETS
    </div>

    <!--<BaseSearchField class="rebalancing-tab-popup__search rebalancing-tab-popup__search-mobile"/>-->
    <RebalanceAddCurrencies
      :search="true"
      :tags="true"
      :is_rebalance="is_rebalance"
      :coin_list="selected_coins"
      :whitelist="data_with_market"
      class="rebalancing-tab-popup__add-assets"
    />

    <div class="rebalancing-tab-popup__buttons">
      <BaseButton
        type="secondary"
        class="rebalancing-tab-popup__button"
        @click.native="click_for_cancel_buttom"
      >
        CANCEL
      </BaseButton>

      <BaseButton
        :is-inactive="buttonInactive"
        type="primary"
        class="rebalancing-tab-popup__button"
        @click.native="click_save_buttom"
      >
        SAVE
      </BaseButton>

      <BaseButton
        :is-inactive="buttonInactive"
        type="primary"
        class="rebalancing-tab-popup__button"
        @click.native="click_save_and_rebalanse"
      >
        SAVE AND REBALANCE
      </BaseButton>
    </div>
  </BasePopup>
</template>

<style lang="scss" scoped>
.rebalancing-tab-popup {
  &__add-assets {
    margin: em(10px) 0 em(40px) 0;
  }
  &__buttons {
    @include ifmobile {
      text-align: center;
    }
  }
  &__button {
    @include ifmobile {
      $size: 10px;
      font-size: em($size);
    }
  }
  .base-headline {
    border: none;
  }
  &__tags {
    margin: em(20px) 0 em(40px);
  }

  &__select-list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: em(15px);
    @include ifmobile {
      flex-direction: column;
    }
    .select-list__stop-block {
      width: 35%;
      @include ifmobile {
        width: 100%;
      }
      .stop-block__title {
        font-size: em(16px);
        line-height: em(24px);
        text-transform: none;
      }
    }
    .select-list__asset-block {
      width: 59%;
      @include ifmobile {
        width: 100%;
      }
      .asset-block__title {
        font-size: em(16px);
        line-height: em(24px);
        text-transform: none;
      }
    }
  }
  &__add-title {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
    color: $grey;
    margin-top: em(44px, $size);
  }
}

.rebalancing-tab-popup__search-desktop {
  @include ifmobile {
    display: none;
  }
}
.rebalancing-tab-popup__search-mobile {
  display: none;
  @include ifmobile {
    display: block;
  }
}
</style>

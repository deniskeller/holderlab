<script>
import { mapMutations, mapState } from 'vuex';

import PlateTip from '~/components/content/PlateTip';
import TimeFilter from '~/components/content/TimeFilter';
import RebalancingTabItem from '~/components/content/rebalancing-tab/RebalancingTabItem';
import RebalancingTabPopup from '~/components/content/rebalancing-tab/RebalancingTabPopup';

import rebalancingTabItems from '~/assets/data/new-rebalancing-tab-items.json';

export default {
  components: {
    PlateTip,
    TimeFilter,
    RebalancingTabItem,
    RebalancingTabPopup
  },

  props: {
    portfeldata: {
      type: Array,
      default: function() {
        return this.rebalancingTabItems;
      }
    },
    portfelmarket: {
      type: Object,
      default() {
        return { market_title: 'all' };
      }
    },

    portfelname: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      rebalancingTabItems,
      portfel_name: '',
      portfel: '',
      active: true
    };
  },
  computed: {
    ...mapState('page', ['userMarketList']),

    balance_in_market() {
      for (let item of this.userMarketList) {
        if (item.market.market_title == this.portfelmarket.market_title) {
          return item.balance_portfel_usd;
        }
      }
      return 0;
    }
  },

  beforeUpdate() {},

  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <div class="rebalancing-tab-content">
    <div class="rebalancing-tab-headline">
      <div class="rebalancing-tab-headline__title">{{ portfelname }}</div>
      <div 
        v-show="active" 
        class="rebalancing-tab-headline__subtitle--active">
        ACTIVATED
      </div>
      <div
        v-show="!active"
        class="rebalancing-tab-headline__subtitle--noactive"
      >
        NOT ACTIVATED, REBALANCE TO ACTIVATE
      </div>
    </div>
    <!--:fund_percent="item.percent_real"-->
    <RebalancingTabItem
      v-for="(item, index) in portfeldata"
      :key="index"
      :balance="balance_in_market"
      :title="item.full_name"
      :idcoin="item.id_coin"
      :share="item.percent"
      :reduction_name="item.name"
      :change="item.change"
      :asset_price="item.asset_price"
      :fund="item.in_usd"
      :fund_percent="item.percent"
      :index_fund="item.balance"
      :value="item.value"
      :limit_in_usd="item.min_limits_amoun_in_usd"
      :limit_in_coin="item.min_limits_amount"
      class="rebalancing-tab-content__item"
    />

    <RebalancingTabPopup class="rebalancing-tab-content__popup" />
  </div>
</template>

<style lang="scss" scoped>
.rebalancing-tab-content {
  .rebalancing-tab-headline {
    text-align: center;
    font-weight: bold;
    margin-bottom: em(15px);
    @include ifmobile {
      margin-bottom: 0;
      padding: em(20px) 0;
    }
    &__title {
      font-size: em(20px);
      @include ifmobile {
        color: $white;
      }
    }

    &__subtitle--active {
      font-size: em(12px);
      color: $green;
    }
    &__subtitle--noactive {
      font-size: em(12px);
      color: $red;
    }
  }
  @include ifmobile {
    background: $blue;
  }
  &__plate-tip {
    @include ifdesktop {
      margin-bottom: em(15px);
    }
  }

  &__plate-buttons {
    display: flex;
    align-items: center;
    @include ifmobile {
      justify-content: space-between;
    }
  }

  &__filter {
    @include ifdesktop {
      margin-right: em(40px);
    }
    @include ifmobile {
      margin-right: em(6px);
    }
  }

  &__rebalance-button {
    @include ifmobile {
      $size: 10px;
      font-size: em($size);
      height: em(30px, $size);
    }
  }

  &__item {
    @include ifdesktop {
      margin-bottom: em(6px);
    }
    @include ifmobile {
      margin: 0 em(2px) em(2px);
    }
  }
  &__settings {
    position: absolute;
    top: em(28px);
    right: em(15px);
    fill: $white;
    opacity: 0.2;
    @include ifdesktop {
      display: none;
    }
  }
}
</style>

<script>
/*RebalancingTabContent*/
import { mapMutations, mapState } from 'vuex';

import PlateTip from '~/components/content/PlateTip';
import RebalancingTimeFilter from '~/components/content/RebalancingTimeFilter';
import RebalancingLastTime from '~/components/content/RebalancingLastTime';
import RebalancingTabItem from '~/components/content/rebalancing-tab/RebalancingTabItem';
import RebalancingTabPopup from '~/components/content/rebalancing-tab/RebalancingTabPopup';

export default {
  components: {
    PlateTip,
    RebalancingTimeFilter,
    RebalancingTabItem,
    RebalancingTabPopup,
    RebalancingLastTime
  },

  props: {
    portfels_coin_lists: {
      type: Array,
      default: function() {
        return [];
      }
    },
    selected_coins: {
      type: Array,
      default: function() {
        return [];
      }
    },

    rebalance_options: {
      type: Object,
      default() {
        return {
          cripto_index: null,
          threshold_rebalance: 0,
          rebalance_time_period: null,
          rebalance_period: null
        };
      }
    },

    last_rebalance_date: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      is_rebalance: true,
      content: null
    };
  },
  computed: {
    ...mapState('page', [
      'portfolioCoinList',
      'whiteListForMarkets',
      'activeMarket',
      'userMarketList'
    ]),

    balance_in_market() {
      return this.activeMarket.balance;
    },

    get_data_with_market() {
      if (this.activeMarket.market_title == 'all') {
        return [];
      } else {
        return this.whiteListForMarkets.data[this.activeMarket.market_title];
      }
    }
  },
  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <div class="rebalancing-tab-content">
    <!--{{ content }}-->
    <PlateTip
      title="REBALANCE TOOLS"
      class="rebalancing-tab-content__plate-tip"
    >
      <RebalancingLastTime :last_rebalance_date="last_rebalance_date" />
      <div class="rebalancing-tab-content__plate-buttons">
        <RebalancingTimeFilter
          v-model="content"
          :threshold_rebalance="rebalance_options.threshold_rebalance"
          :rebalance_time_period="rebalance_options.rebalance_time_period"
          :cripto_index="rebalance_options.cripto_index"
          :rebalance_period="rebalance_options.rebalance_period"
          class="rebalancing-tab-content__filter"
        />
      </div>
    </PlateTip>
    <BaseScrollBlock>
      <RebalancingTabItem
        v-for="(item, index) in portfels_coin_lists"
        :key="index"
        :balance="balance_in_market"
        :title="item.title"
        :idcoin="item.id_coin"
        :share="item.percent_real"
        :reduction_name="item.short"
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
    </BaseScrollBlock>

    <RebalancingTabPopup
      :is_rebalance="is_rebalance"
      :selected_coins="selected_coins"
      :data_with_market="get_data_with_market"
      class="rebalancing-tab-content__popup"
    />
  </div>
</template>

<style lang="scss">
.rebalancing-tab-content {
  @include ifmobile {
    background: $blue;
  }
  &__plate-tip {
    @include ifdesktop {
      margin-bottom: em(15px);
    }
    @include ifmobile {
      display: flex;
      flex-direction: column;
    }
  }

  &__plate-buttons {
    display: flex;
    align-items: center;
    @include ifmobile {
      justify-content: space-between;
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

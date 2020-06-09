<script>
import { mapMutations, mapState } from 'vuex';
import CircleCounter from '~/components/content/CircleCounter.vue';
export default {
  components: {
    CircleCounter
  },
  props: {
    title: {
      type: String,
      default: null
    },

    market_title: {
      type: String,
      default: 'all'
    },

    idcoin: {
      type: String,
      default: null
    },

    reduction_name: {
      type: String,
      default: null
    },

    change: {
      type: String,
      default: null
    },

    share: {
      type: Number,
      default: null
    },

    asset_price: {
      type: Number,
      default: null
    },
    fund: {
      type: String,
      default: null
    },
    fund_percent: {
      type: Number,
      default: null
    },
    index_fund: {
      type: Number,
      default: null
    },
    index_fund_name: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: ''
    },
    limit_in_coin: {
      type: Number,
      default: 0
    },
    limit_in_usd: {
      type: Number,
      default: 0
    },
    balance: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      detailIsHidden: true
    };
  },
  computed: {
    // ...mapState('page', ['activeMarket']),

    // balance() {
    //   if (!this.activeMarket.balance) {
    //     return 0;
    //   } else {
    //     return this.activeMarket.balance;
    //   }
    // },

    new_value() {
      return String(this.value) + '$';
    },

    is_red() {
      if (!this.limit_in_usd) {
        return false;
      }
      if (this.balance * (this.fund_percent / 100) < this.limit_in_usd) {
        return true;
      } else {
        return false;
      }
    },

    change_background_item() {
      if (this.is_red) {
        return '#E46448';
      }
    },

    change_color_value() {
      if (this.value < 0) {
        return '#e92a00';
      } else {
        return '#81d540';
      }
    },

    change_color_change() {
      if (this.change < 0) {
        return '#e92a00';
      } else {
        return '#81d540';
      }
    },
    change_more_list() {
      if (!this.detailIsHidden) {
        return 'scaleY(-1)';
      }
    }
  }
};
</script>

<template>
  <div 
    class="rebalancing-tab-item" 
    
    @click="detailIsHidden = !detailIsHidden">
    <div 
      :style="{ background: change_background_item }" 
      class="rebalancing-tab-item__content">
      <div class="rebalancing-tab-item__col rebalancing-tab-item__col_1">
        <BaseCurrency
          :title="title"
          :id_market="idcoin"
          type="coins"
          class="rebalancing-tab-item__currency"
        />
        <div class="rebalancing-tab-item__reduction-name">
          {{ reduction_name }} 
        </div>
      </div>

      <div class="rebalancing-tab-item__col rebalancing-tab-item__col_5">
        <div class="rebalancing-tab-item__label">
          PERCENTAGE %
        </div>
        <div class="rebalancing-tab-item__value">{{ fund_percent }}%</div>
      </div>

      <div class="rebalancing-tab-item__col rebalancing-tab-item__col_4">
        <div class="rebalancing-tab-item__label">
          AMOUNT
        </div>
        <div class="rebalancing-tab-item__value">{{ fund }}$</div>
      </div>

      <div class="rebalancing-tab-item__col rebalancing-tab-item__col_6">
        <div class="rebalancing-tab-item__label">
          BALANCE
        </div>
        <div class="rebalancing-tab-item__value">
          {{ index_fund }} {{ index_fund_name }}
        </div>
      </div>

      <div class="rebalancing-tab-item__col rebalancing-tab-item__col_3">
        <div class="rebalancing-tab-item__label">
          ASSET PRICE
        </div>
        <div class="rebalancing-tab-item__value">{{ asset_price }}$</div>
      </div>

      <div class="rebalancing-tab-item__col rebalancing-tab-item__col_2">
        <div class="rebalancing-tab-item__label">
          CHANGE 24H
        </div>
        <div
          :style="{ color: change_color_change }"
          class="rebalancing-tab-item__value"
        >
          {{ change }}%
        </div>
      </div>

      <div class="rebalancing-tab-item__col rebalancing-tab-item__col_7">
        
        <circle-counter
          v-if="!is_red"
          :value="new_value"
          class="rebalancing-tab-item__chart"
        />
        
        <div 
          v-else
          class="rebalancing-tab-item__estimated-error">
          <div class="rebalancing-tab-item__label">
            estimated amount less
          </div>
          <div
            class="rebalancing-tab-item__value"
          >
            {{ limit_in_coin }} {{ reduction_name }} / {{ limit_in_usd }}$
          </div>
        </div>
        
      </div>

      <BaseClose 
        v-show="false" 
        class="rebalancing-tab-item__icon" />
    </div>

    <div
      :style="{ background: change_background_item }"
      class="rebalancing-tab-item__content-mobile rebalancing-tab-item-mobile"
    >
      <div
        class="rebalancing-tab-item__scale"
      />
      
      <div class="rebalancing-tab-item-mobile__headline">
        <BaseCurrency
          :title="title"
          :id_market="idcoin"
          type="coins"
          class="rebalancing-tab-item-mobile__title"
        />
        <!--<div class="rebalancing-tab-item-mobile__change">-->
        <!--  <div-->
        <!--    class="rebalancing-tab-item__label rebalancing-tab-item-mobile__change-label"-->
        <!--  >-->
        <!--    CHANGE-->
        <!--  </div>-->
        <!--  <div-->
        <!--    :class="[-->
        <!--      change < 0-->
        <!--        ? 'rebalancing-tab-item__value_red'-->
        <!--        : 'rebalancing-tab-item__value_green'-->
        <!--    ]"-->
        <!--    class="rebalancing-tab-item__value"-->
        <!--  >-->
        <!--    {{ change }}%-->
        <!--  </div>-->
        <!--</div>-->
      </div>
      
      <div class="rebalancing-tab-item-mobile__content" >
        <div class="rebalancing-tab-item-mobile__col">
          <div class="rebalancing-tab-item__label">
            AMOUNT
          </div>
          <div class="rebalancing-tab-item__value">{{ fund }}$</div>
        </div>
        
        <div class="rebalancing-tab-item-mobile__col">
          <div class="rebalancing-tab-item__label">
            PERCENT %
          </div>
          <div class="rebalancing-tab-item__value">{{ fund_percent }}%</div>
        </div>
        
        <div class="rebalancing-tab-item-mobile__col">
          <div class="rebalancing-tab-item__label">
            P&L
          </div>
          <div
            :style="{ color: change_color_value }"
            class="rebalancing-tab-item__value"
          >
            {{ new_value }}
          </div>
        </div>
        
        <div class="rebalancing-tab-item-mobile__col">
          <div class="rebalancing-tab-item__label">
            CHANGE
          </div>
          <div 
            :style="{ color: change_color_change }" 
            class="rebalancing-tab-item__value">
            {{ change }}%
          </div>
        </div>
      </div>
      
      <div
        :class="{ is_hidden: detailIsHidden }"
        class="rebalancing-tab-item-mobile__content"
      >
        <div class="rebalancing-tab-item-mobile__col">
          <div class="rebalancing-tab-item__label">
            BALANCE
          </div>
          <div class="rebalancing-tab-item__value">
            {{ index_fund }} {{ index_fund_name }}
          </div>
        </div>
        
        <div class="rebalancing-tab-item-mobile__col">
          <div class="rebalancing-tab-item__label">
            PRICE
          </div>
          <div class="rebalancing-tab-item__value">{{ asset_price }}$</div>
        </div>
        
        <div 
          v-if="is_red"
          class="rebalancing-tab-item-mobile__col">
          <div class="rebalancing-tab-item__label">
            estimated amount less
          </div>
          <div class="rebalancing-tab-item__value">
            {{ limit_in_coin }} {{ reduction_name }} / {{ limit_in_usd }}$
          </div>
        </div>
        
      </div>
      
      <div
        class="rebalancing-tab-item-mobile__more">
        <svg 
          :style="{ transform: change_more_list }" 
          class="rebalancing-tab-item-mobile__more-list"
          viewBox="0 0 8 6">
          <path
            d="M0.9375 0.71875L4 3.78125L7.0625 0.71875L8 1.65625L4 5.65625L0 1.65625L0.9375 0.71875Z"
          />
        </svg>
      </div>
      
    </div>
  </div>
</template>

<style lang="scss">
.rebalancing-tab-item {
  &__content {
    position: relative;
    padding: em(15px);
    height: em(120px);
    box-sizing: border-box;
    background: $white;
    border: 1px solid $grey;
    display: flex;
    align-items: center;
    @extend %bottom-shadow;
    @include ifmobile {
      display: none;
    }
  }

  &__content-mobile {
    position: relative;
    padding: em(34px) em(15px) em(5px) em(25px);
    box-sizing: border-box;
    background-color: $white;
    @include ifdesktop {
      display: none;
    }
  }

  &__col {
    &_1 {
      width: 30%;
    }
    &_2 {
      width: 11%;
    }
    &_3 {
      width: 11%;
    }
    &_4 {
      width: 9%;
    }
    &_5 {
      width: 12%;
    }
    &_6 {
      width: 9%;
    }
    &_7 {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18%;
    }
  }

  &__currency {
    .base-coin {
      width: em(36px);
      height: em(36px);
    }
  }

  &__reduction-name {
    margin-left: em(50px);
  }

  &__values {
    margin-left: em(38px);
  }

  &__label {
    $size: 12px;
    font-size: em($size);
    color: $grey;
    text-transform: uppercase;
  }

  &__value {
    $size: 14px;
    font-size: em($size);

    &_green {
      color: $green;
    }
    &_red {
      color: $red;
    }
  }

  &__scale {
    position: absolute;
    width: 100%;
    height: em(10px);
    background-color: $grey;
    @include ifdesktop {
      margin: em(4px) 0 em(10px);
    }
    @include ifmobile {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  &__chart {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: em(72px);
    height: em(72px);
  }
}

.rebalancing-tab-item-mobile {
  .rebalancing-tab-item-mobile__change {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &-label {
      margin-right: em(20px);
      line-height: em(26px);
    }
  }
  &__headline {
    border-bottom: 1px solid $grey;
    padding-bottom: em(15px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: em(30px);
  }
  &__content {
    display: flex;
    margin-top: em(15px);
    overflow: hidden;
    max-height: em(100px);
    transition: max-height $speed linear;

    &.is_hidden {
      max-height: 0;
    }
  }
  &__col {
    width: 25%;

    &:last-child() {
      width: auto;
    }
  }
  &__more {
    text-align: center;
    &-list {
      width: em(12px);
      height: em(9px);
      fill: $grey;

      @include ifdesktop {
        display: none;
      }
    }
  }
}
</style>

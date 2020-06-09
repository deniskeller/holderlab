<script>
/*AddCurrenciesItem*/
import { mapState, mapMutations } from 'vuex';
import AddIcon from '~/components/icons/AddIcon';
export default {
  components: {
    AddIcon
  },
  props: {
    min_limits_amount: {
      type: Number,
      default: 0
    },
    min_limits_amoun_in_usd: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: null
    },
    short: {
      type: String,
      default: null
    },
    is_new_portfolio: {
      type: Boolean,
      default: false
    },
    is_rebalance: {
      type: Boolean,
      default: false
    },
    rank: {
      type: Number,
      default: null
    },
    price: {
      type: Number,
      default: null
    },

    id_coin: {
      type: String,
      default: '0'
    },

    change: {
      type: String,
      default: null
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('page', [
      'selectedCoinList',
      'portfolioCoinList',
      'analyzedPortfolios'
    ]),

    isActive() {
      let coinList;
      if (this.is_new_portfolio) {
        coinList = this.analyzedPortfolios;
      } else {
        if (this.is_rebalance) {
          coinList = this.portfolioCoinList;
        } else {
          coinList = this.selectedCoinList;
        }
      }
      for (let item of coinList) {
        if (this.id_coin === item.id_coin) {
          return true;
        }
      }
      return false;
    }
  },

  methods: {
    ...mapMutations('page', [
      'setAddItemInSelectedCoinList',
      'setDellItemInSelectedCoinList',
      'setDellItemInPortfolioCoinList',
      'setAddItemInPortfolioCoinList',
      'setNewRemoveAsset',
      'setAnalyzedPortfolios',
      'setBackupAnalyzedPortfolios'
    ]),

    onClick() {
      if (!this.isActive) {
        // min_limits_amount": 0.001, "min_limits_amoun_in_usd": 0.21,
        let param = {
          id_coin: this.id_coin,
          price: this.price,
          rank: this.rank,
          title: this.title,
          short: this.short,
          amount: this.amount,
          inpercent: this.inpercent,
          change: this.change,
          min_limits_amount: this.min_limits_amount,
          min_limits_amoun_in_usd: this.min_limits_amoun_in_usd,
          percent: 0,
          distribution: 0,
          rebalance: true
        };
        if (this.is_new_portfolio) {
          this.setAnalyzedPortfolios(param);
        } else {
          if (this.is_rebalance) {
            this.setAddItemInPortfolioCoinList(param);
          } else {
            this.setAddItemInSelectedCoinList(param);
          }
        }
      } else {
        if (this.is_new_portfolio) this.setNewRemoveAsset(this.id_coin);
        else {
          if (this.is_rebalance) {
            this.setDellItemInPortfolioCoinList(this.id_coin);
          } else {
            this.setDellItemInSelectedCoinList(this.id_coin);
          }
        }
      }
    }
  }
};
</script>

<template>
  <div
    :class="{ is_active: isActive }"
    class="add-currencies-item"
    @click="onClick"
  >
    <div class="add-currencies-item__col add-currencies-item__col_1">
      <BaseCurrency 
        :id_market="id_coin" 
        :title="title" 
        type="coins" />
    </div>
    <div class="add-currencies-item__col add-currencies-item__col_2">
      <div class="add-currencies-item__label">
        RANK
      </div>
      <div class="add-currencies-item__value">
        {{ rank }}
      </div>
    </div>

    <div class="add-currencies-item__col add-currencies-item__col_3">
      <div class="add-currencies-item__label">
        PRICE
      </div>
      <div class="add-currencies-item__value">{{ price }}$</div>
    </div>

    <div class="add-currencies-item__col add-currencies-item__col_4">
      <div class="add-currencies-item__label">
        24 HOUR
      </div>
      <div
        :class="[
          Number(change)<0
            ? 'add-currencies-item__hour24_red'
            : 'add-currencies-item__hour24_green'
        ]"
        class="add-currencies-item__hour24"
      >
        {{ change }}%
      </div>
    </div>

    <AddIcon
      v-show="!isActive"
      class="add-currencies-item__icon add-currencies-item__icon_add"
    />

    <BaseClose 
      v-show="isActive" 
      class="add-currencies-item__icon" />
  </div>
</template>

<style lang="scss">
.add-currencies-item {
  $this: &;

  border: 1px solid $grey;
  box-sizing: border-box;
  @extend %bottom-shadow;
  background-color: $white;
  margin-bottom: em(6px);
  cursor: pointer;

  position: relative;
  display: flex;
  align-items: center;

  @include ifdesktop {
    padding: em(10px) em(22px);
  }

  @include ifmobile {
    flex-wrap: wrap;
    justify-content: space-between;
    padding: em(15px);
  }

  &.is_active {
    background: $light-blue;
    border-color: transparent;
    @extend %inner-shadow;
  }

  &:hover {
    #{$this}__icon_add {
      fill: $blue;
    }
  }

  &__col {
    &_1 {
      @include ifdesktop {
        width: 40%;
      }
      @include ifmobile {
        width: 100%;
        margin-bottom: em(10px);
      }
    }
    &_2 {
      @include ifdesktop {
        width: 12%;
      }
    }
    &_3 {
      @include ifdesktop {
        width: 28%;
      }
    }
  }

  &__label {
    $size: 12px;
    font-size: em($size);
    color: $grey;
    text-transform: uppercase;
  }

  &__value {
    $size: 16px;
    font-size: em($size);
  }

  &__hour24 {
    $size: 14px;
    font-size: em($size);

    &_green {
      color: $green;
    }
    &_red {
      color: $red;
    }
  }

  &__icon {
    position: absolute;

    @include ifdesktop {
      right: em(20px);
      top: 50%;
      transform: translateY(-50%);
    }

    @include ifmobile {
      top: em(15px);
      right: em(15px);
    }

    &_add {
      width: em(14px);
      height: em(14px);
      fill: $grey;
      padding: em(4px);
      transition: fill $speed;
    }
  }
}
</style>

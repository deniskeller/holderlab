<script>
/*CreatePortfolioCurrenciesItem*/
import { mapState, mapMutations } from 'vuex';
import AddIcon from '~/components/icons/AddIcon';
export default {
  components: {
    AddIcon
  },
  props: {
    min_limits_amoun_in_usd: {
      type: Number,
      default: 0
    },
    min_limits_amount: {
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
    amount: {
      type: String,
      default: '0'
    },
    inpercent: {
      type: Number,
      default: 0
    },

    id_coin: {
      type: String,
      default: '0'
    },

    price: {
      type: Number,
      default: null
    },
    coin: {
      type: Number,
      default: 0
    },
    rank: {
      type: String,
      default: null
    },
    change: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      // isActive: false
    };
  },
  computed: {
    ...mapState('page', ['analyzedPortfolios']),

    isActive() {
      for (let item of this.analyzedPortfolios) {
        if (this.id_coin === item.id_coin) {
          return true;
        }
      }
      return false;
    }
  },

  methods: {
    ...mapMutations('page', ['setAnalyzedPortfolios', 'setNewRemoveAsset']),
    onClick() {
      if (!this.isActive) {
        let param = {
          id_coin: this.id_coin,
          price: this.price,
          rank: this.rank,
          remove: this.index,
          title: this.title,
          short: this.short,
          amount: this.amount,
          inpercent: this.inpercent,
          change: this.change,
          min_limits_amount: this.min_limits_amount,
          min_limits_amoun_in_usd: this.min_limits_amoun_in_usd,
          percent: 0
        };
        this.setAnalyzedPortfolios(param);
      } else {
        this.setNewRemoveAsset(this.id_coin);
      }
    }
  }
};
</script>

<template>
  <div
    :class="{ is_active: isActive }"
    class="market__add-currencies-item"
    @click="onClick"
  >
    <div
      class="market__add-currencies-item__col market__add-currencies-item__col_1"
    >
      <BaseCurrency 
        :id_market="id_coin" 
        :title="title" 
        type="coins" />
      <div class="market__add-currencies-item__col-price">
        <span class="add-currencies-item__label-price">
          PRICE
        </span>
        <span class="add-currencies-item__value-price">
          {{ price }}
        </span>
      </div>
    </div>

    <div
      class="market__add-currencies-item__col market__add-currencies-item__col_2"
    >
      <div class="market__add-currencies-item__label">
        #AMOUNT $
      </div>
      <div class="market__add-currencies-item__value">{{ amount }}$</div>
    </div>

    <div
      class="market__add-currencies-item__col market__add-currencies-item__col_3"
    >
      <div class="market__add-currencies-item__label">
        AMOUNT %
      </div>
      <div class="market__add-currencies-item__value">{{ inpercent }} %</div>
    </div>

    <div
      class="market__add-currencies-item__col market__add-currencies-item__col_4"
    >
      <div class="market__add-currencies-item__label">
        AMOUNT INDEX
      </div>
      <div class="market__add-currencies-item__value">{{ coin }} BTC</div>
    </div>

    <div
      class="market__add-currencies-item__col market__add-currencies-item__col_5"
    >
      <div class="market__add-currencies-item__label">
        CHANGE 24H
      </div>
      <div
        :class="[
          Number(change) < 0
            ? 'market__add-currencies-item_red'
            : 'market__add-currencies-item_green'
        ]"
        class="market__add-currencies-item__value"
        v-html="change + '%'"
      />
    </div>

    <AddIcon
      v-show="!isActive"
      class="market__add-currencies-item__icon market__add-currencies-item__icon_add"
    />

    <BaseClose 
      v-show="isActive" 
      class="market__add-currencies-item__icon" />
  </div>
</template>

<style lang="scss" scoped>
.market__add-currencies-item {
  $this: &;
  border: 1px solid $grey;
  box-sizing: border-box;
  @extend %bottom-shadow;
  background-color: $white;
  margin-bottom: em(6px);
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: flex-start;

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
        width: 28%;
      }
      @include ifmobile {
        width: 100%;
        margin-bottom: em(10px);
      }
    }
    &_2 {
      @include ifdesktop {
        width: 15%;
      }
    }
    &_3 {
      @include ifdesktop {
        width: 16%;
      }
    }
    &_4 {
      @include ifdesktop {
        width: 21%;
      }
    }
    &_5 {
      @include ifdesktop {
        width: 15%;
      }
    }
    &_7 {
      @include ifdesktop {
        width: 25%;
        align-self: center;
      }
    }

    .market__add-currencies-item_red {
      color: $red;
    }
    .market__add-currencies-item_green {
      color: $green;
    }
  }

  &__label {
    $size: 12px;
    font-size: em($size);
    color: $grey;
    text-transform: uppercase;
    @include ifmobile {
      font-size: em(10px);
    }
  }

  &__value {
    $size: 14px;
    font-size: em($size);
    @include ifmobile {
      font-size: em(14px);
    }
  }

  &__icon {
    align-self: center;

    @include ifdesktop {
      position: absolute;
      right: em(20px);
      top: 50%;
      transform: translateY(-50%);
    }

    @include ifmobile {
      position: absolute;
      top: em(15px);
      right: em(15px);
    }

    &_add {
      width: em(14px);
      height: em(14px);
      fill: $grey;
      /*padding: em(4px);*/
      transition: fill $speed;
    }
  }
}
.market__add-currencies-item__col-price {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  font-size: em(9px);
  margin-left: em(35px);

  .add-currencies-item__label-price {
    font-size: em(16px);
    color: $grey;
    margin-right: em(5px);
  }
  .add-currencies-item__value-price {
    font-size: em(20px);
  }
}
</style>

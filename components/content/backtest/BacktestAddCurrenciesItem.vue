<script>
import { mapState, mapMutations } from 'vuex';
import AddIcon from '~/components/icons/AddIcon';
export default {
  components: {
    AddIcon
  },
  props: {
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
    date: {
      type: String,
      default: ''
    },
    id_coin: {
      type: String,
      default: '0'
    },
    price: {
      type: Number,
      default: null
    },
    hour24: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('page', ['selectedCoinList']),
    isActive() {
      for (let item of this.selectedCoinList) {
        if (this.id_coin === item.id_coin) {
          return true;
        }
      }
      return false;
    },

    change_color_hour24() {
      if (this.hour24 >= 0) {
        return '#81d540';
      } else {
        return '#e92a00';
      }
    }
  },
  methods: {
    ...mapMutations('page', [
      'setAddItemInSelectedCoinList',
      'setDellItemInSelectedCoinList'
    ]),
    onClick() {
      if (!this.isActive) {
        let param = {
          id_coin: this.id_coin,
          price: this.price,
          rank: this.rank,
          title: this.title,
          short: this.short,
          change: this.hour24,
          percent: 0
        };
        this.setAddItemInSelectedCoinList(param);
      } else {
        this.setDellItemInSelectedCoinList(this.id_coin);
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
        type="coins"
        class="base-currency-img-coin"
      />
      <span class="currencies-short-name">{{ short }}</span>
    </div>

    <div class="add-currencies-item__col add-currencies-item__col_2">
      <div class="add-currencies-item__label">
        HISTORICAL DATA
      </div>
      <div class="add-currencies-item__value">
        {{ date }}
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
        CHANGE 24H
      </div>
      <div
        :style="{ color: change_color_hour24 }"
        class="add-currencies-item__hour24"
      >
        {{ hour24 }}%
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

<style lang="scss" scoped>
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
        display: inline-flex;
        flex-direction: column;
      }
      @include ifmobile {
        width: 100%;
        margin-bottom: em(10px);
      }
    }
    &_2 {
      @include ifdesktop {
        width: 20%;
      }
    }
    &_3 {
      @include ifdesktop {
        width: 22%;
      }
    }
  }

  &__label {
    $size: 10px;
    font-size: em($size);
    color: $grey;
    text-transform: uppercase;
  }

  &__value {
    $size: 14px;
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
.base-currency-img-coin {
  @include ifmobile {
    display: flex;
  }
}

.currencies-short-name {
  margin-left: em(35px);
  @include ifmobile {
    display: flex;
  }
}
</style>

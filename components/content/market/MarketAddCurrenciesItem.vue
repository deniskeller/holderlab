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
    rank: {
      type: String,
      default: null
    },
    price: {
      type: Number,
      default: null
    },
    hour24: {
      type: String,
      default: '0'
    },
    draw: {
      type: String,
      default: '%'
    },
    roi: {
      type: String,
      default: '%'
    },
    day: {
      type: String,
      default: '%'
    }
  },
  data() {
    return {
      isActive: false
    };
  },
  computed: {
    ...mapState('page', ['removeAsset'])
  },
  watch: {
    removeAsset() {
      if (this.index === this.removeAsset) {
        this.isActive = false;
      }
    }
  },
  methods: {
    ...mapMutations('page', ['setAddAsset', 'setRemoveAsset']),
    onClick() {
      if (!this.isActive) {
        this.setAddAsset({
          remove: this.index,
          title: this.title,
          short: this.short,
          rank: this.rank,
          day: this.day,
          draw: this.draw,
          roi: this.roi,
          hour24: this.hour24
        });
      } else {
        this.setRemoveAsset(this.index);
      }
      this.isActive = !this.isActive;
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
      <BaseCurrency :title="title" />
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
        #RANK
      </div>
      <div class="market__add-currencies-item__value">
        {{ rank }}
      </div>
    </div>

    <div
      class="market__add-currencies-item__col market__add-currencies-item__col_3"
    >
      <div class="market__add-currencies-item__label">
        7 DAY RETURNS
      </div>
      <div
        :class="[
          day.localeCompare('0') <= '0'
            ? 'market__add-currencies-item_red'
            : 'market__add-currencies-item_green'
        ]"
        class="market__add-currencies-item__value"
        v-html="day"
      />
    </div>

    <div
      class="market__add-currencies-item__col market__add-currencies-item__col_4"
    >
      <div class="market__add-currencies-item__label">
        DRAWDOWN
      </div>
      <div
        :class="[
          draw.localeCompare('0') <= '0'
            ? 'market__add-currencies-item_red'
            : 'market__add-currencies-item_green'
        ]"
        class="market__add-currencies-item__hour24"
        v-html="draw"
      />
    </div>

    <div
      class="market__add-currencies-item__col market__add-currencies-item__col_5"
    >
      <div class="market__add-currencies-item__label">
        ROI
      </div>
      <div
        :class="[
          roi.charAt(0) === '-'
            ? 'market__add-currencies-item_red'
            : 'market__add-currencies-item_green'
        ]"
        class="market__add-currencies-item__value"
        v-html="roi"
      />
    </div>

    <div
      class="market__add-currencies-item__col market__add-currencies-item__col_7"
    >
      <BaseSwitchButton
        first_name="Shown"
        second_name="Show plot"
        class="correlation-matrix-switcher__switch"
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
        width: 32%;
      }
      @include ifmobile {
        width: 100%;
        margin-bottom: em(10px);
      }
    }
    &_2 {
      @include ifdesktop {
        width: 10%;
      }
    }
    &_3 {
      @include ifdesktop {
        width: 18%;
      }
    }
    &_4 {
      @include ifdesktop {
        width: 16%;
      }
    }
    &_5 {
      @include ifdesktop {
        width: 10%;
      }
    }
    &_7 {
      @include ifdesktop {
        width: 22%;
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
  }

  &__value {
    $size: 16px;
    font-size: em($size);
  }

  &__hour24 {
    $size: 14px;
    font-size: em($size);
    color: $green;
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

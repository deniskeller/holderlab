<script>
import { mapMutations, mapState } from 'vuex';

export default {
  props: {
    title: {
      type: String,
      default: null
    },
    rank: {
      type: String,
      default: null
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
      default: null
    },

    percent: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      more: false,
      intermediate_value: 0
    };
  },

  computed: {
    ...mapState('page', ['flagRequest', 'analyzedPortfolios']),

    isVisible() {
      for (let item of this.analyzedPortfolios) {
        if (this.id_coin === item.id_coin) {
          return true;
        }
      }
      return false;
    },

    value: {
      get: function() {
        return this.percent;
      },

      set: function(newValue) {
        this.setUpdateAnalyzedNewPortfolio({
          title: this.title,
          percent: String(newValue)
        });
      }
    },

    flag_request: {
      get: function() {
        return this.flagRequest;
      },

      set: function(newValue) {
        this.setFlagRequest(newValue);
      }
    }

    // value: {
    //   get: function() {
    //     if (this.flag_request) {
    //       return this.percent;
    //     } else {
    //       return this.intermediate_value;
    //     }
    //   },

    //   set: function(newValue) {
    //     this.flag_request = false;
    //     this.intermediate_value = newValue;
    //   }
    // },

    // value: {
    //   get: function() {
    //     return this.intermediate_value;
    //   },

    //   set: function(newValue) {
    //     if (this.flag_request) {
    //       this.intermediate_value = this.percent;
    //     } else {
    //       this.intermediate_value = newValue;
    //       this.flag_request = false;
    //     }
    //   }
    // }
  },

  watch: {
    more() {
      if (this.more) {
        setTimeout(() => {
          this.$refs.input.select();
        });
      }
    }
  },

  mounted() {},

  methods: {
    ...mapMutations('page', [
      'setFlagRequest',
      'setUpdateAnalyzedNewPortfolio',
      'setNewRemoveAsset'
    ]),

    onlyForCurrency: function($event) {
      // console.log($event.keyCode); //keyCodes value
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;

      // only allow number and one dot
      if (
        (keyCode < 48 || keyCode > 57) &&
        (keyCode !== 46 || this.value.toString().indexOf('.') != -1)
      ) {
        // 46 is dot
        // console.log('1', this.value);
        $event.preventDefault();
      }

      // restrict to 2 decimal places
      if (
        this.value != null &&
        this.value.toString().indexOf('.') > -1 &&
        this.value.toString().split('.')[1].length > 1
      ) {
        $event.preventDefault();
      }

      if (keyCode === 46 && this.value.toString().split('.') == 0) {
        $event.preventDefault();
      }
    },

    onInput() {
      this.value = this.$refs.input.value || 0;
      this.$emit('change');
    },

    onClose() {
      this.setNewRemoveAsset(this.id_coin);
      setTimeout(() => {
        this.$emit('close');
      }, 300);
    },

    onChange() {
      this.$emit('change');
    },

    onKey(e) {
      if (e.key === 'ArrowUp') {
        this.value = parseInt(this.value) + 1;
        setTimeout(() => {
          this.onChange();
        });
      }
      if (e.key === 'ArrowDown') {
        this.value = parseInt(this.value) - 1;
        if (this.value < 0) this.value = 0;
        setTimeout(() => {
          this.onChange();
        });
      }
    },

    // валидация кнопки %
    handleChange: function() {
      if (this.value < 0) {
        this.value = 0;
      }
      if (this.value > 100) {
        this.value = 100;
      }
    }
  }
};
</script>

<template>
  <transition name="aside-allocated-asset-fade">
    <div 
      v-if="isVisible" 
      class="aside-allocated-asset">
      <BaseCurrency
        :id_market="id_coin"
        :title="title"
        type="coins"
        class="aside-allocated-asset__currency"
      />

      <div class="aside-allocated-asset__info">
        <transition name="aside-allocated-asset-more-fade">
          <div 
            v-show="more" 
            class="aside-allocated-asset__more">
            <div class="aside-allocated-asset__label">
              RANK
            </div>
            <div class="aside-allocated-asset__value">
              {{ rank }}
            </div>
            <div class="aside-allocated-asset__label">
              PRICE
            </div>
            <div class="aside-allocated-asset__value">
              {{ price }}
            </div>
          </div>
        </transition>
        <div class="aside-allocated-asset__label">
          24 HOUR
        </div>
        <!--hour24.charAt(0) === '-'-->
        <div
          :class="[
            Number(hour24)<0
              ? 'aside-allocated-asset__value_red'
              : 'aside-allocated-asset__value_green'
          ]"
          class="aside-allocated-asset__value "
        >
          {{ hour24 }} %
        </div>

        <div 
          class="aside-allocated-asset__more-link" 
          @click="more = !more">
          <template v-if="!more">
            More
          </template>
          <template v-if="more">
            Hide detalis
          </template>
        </div>

        <input
          v-show="more"
          ref="input"
          :value="value"
          :class="{ is_error: value < 1 }"
          min="1"
          max="100"
          class="aside-allocated-asset__percent aside-allocated-asset__percent_input"
          type="text"
          @input="onInput"
          @keydown="onKey"
          @change="handleChange(value)"
          @keypress="onlyForCurrency"
        >

        <div 
          v-show="!more" 
          class="aside-allocated-asset__percent">
          {{ value }}%
        </div>

        <BaseClose
          class="aside-allocated-asset__close"
          @click.native="onClose"
        />
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.aside-allocated-asset {
  position: relative;
  background-color: $light-blue;
  padding: em(25px);
  @extend %inner-shadow;

  &__info {
    margin: em(10px) 0 0 em(38px);
    line-height: 1.4;
  }

  &__currency {
    width: 100%;
    max-width: em(150px);
  }

  &__label {
    $size: 12px;
    font-size: em($size);
    color: $grey;
  }

  &__value {
    $size: 14px;
    font-size: em($size);
    margin-bottom: em(6px, $size);
    &_green {
      color: $green;
    }
    &_red {
      color: $red;
    }
  }
  &__more-link {
    $size: 14px;
    font-size: em($size);
    color: $blue;
    cursor: pointer;
  }

  &__percent {
    $size: 14px;
    font-size: em($size);
    position: absolute;
    background-color: $white;
    width: em(60px, $size);
    height: em(30px, $size);
    line-height: em(30px, $size);
    text-align: center;
    border-radius: em(6px, $size);
    right: em(25px, $size);
    bottom: em(25px, $size);
    outline: none;
    border: 1px solid transparent;
    transition: border-color $speed;

    &:focus {
      border-color: $blue;
    }

    &.is_error {
      border-color: $red;
    }
  }

  &__close {
    position: absolute;
    right: em(25px);
    top: em(25px);
  }

  &__more {
    overflow: hidden;
  }
}

.aside-allocated-asset-fade-enter-active,
.aside-allocated-asset-fade-leave-active {
  transition-property: max-height, opacity;
  transition-duration: 0.2s;
  max-height: em(500px);
}
.aside-allocated-asset-fade-enter,
.aside-allocated-asset-fade-leave-to {
  max-height: 0;
  opacity: 0;
}

.aside-allocated-asset-more-fade-enter-active,
.aside-allocated-asset-more-fade-leave-active {
  transition-property: max-height;
  transition-duration: 0.2s;
  max-height: em(300px);
}
.aside-allocated-asset-more-fade-enter,
.aside-allocated-asset-more-fade-leave-to {
  max-height: 0;
}
</style>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  props: {
    balance: {
      type: Number,
      default: 0
    },
    remove: {
      type: Number,
      default: null
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
      default: null
    },
    percent: {
      type: String,
      default: ''
    },
    close: {
      type: Boolean,
      default: false
    },
    id_coin: {
      type: String,
      default: null
    },
    limit_in_coin: {
      type: Number,
      default: 0
    },
    limit_in_usd: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // edit: true,
      edit: false
    };
  },
  beforeApdate() {},
  computed: {
    ...mapState('page', ['removeAsset', 'analyzedPortfolios']),

    value: {
      get: function() {
        if (isNaN(this.percent)) {
          return '0';
        } else {
          return this.percent;
        }
      },

      set: function(newValue) {
        this.setUpdateAnalyzedNewPortfolio({
          title: this.title,
          percent: String(newValue)
        });
      }
    },

    is_estimated_error() {
      if (!this.limit_in_usd) {
        return false;
      }
      if (this.balance * (this.value / 100) < this.limit_in_usd) {
        return true;
      } else {
        return false;
      }
    },

    change_background_item() {
      if (this.is_estimated_error) {
        return '#E46448';
      }
    },

    change_color() {
      if (Number(this.hour24) < 0) {
        return '#e92a00';
      } else {
        return '#81d540';
      }
    },

    isVisible() {
      for (let item of this.analyzedPortfolios) {
        if (this.id_coin === item.id_coin) {
          return true;
        }
      }
      return false;
    }
  },

  watch: {
    value() {
      // console.log('balance', this.balance);
      // console.log('value', this.value);
      // console.log('limit_in_usd', this.limit_in_usd);
      // console.log('calculate', this.balance / this.value);
      // console.log('is_estimated_error', this.is_estimated_error);
    }
  },

  methods: {
    ...mapMutations('page', [
      'setRemoveAsset',
      'setUpdateAnalyzedNewPortfolio',
      'setNewRemoveAsset'
    ]),

    onlyForCurrency($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      // let temp;
      // temp = (this.value.toString().match(new RegExp('.', 'g')) || []).length;
      // if (temp === 1 && keyCode == 46) {
      //   $event.preventDefault();
      // }

      if (keyCode === 46 && this.value.length == 0) {
        $event.preventDefault();
      }
      // only allow number and one dot
      if (
        (keyCode < 48 || keyCode > 57) &&
        (keyCode !== 46 || this.value.toString().indexOf('.') != -1)
      ) {
        // 46 is dot
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
    },

    onInput() {
      this.value = this.$refs.input.value || 0;
      this.$emit('change');
    },

    onClose() {
      if (this.id_coin) {
        this.setNewRemoveAsset(this.id_coin);
        this.setRemoveAsset(this.id_coin);
      }
      setTimeout(() => {
        this.$emit('close');
      }, 300);
    },

    // onChange() {
    //   this.value += '%';
    //   this.$emit('change');
    // },

    // onKey(e) {
    //   if (e.key === 'ArrowUp') {
    //     this.value = parseInt(this.value) + 1;
    //     setTimeout(() => {
    //       this.onChange();
    //     });
    //   }
    //   if (e.key === 'ArrowDown') {
    //     this.value = parseInt(this.value) - 1;
    //     if (this.value < 0) this.value = 0;
    //     setTimeout(() => {
    //       this.onChange();
    //     });
    //   }
    // },

    // событие вызова поля ввода
    toggleEdit: function() {
      this.edit = true;
      this.$nextTick(() => {
        this.$refs.input.select();
      });
    },
    // сохранение значения инпута
    saveEdit: function() {
      this.edit = false;
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
  <transition name="allocated-asset-item-fade">
    <div 
      v-if="isVisible" 
      :style="{ background: change_background_item }" 
      class="allocated-asset-item">
      <div class="allocated-asset-item__col allocated-asset-item__col_1">
        <BaseCurrency 
          :id_market="id_coin" 
          :title="title" 
          type="coins" />
      </div>

      <div 
        v-if="!is_estimated_error"
        class="allocated-asset-item__col allocated-asset-item__col_2">
        <div class="allocated-asset-item__label">
          #RANK
        </div>
        <div class="allocated-asset-item__value">
          {{ rank }}
        </div>
      </div>
      
      <div
        v-if="is_estimated_error"
        class="allocated-asset-item__col allocated-asset-item__col_estimated">
        <div class="allocated-asset-item__label">
          estimated amount less
        </div>
        <div class="allocated-asset-item__value">
          {{ limit_in_coin }} {{ short }} / {{ limit_in_usd }}$
        </div>
      </div>

      <div
        v-if="!is_estimated_error"
        class="allocated-asset-item__col allocated-asset-item__col_3">
        <div class="allocated-asset-item__label">
          PRICE
        </div>
        <div class="allocated-asset-item__value">{{ price }}$</div>
      </div>

      <div class="allocated-asset-item__col allocated-asset-item__col_4">
        <div class="allocated-asset-item__label">
          CHANGE 24H
        </div>
        <div
          :style="{ color: change_color }"
          class="allocated-asset-item__hour24"
        >
          {{ hour24 }}%
        </div>
      </div>

      <div class="allocated-asset-item__col allocated-asset-item__col_5">
        <BaseClose
          v-show="close"
          class="allocated-asset-item__close"
          @click.native="onClose"
        />
      </div>

      <input
        v-show="edit"
        ref="input"
        :class="{ is_error: value <= 0 }"
        v-model="value"
        type="text"
        min="1"
        max="100"
        class="allocated-asset-item__percent allocated-asset-item__percent_input"
        @input="$emit('input', $event.value)"
        @change="handleChange(value)"
        @blur="saveEdit(value)"
        @keyup.enter="saveEdit(value)"
        @keypress="onlyForCurrency"
      >

      <span
        v-show="!edit"
        :class="{ is_error: value <= 0 }"
        class="allocated-asset-item__percent allocated-asset-item__percent_input"
        @click.prevent="toggleEdit(edit, $event)"
      >
        {{ value }}%
      </span>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.allocated-asset-item {
  position: relative;
  box-sizing: border-box;
  background: $light-blue;
  @extend %inner-shadow;
  margin-bottom: em(6px);
  display: flex;

  @include ifdesktop {
    padding: em(10px) em(16px);
    align-items: center;
  }

  @include ifmobile {
    padding: em(15px);
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &__col {
    &_1 {
      @include ifdesktop {
        width: 36%;
      }
      @include ifmobile {
        width: 100%;
        margin-bottom: em(15px);
      }
    }
    &_2 {
      @include ifdesktop {
        width: 10%;
      }
    }
    &_3 {
      @include ifdesktop {
        width: 24%;
      }
    }
    &_4 {
      @include ifdesktop {
        width: 10%;
      }
    }
    &_5 {
      @include ifdesktop {
        width: 10%;
        text-align: center;
      }
    }
    &_estimated {
      @include ifdesktop {
        width: 34%;
        text-align: left;
      }
      &__value {
        $size: 16px;
        font-size: em($size);
      }
    }
  }

  &__label {
    $size: 12px;
    font-size: em($size);
    color: $grey;
    text-transform: uppercase;
    white-space: nowrap;
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

  &__percent {
    $size: 14px;
    font-size: em($size);
    width: 10%;
    border: none;
    font-family: $font-Circe;
    outline: none;
    border: 1px solid transparent;
    width: em(50px, $size);
    height: em(30px, $size);
    line-height: em(30px, $size);
    text-align: right;

    @include ifmobile {
      position: absolute;
      top: em(15px);
      right: em(15px, $size);
    }

    &:focus {
      border-color: $blue;
    }

    &_input {
      text-align: center;
      background-color: $white;
      border-radius: em(6px, $size);
    }

    &.is_error {
      border-color: $red;
    }
  }

  &__close {
    @include ifmobile {
      margin-top: em(10px);
      svg {
        fill: $grey;
      }
    }
  }
}

.allocated-asset-item-fade-enter-active,
.allocated-asset-item-fade-leave-active {
  transition-property: max-height;
  transition-duration: $speed;
  max-height: em(500px);
}
.allocated-asset-item-fade-enter,
.allocated-asset-item-fade-leave-to {
  max-height: 0;
}
</style>

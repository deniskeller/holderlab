<script>
/*RebalanceAllocatedAssetItem*/
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
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
    change: {
      type: String,
      default: null
    },
    rebalance: {
      type: Boolean,
      default: true
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
      default: ''
    },
    percent: {
      type: Number,
      default: null
    },
    close: {
      type: Boolean,
      default: false
    },
    id_coin: {
      type: String,
      default: null
    },
    progress_props: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      // value: this.percent + '%',
      // // progress: 0,
      progressLow: 100,
      // edit: true,
      edit: false,
      isRebalance: this.rebalance
    };
  },

  computed: {
    ...mapState('page', ['removeAsset', 'portfolioCoinList']),

    change_color() {
      // if (this.hour24.charAt(0) === '-') {
      if (Number(this.hour24) < 0) {
        return '#e92a00';
      } else {
        return '#81d540';
      }
    },

    isVisible() {
      for (let item of this.portfolioCoinList) {
        if (this.id_coin === item.id_coin) {
          return true;
        }
      }
      return false;
    },

    value: {
      get: function() {
        if (isNaN(this.percent)) {
          return '0';
        } else {
          return this.percent;
        }
      },

      set: function(newValue) {
        this.setUpdatePortfolioCoinList2({
          title: this.title,
          percent: String(newValue)
        });
      }
    },

    progress() {
      if (!this.progress_props) {
        return 0;
      } else {
        return this.progress_props;
      }
      // if (this.progress_props < 1 && this.progress_props > 0) {
      //   return this.progress_props * 100;
      // } else {
      //   return this.progress_props;
      // }
    },

    progressStyle() {
      return 100 - this.progress;
    }
  },

  watch: {
    progress() {
      let obj = {};
      obj.id_coin = this.id_coin;
      obj.short = this.short;
      obj.title = this.title;
      obj.piece_of_coin = this.progress;
      if (obj.piece_of_coin > 0) obj.is_accumulation = true;
      else {
        obj.is_accumulation = false;
      }
      obj.rebalance = this.isRebalance;
      // obj.piece_of_coin = 0;
      obj.change = this.change;
      // obj.rebalance = 0;
      // obj.distribution = 0;
      this.setUpdateAllVariablesInItemFromPortfolioCoinList(obj);
    },

    isRebalance() {
      this.changeRebalanse();
    }
  },

  mounted() {
    // this.isRebalance = this.rebalance;
  },

  methods: {
    ...mapMutations('page', [
      'setRemoveAsset',
      'setUpdateAllVariablesInItemFromPortfolioCoinList',
      'setUpdatePortfolioCoinList2',
      'setDellItemInPortfolioCoinList',
      'setRebalanceEditPortfolioPercent'
    ]),

    changeRebalanse() {
      // this.isRebalance = !this.isRebalance;
      let obj = {};
      obj.id_coin = this.id_coin;
      obj.piece_of_coin = this.progress;
      if (obj.piece_of_coin > 0) obj.is_accumulation = true;
      else {
        obj.is_accumulation = false;
      }
      obj.short = this.short;
      obj.title = this.title;
      obj.rebalance = this.isRebalance;
      // obj.piece_of_coin = 0;
      this.setUpdateAllVariablesInItemFromPortfolioCoinList(obj);
    },

    onlyForCurrency($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
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

    onInput(e) {
      this.value = this.$refs.input.value || 0;
      this.$emit('change');
    },

    onClose() {
      if (this.id_coin) {
        this.setDellItemInPortfolioCoinList(this.id_coin);
        this.setRemoveAsset(this.id_coin);
      }
      setTimeout(() => {
        this.$emit('close');
      }, 300);
    },

    onChange() {
      this.value += '%';
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

    // событие вызова поля ввода
    toggleEdit: function(value, e) {
      this.edit = true;
      this.$nextTick(() => {
        this.$refs.input.select();
      });
    },

    // сохранение значения инпута
    saveEdit: function(value) {
      this.edit = false;
    },

    // валидация кнопки %
    handleChange: function(value) {
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
  <transition name="rebalance-allocated-asset-item-fade">
    <div 
      v-if="isVisible" 
      class="rebalance-allocated-asset-item">
      <div
        class="rebalance-allocated-asset-item__col rebalance-allocated-asset-item__col_1"
      >
        <BaseCurrency 
          :id_market="id_coin" 
          :title="title" 
          type="coins" />
      </div>

      <div
        class="rebalance-allocated-asset-item__col rebalance-allocated-asset-item__col_2"
      >
        <div class="rebalance-allocated-asset-item__label">
          REBALANCE
        </div>
        <div class="rebalance-allocated-asset-item__value">
          <BaseCheckbox
            v-model="isRebalance"
            :is_active="rebalance"
            class="rebalance-checkbox"
            @change="changeRebalanse"
          />
        </div>
      </div>

      <div
        class="rebalance-allocated-asset-item__col rebalance-allocated-asset-item__col_3"
      >
        <div class="rebalance-allocated-asset-item__label">
          ASSET ACCUMULATION
        </div>
        <div class="percent-row">
          <span 
            class="percent-row__item percent-row__item-left"
          >{{ progress }}%</span
          >
          <input
            ref="input"
            v-model="progress_props"
            value="progressStyle"
            class="percent-row__range"
            type="range"
            min="0"
            max="100"
            step="1"
          >
          <span 
            class="percent-row__item percent-row__item-right"
          >{{ progressStyle }}%</span
          >
        </div>
      </div>

      <div
        class="rebalance-allocated-asset-item__col rebalance-allocated-asset-item__col_4"
      >
        <BaseClose
          v-show="close"
          class="rebalance-allocated-asset-item__close"
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
.rebalance-allocated-asset-item {
  position: relative;
  box-sizing: border-box;
  background: $light-blue;
  @extend %inner-shadow;
  margin-bottom: em(6px);
  display: flex;

  @include ifdesktop {
    padding: em(10px) em(22px);
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
        width: 30%;
      }
      @include ifmobile {
        width: 100%;
        margin-bottom: em(15px);
      }
    }
    &_2 {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      @include ifdesktop {
        width: 20%;
      }
    }

    &_3 {
      display: flex;
      flex-direction: column;
      align-items: center;
      @include ifdesktop {
        width: 40%;
      }
      .percent-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: em(25px);
        .percent-row__range {
          margin: 0px em(10px);
        }
        .percent-row__item {
          font-size: em(14px);
          line-height: em(21px);
          color: $black;
        }
      }
    }
    &_4 {
      @include ifdesktop {
        width: 10%;
        text-align: center;
      }
    }
  }

  &__label {
    $size: 12px;
    font-size: em($size);
    color: $grey;
    text-transform: uppercase;
    white-space: nowrap;
    text-align: center;
  }

  &__value {
    $size: 16px;
    font-size: em($size);
    .rebalance-checkbox {
      top: -1.075em;
      margin-right: -0.75em;
    }
  }

  &__hour24 {
    $size: 14px;
    font-size: em($size);
    color: $green;
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

.progress {
  border: 1px solid #000;
  height: 60px;
  position: relative;
  margin-bottom: 20px;

  &__bar {
    height: inherit;
    background-color: lightgreen;
    text-align: center;
  }

  &__label {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 15px;
    font-family: sans-serif;
  }
}
input[type='range'] {
  -webkit-appearance: none;
  width: 100%;
  @include ifmobile {
    width: em(150px);
  }
}
input[type='range']:focus {
  outline: none;
}
input[type='range']::-webkit-slider-runnable-track {
  width: 100%;
  height: 1px;
  cursor: pointer;
  background: rgba(48, 113, 169, 0.78);
  border-radius: 1.3px;
  border: 1px solid #c4c4c4;
}
input[type='range']::-webkit-slider-thumb {
  border: 1.8px solid #00001e;
  height: em(20px);
  width: em(20px);
  border-radius: 15px;
  background: #ffffff;
  border: 1px solid #dedede;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -9.5px;
}
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
  }

  &__label {
    $size: 12px;
    font-size: em($size);
    color: $grey;
    text-transform: uppercase;
    white-space: nowrap;
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
      padding: 0.1em 0.3em;
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

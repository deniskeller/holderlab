<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  props: {
    button: {
      type: Boolean,
      default: true
    },

    threshold_rebalance: {
      type: String,
      default: '0'
    },

    rebalance_time_period: {
      type: Number,
      default: 1
    },

    rebalance_period: {
      type: String,
      default: 'hour'
    }
  },
  data() {
    return {
      edit: false
    };
  },
  computed: {
    ...mapState('page', ['rebalanceOptions', 'activeMarket']),

    rebalance_options: {
      get() {
        return this.rebalanceOptions;
      },
      set(value) {
        this.setRebalanceOptions(value);
      }
    },
    active_market: {
      /* all or any name market */
      get() {
        return this.activeMarket;
      }
    }
  },

  watch: {
    threshold_rebalance() {
      this.$emit('input', this.get_data());
    },

    rebalance_time_period() {
      this.$emit('input', this.get_data());
    },

    rebalance_period() {
      this.$emit('input', this.get_data());
    }
  },

  mounted() {},

  methods: {
    ...mapMutations('page', [
      'setRebalanceOptions',
      'setIsSaveOptionButtom',
      'setSaveActivatePortfolio'
    ]),

    ...mapActions('page', ['getRebalanceNow']),

    savePortfolios() {
      this.setSaveActivatePortfolio();
    },

    get_data() {
      return {
        threshold_rebalance: this.threshold_rebalance,
        rebalance_time_period: this.rebalance_time_period,
        rebalance_period: this.rebalance_period
      };
    },

    clickButtonRebalanceNow() {
      this.getRebalanceNow(this.active_market.market_title);
    },

    clickButton() {
      this.setIsSaveOptionButtom();
    },

    onlyForCurrency($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      // let temp;
      // temp = (this.value.toString().match(new RegExp('.', 'g')) || []).length;
      // if (temp === 1 && keyCode == 46) {
      //   $event.preventDefault();
      // }

      if (keyCode === 46 && this.threshold_rebalance.length == 0) {
        $event.preventDefault();
      }
      // only allow number and one dot
      if (
        (keyCode < 48 || keyCode > 57) &&
        (keyCode !== 46 ||
          this.threshold_rebalance.toString().indexOf('.') != -1)
      ) {
        // 46 is dot
        $event.preventDefault();
      }

      // restrict to 2 decimal places
      if (
        this.threshold_rebalance != null &&
        this.threshold_rebalance.toString().indexOf('.') > -1 &&
        this.threshold_rebalance.toString().split('.')[1].length > 1
      ) {
        $event.preventDefault();
      }
    },

    onlyNumber($event) {
      //console.log($event.keyCode); //keyCodes value
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
    },

    onChange() {},

    // событие вызова поля ввода
    toggleEdit: function() {
      this.edit = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    // сохранение значения инпута
    saveEdit: function() {
      this.edit = false;
    },
    // валидация кнопки %
    handleChange: function() {
      if (Number(this.threshold_rebalance) < 0) {
        this.threshold_rebalance = '';
      }
      if (Number(this.threshold_rebalance) > 100) {
        this.threshold_rebalance = '100';
      }
    },

    handleChangePeriod: function() {
      if (this.rebalance_time_period < 0) {
        this.rebalance_time_period = 0;
      }
      if (this.rebalance_time_period > 100) {
        this.rebalance_time_period = 100;
      }
    }
  }
};
</script>

<template>
  <div class="time-filter">
    <div class="rebalance-threshold">
      <div class="rebalance-threshold__title">
        threshold <br >
        rebalance
      </div>

      <div
        v-show="!edit"
        :class="{
          'time-filter__input-before': Number(threshold_rebalance) >= 1
        }"
        class="time-filter__input-after"
        @click.prevent="toggleEdit(edit, $event)"
      >
        {{ threshold_rebalance }}
        <span
          v-if="
            Number(threshold_rebalance) >= 0 &&
              Number(threshold_rebalance) <= 100
          "
          class=""
        >%</span
        >
        <!--<span -->
        <!--  v-if="Number(threshold_rebalance) === 0" -->
        <!--  class="over">0%</span> -->
      </div>

      <input
        v-show="edit"
        ref="input"
        v-model="threshold_rebalance"
        value="Number(threshold_rebalance)"
        type="text"
        class="time-filter__input"
        placeholder=""
        @input="onChange"
        @change="handleChange()"
        @blur="saveEdit()"
        @keyup.enter="saveEdit()"
        @keypress="onlyForCurrency"
      >
    </div>

    <div class="rebalance-period">
      <div class="rebalance-period__title">
        rebalance <br >
        period
      </div>
      <div class="rebalance-period__items">
        <input
          v-show="rebalance_period != 'off'"
          v-model="rebalance_time_period"
          type="text"
          class="time-filter__input"
          value="rebalance_time_period"
          @change="handleChangePeriod(value)"
          @blur="saveEdit(value)"
          @keyup.enter="saveEdit(value)"
          @keypress="onlyNumber"
        >

        <BaseSelect2
          :title="false"
          :list="['hour', 'day', 'week', 'off']"
          v-model="rebalance_period"
          name="time"
          class="time-filter__select"
        >
          {{ rebalance_period }}
        </BaseSelect2>
      </div>
    </div>

    <div class="time-filter__button-overflow">
      <button 
        v-if="button" 
        class="time-filter__button" 
        @click="savePortfolios">
        SAVE
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.time-filter__input-before {
  $size: 12px;
  font-size: em($size);
  border: none;
  border-radius: em(6px, $size);
  height: em(30px, $size);
  width: em(50px, $size);
  box-sizing: border-box;
  margin-right: em(6px, $size);
  text-align: center;
  background: $white;
}

.time-filter__input-after {
  $size: 12px;
  font-size: em($size);
  border: none;
  border-radius: em(6px, $size);
  height: em(30px, $size);
  width: em(50px, $size);
  box-sizing: border-box;
  margin-right: em(6px, $size);
  text-align: center;
  background: $white;
  padding: em(8px) 0;
}

.time-filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  /*max-width: em(350px);*/
  /*width: 100%;*/
  height: em(48px);
  background: $blue;
  padding: 0 em(15px) 0 em(15px);
  border-radius: 4px;
  @include ifmobile {
    height: 100%;
  }
  .rebalance-threshold {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    &__title {
      font-size: em(10px);
      line-height: em(24px);
      color: $white;
      margin-right: em(15px);
    }
  }
  .rebalance-period {
    display: flex;
    flex-direction: row;
    align-items: center;
    &__title {
      font-size: em(10px);
      line-height: em(24px);
      color: $white;
      margin-right: em(15px);
    }
    &__items {
      display: flex;
      flex-direction: row;
    }
  }

  &__input {
    $size: 12px;
    font-size: em($size);
    border: none;
    border-radius: em(6px, $size);
    height: em(30px, $size);
    width: em(50px, $size);
    box-sizing: border-box;
    margin-right: em(6px, $size);
    text-align: center;
  }

  &__button-overflow {
    @include ifmobile {
      width: 200px;
      text-align: center;
      margin-top: em(20px);
    }
  }

  &__button {
    $size: 12px;
    font-size: em($size);
    border: none;
    color: $white;
    width: em(50px, $size);
    height: em(30px, $size);
    border-radius: em(6px, $size);
    box-sizing: border-box;
    transition: all $speed;
    outline: none;
    cursor: pointer;

    @include ifdesktop {
      background: none;
      margin-left: em(30px, $size);
      font-weight: bold;
    }
    @include ifmobile {
      margin-left: em(6px, $size);
      background: rgba(255, 255, 255, 0.2);
    }

    &:hover {
      color: $blue;
      background-color: $white;
    }
    &:active {
      background-color: $light-blue;
    }
  }
}
</style>

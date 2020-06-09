<script>
/*RebalancingTimeFilter*/
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  props: {
    button: {
      type: Boolean,
      default: true
    },

    cripto_index: {
      type: String,
      default: 'Off'
    },

    threshold_rebalance: {
      type: Number,
      default: 0
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
      edit: true,
      flagShowModalTimeFilter: true
    };
  },

  computed: {
    ...mapState('page', ['rebalanceOptions', 'activeMarket', 'userInfo']),

    get_status_account() {
      return this.userInfo.status_account;
    },

    isVipAcc() {
      if (this.get_status_account == 2 || this.get_status_account == 1) {
        return true;
      } else {
        return false;
      }
    },

    isProVipAcc() {
      if (this.get_status_account == 2) {
        return true;
      } else {
        return false;
      }
    },

    get_trial_status() {
      return this.userInfo.is_trial_uses;
    },

    is_trial() {
      if (this.get_trial_status && !this.isVipAcc) {
        return true;
      } else false;
    },

    is_computed_flag_show_modal: {
      get() {
        if (this.isVipAcc) return false;
        else return this.flagShowModalTimeFilter;
      }
    },

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
    cripto_index() {
      if (this.isProVipAcc) {
        this.rebalance_options = this.get_data();
      } else {
        this.setPopup('upgrade-pro-popup');
      }
    },

    threshold_rebalance() {
      this.rebalance_options = this.get_data();
    },

    rebalance_time_period() {
      this.rebalance_options = this.get_data();
    },

    rebalance_period() {
      this.rebalance_options = this.get_data();
    }
  },

  mounted() {},

  methods: {
    ...mapMutations('page', [
      'setPopup',
      'setRebalanceOptions',
      'setIsSaveOptionButtom'
    ]),

    ...mapActions('page', ['getRebalanceNow']),

    get_data() {
      return {
        threshold_rebalance: this.threshold_rebalance,
        rebalance_time_period: this.rebalance_time_period,
        rebalance_period: this.rebalance_period,
        cripto_index: this.cripto_index
      };
    },

    clickButtonRebalanceNow() {
      if (this.is_computed_flag_show_modal) {
        // console.log('2');
        this.setPopup('upgrade-popup');
      } else {
        this.getRebalanceNow(this.active_market.market_title);
      }
    },

    clickButton() {
      if (this.is_computed_flag_show_modal) {
        // console.log('1');
        this.setPopup('upgrade-popup');
      } else {
        this.setIsSaveOptionButtom();
      }
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
        this.$refs.input.select();
      });
    },
    // сохранение значения инпута
    saveEdit: function() {
      this.edit = false;
    },
    // валидация кнопки %
    handleChange: function() {
      if (Number(this.threshold_rebalance) < 0) {
        this.threshold_rebalance = '0';
      }
      if (Number(this.threshold_rebalance) >= 100) {
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
    <div class="rebalance-index">
      <div class="rebalance-threshold__title">crypto index</div>
      <BaseSelect3
        :title="false"
        :list="['Off', 'Week', 'Month ']"
        v-model="cripto_index"
        name="time"
        class="time-filter__select"
      >
        {{ cripto_index }}
      </BaseSelect3>
    </div>

    <div class="rebalance-threshold">
      <div class="rebalance-threshold__title">threshold rebalance</div>

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
      </div>

      <input
        v-show="edit"
        ref="input"
        v-model="threshold_rebalance"
        value="Number(threshold_rebalance)"
        type="text"
        class="time-filter__input"
        placeholder="0%"
        @input="onChange"
        @change="handleChange(value)"
        @blur="saveEdit(value)"
        @keyup.enter="saveEdit(value)"
        @keypress="onlyForCurrency"
      >
    </div>

    <div class="rebalance-period">
      <div class="rebalance-period__title">rebalance period</div>
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

    <div class="rebalance-period__btns">
      <button 
        class="time-filter__button" 
        @click="clickButton">
        SAVE
      </button>

      <BaseButton
        type="white"
        class="rebalancing-tab-content__rebalance-button"
        @click.native="clickButtonRebalanceNow"
      >
        REBALANCE
        <div class="rebalancing-tab-content__rebalance-button-img">
          <svg 
            viewBox="0 0 18 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M9 18.5V15.25L13.3164 19.5664L9 23.9336V20.6836C6.63021 20.6836 4.58203 19.8372 2.85547 18.1445C1.16276 16.418 0.316406 14.3698 0.316406 12C0.316406 10.3073 0.773438 8.76693 1.6875 7.37891L3.26172 8.95312C2.75391 9.86719 2.5 10.8828 2.5 12C2.5 13.7943 3.1263 15.3346 4.37891 16.6211C5.66536 17.8737 7.20573 18.5 9 18.5ZM9 3.31641C11.3698 3.31641 13.401 4.17969 15.0938 5.90625C16.8203 7.59896 17.6836 9.63021 17.6836 12C17.6836 13.6927 17.2266 15.2331 16.3125 16.6211L14.7383 15.0469C15.2461 14.1328 15.5 13.1172 15.5 12C15.5 10.2057 14.8568 8.68229 13.5703 7.42969C12.3177 6.14323 10.7943 5.5 9 5.5V8.75L4.68359 4.43359L9 0.0664062V3.31641Z" 
              fill="#0F67F0"/>
          </svg>
        </div>
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rebalancing-tab-content__rebalance-button-img {
  width: em(20px);
  height: em(26px);
  margin-left: em(10px);
}
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
  padding: em(6px) 0;
}

.time-filter {
  display: flex;
  align-items: center;
  @include ifmobile {
    justify-content: center;
    flex-wrap: wrap;
  }
  .rebalance-index {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: em(-10px);
    margin-right: em(20px);
    @include ifmobile {
      margin-right: 0em;
    }
    &__title {
      font-size: em(10px);
      line-height: em(15px);
      color: $white;
      margin-bottom: em(5px);
    }
  }
  .rebalance-threshold {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: em(-10px);
    &__title {
      font-size: em(10px);
      line-height: em(15px);
      color: $white;
      margin-bottom: em(5px);
    }
  }
  .rebalance-period {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: em(-10px);
    margin-left: em(5px);

    &__title {
      font-size: em(10px);
      line-height: em(15px);
      color: $white;
      margin-bottom: em(5px);
    }
  }
  .rebalance-period__btns {
    /*display: none;*/
    @include ifmobile {
      display: block;
      margin: 0 auto;
      margin-top: em(20px);
    }
    .time-filter__button {
      text-align: center;
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
    &::placeholder {
      padding-left: em(10px);
    }
    &::-webkit-input-placeholder {
      padding-left: em(10px);
    }
    &:-ms-input-placeholder {
      padding-left: em(10px);
    }
    &::-ms-input-placeholder {
      padding-left: em(10px);
    }
  }

  &__button {
    $size: 12px;
    font-size: em($size);
    border: none;
    color: $white;
    width: em(72px);
    height: em(30px, $size);
    border-radius: em(6px, $size);
    box-sizing: border-box;
    transition: all $speed;
    outline: none;
    cursor: pointer;
    /*align-self: flex-end;*/
    text-align: center;

    @include ifdesktop {
      background: none;
      margin-right: em(20px, $size);
      margin-left: em(20px, $size);
      font-weight: bold;
    }
    @include ifmobile {
      margin-left: 0;
      margin-right: em(20px);
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

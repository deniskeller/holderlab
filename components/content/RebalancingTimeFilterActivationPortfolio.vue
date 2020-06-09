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
    cripto_index() {
      this.rebalance_options = this.get_data();
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
    ...mapMutations('page', ['setRebalanceOptions', 'setIsSaveOptionButtom']),

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
      // console.log('click');
      this.getRebalanceNow(this.active_market.market_title);
    },

    clickButton() {
      this.setIsSaveOptionButtom();
    },

    onChange() {},

    // событие вызова поля ввода
    toggleEdit: function(value, e) {
      this.edit = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    // сохранение значения инпута
    saveEdit: function(value) {
      this.edit = false;
    },
    // валидация кнопки %
    handleChange: function(value) {
      if (Number(this.threshold_rebalance) < 0) {
        this.threshold_rebalance = '0';
      }
      if (Number(this.threshold_rebalance) > 100) {
        this.threshold_rebalance = '100';
      }
    }
  }
};
</script>

<template>
  <div class="time-filter">
    <div class="rebalance-threshold">
      <div class="rebalance-threshold__title">
        threshold <br />
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
            Number(threshold_rebalance) > 0 && Number(threshold_rebalance) <= 99
          "
          class=""
          >%</span
        >
        <span v-if="Number(threshold_rebalance) === 0" class="over">0%</span>
      </div>

      <input
        v-show="edit"
        ref="input"
        v-model="threshold_rebalance"
        value="Number(threshold_rebalance)"
        type="number"
        class="time-filter__input"
        placeholder="0%"
        min="0"
        max="100"
        @input="onChange"
        @change="handleChange(value)"
        @blur="saveEdit(value)"
        @keyup.enter="saveEdit(value)"
      />
    </div>

    <div class="rebalance-period">
      <div class="rebalance-period__title">rebalance period</div>
      <div class="rebalance-period__items">
        <input
          v-model="rebalance_time_period"
          type="number"
          min="1"
          class="time-filter__input"
          value="rebalance_time_period"
        />

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
      <button class="time-filter__button" @click="clickButton">
        SAVE
      </button>

      <BaseButton
        type="white"
        class="rebalancing-tab-content__rebalance-button"
        @click.native="clickButtonRebalanceNow"
      >
        REBALANCE NOW
      </BaseButton>
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
  width: em(40px, $size);
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
  width: em(40px, $size);
  box-sizing: border-box;
  margin-right: em(6px, $size);
  text-align: center;
  background: $white;
  padding: em(8px) 0;
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
    @include ifmobile {
      margin-left: -1em;
    }
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
    width: em(40px, $size);
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

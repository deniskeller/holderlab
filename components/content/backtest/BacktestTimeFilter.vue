<script>
/*BacktestTimeFilter*/
import { mapMutations, mapState } from 'vuex';
export default {
  data() {
    return {
      list_data: ['hour', 'day', 'week', 'off'],
      // threshold_rebalance: '',
      // rebalance_time_period: 1,
      // rebalance_period: 'day',
      value: '',
      edit: false
      // edit: true
    };
  },
  computed: {
    ...mapState('page', ['paramsBacktestTimeFilter']),

    threshold_rebalance: {
      get() {
        return this.params.threshold_rebalance;
      },
      set(value) {
        this.changeParamsBacktestTimeFilter({
          key: 'threshold_rebalance',
          value: value
        });
      }
    },

    rebalance_time_period: {
      get() {
        return this.params.rebalance_time_period;
      },
      set(value) {
        this.changeParamsBacktestTimeFilter({
          key: 'rebalance_time_period',
          value: value
        });
      }
    },

    rebalance_period: {
      get() {
        return this.params.rebalance_period;
      },
      set(value) {
        this.changeParamsBacktestTimeFilter({
          key: 'rebalance_period',
          value: value
        });
      }
    },

    params: {
      get() {
        return this.paramsBacktestTimeFilter;
      },
      set(value) {
        this.changeParamsBacktestTimeFilter(value);
      }
    }

    // filter() {
    //   switch (this.params.rebalance_period) {
    //     case this.list_data[0]:
    //       return 24;
    //     case this.list_data[1]:
    //       return 30;
    //     case this.list_data[2]:
    //       return 12;
    //     case this.list_data[3]:
    //       return 12;
    //   }
    // }
  },
  watch: {
    // params() {
    //   this.$emit('input', this.params);
    // },
    threshold_rebalance() {
      // this.params = {
      //   key: 'threshold_rebalance',
      //   value: this.threshold_rebalance
      // };
      this.$emit('input', this.params);
    },
    rebalance_time_period() {
      // this.params = { key: 'rebalance_time_period', value: this.rebalance_time_period };
      this.$emit('input', this.params);
    },
    rebalance_period() {
      // this.params = { key: 'rebalance_period', value: this.rebalance_period };
      this.$emit('input', this.params);
    }
  },
  mounted() {
    // console.log(this.params);
    this.$emit('input', this.params);
  },
  methods: {
    ...mapMutations('page', [
      'setPopup',
      'changeParamsBacktestTimeFilter',
      'changeParamsBacktestTimeFilter'
    ]),

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

    // onChange() {
    //   this.$emit('input', this.params);
    // },

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
      if (Number(this.params.threshold_rebalance) < 0) {
        this.params = { key: 'threshold_rebalance', value: '0' };
      }
      if (Number(this.params.threshold_rebalance) >= 100) {
        this.params = { key: 'threshold_rebalance', value: '100' };
      }
    },

    handleChangePeriod: function(value) {
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
    <!--{{params}}-->
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
        <!--  v-if="params.threshold_rebalance.length === 0" -->
        <!--  class="over">0%</span> -->
      </div>

      <input
        v-show="edit"
        ref="input"
        v-model="threshold_rebalance"
        type="text"
        class="time-filter__input"
        placeholder="0%"
        min="0"
        max="100"
        @change="handleChange(value)"
        @blur="saveEdit(value)"
        @keyup.enter="saveEdit(value)"
        @keypress="onlyForCurrency"
      >
    </div>

    <div 
      
      class="rebalance-period">
      <div class="rebalance-period__title">
        rebalance <br >
        period
      </div>
      
      
      <div 
        v-show="rebalance_period != 'off'" 
        class="rebalance-period__items" >
        <input
          v-model="rebalance_time_period"
          type="text"
          class="time-filter__input"
          value="rebalance_time_period"
          @change="handleChangePeriod(value)"
          @blur="saveEdit(value)"
          @keyup.enter="saveEdit(value)"
          @keypress="onlyNumber"
        >
        
      </div>
      <BaseSelect2
        :title="false"
        :list="list_data"
        v-model="rebalance_period"
        name="time"
        class="time-filter__select"
      >
        
        {{ params.rebalance_period }}
      </BaseSelect2>
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
  padding: em(7px) 0;
}
.time-filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /*max-width: em(350px);*/
  /*width: 100%;*/
  height: em(48px);
  background: $blue;
  padding: 0 em(15px) 0 em(15px);
  border-radius: 4px;
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
    width: em(50px, $size);
    height: em(30px, $size);
    border-radius: em(6px, $size);
    box-sizing: border-box;
    transition: all $speed;
    outline: none;
    cursor: pointer;
    align-self: flex-end;

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

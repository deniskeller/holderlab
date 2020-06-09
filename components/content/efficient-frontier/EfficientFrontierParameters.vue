<script>
/*EfficientFrontierParameters*/
import { mapMutations, mapState } from 'vuex';

export default {
  components: {},

  props: {
    type_component: {
      // variable:
      // desktop
      // mobile
      type: String,
      default: 'desktop'
    }
  },

  data() {
    return {
      buttonInactive: true,
      is_click: false,
      value_radio: null,
      time_start: null,
      time_end: null,
      selectedValue: '5000 Portfolios',
      is_flag_account_update: false,
      flagShowModalEfficientFr: true
    };
  },

  computed: {
    ...mapState('page', ['selectedCoinList', 'userInfo']),
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

    get_trial_status() {
      return this.userInfo.is_trial_uses;
    },

    is_computed_flag_show_modal: {
      get() {
        if (this.isVipAcc) return false;
        else return this.flagShowModalEfficientFr;
      },
      set(value) {
        this.flagShowModalEfficientFr = true;
      }
    },
    // get_status_account() {
    //   return this.userInfo.status_account;
    // },

    // isVipAcc() {
    //   if (this.get_status_account == 2) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },

    // get_trial_status() {
    //   return this.userInfo.is_trial_uses;
    // },

    // is_trial() {
    //   if (this.get_trial_status && !this.isVipAcc) {
    //     return true;
    //   } else false;
    // },

    // is_computed_flag_show_modal: {
    //   get() {
    //     if (this.isVipAcc) return false;
    //     else return this.flagShowModalEfficientFr;
    //   }
    // },

    selected_coins: {
      get() {
        return this.selectedCoinList;
      },
      set(value) {
        this.setAddItemInSelectedCoinList(value);
      }
    },

    is_inactive_button() {
      if (
        !this.time_start ||
        !this.time_end ||
        this.selectedCoinList.length === 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  },

  watch: {
    is_click() {
      // console.log(this.selectedValue);
      if (this.selectedValue == '50000 Portfolios') {
        this.value_radio = '50000';
      } else {
        this.value_radio = '5000';
      }
      this.$emit('input', {
        value_radio: this.value_radio,
        time_start: this.time_start,
        time_end: this.time_end,
        is_click: this.is_click
      });
    }
  },

  methods: {
    ...mapMutations('page', ['setPopup', 'setAddItemInSelectedCoinList']),

    onClick() {
      if (this.is_computed_flag_show_modal) {
        this.setPopup('upgrade-popup');
      } else {
        this.is_click = !this.is_click;
      }
    },

    changeValue: function() {
      if (
        this.selectedValue == '50000 Portfolios' &&
        this.get_status_account == 2
      ) {
        this.selectedValue = '50000 Portfolios';
      } else {
        this.selectedValue = '5000 Portfolios';
      }
    }
  }
};
</script>

<template>
  <div class="efficient-frontier-parameters">
    <BaseCenterTitle 
      type="h2" 
      class="efficient-frontier-parameters__title"
    >Parameters</BaseCenterTitle
    >
    <div class="efficient-frontier-parameters__portfolio-date">
      <div class="efficient-frontier-parameters__portfolio-date__select-block">
        <div
          class="efficient-frontier-parameters__portfolio-date__select-block-title"
        >
          START DATE
        </div>
        <BaseDataInput
          v-model="time_start"
          :from="time_end"
          placeholder="DD/MM/YY"
          class="efficient-frontier-parameters__portfolio-date__select-block-dateinput"
        />
      </div>

      <div class="efficient-frontier-parameters__portfolio-date__select-block">
        <div
          class="efficient-frontier-parameters__portfolio-date__select-block-title"
        >
          END DATE
        </div>
        <BaseDataInput
          :to="time_start"
          v-model="time_end"
          placeholder="DD/MM/YY"
          class="efficient-frontier-parameters__portfolio-date__select-block-dateinput"
        />
      </div>

      <BaseButton
        :is-inactive="is_inactive_button"
        type="primary"
        class="efficient-frontier-parameters__launch-button efficient-frontier-parameters__launch-button-mobile"
        @click.native="onClick"
      >
        CALCULATE
      </BaseButton>
    </div>

    <div class="efficient-frontier-parameters__portfolio-select">
      <BaseRadioButton
        v-model = "selectedValue"
        :value="selectedValue"
        :id="type_component + '-radio-1'"
        name="options"
        label="5000 Portfolios"
        class="portfolio-select__radio-button"
        @change="changeValue"
      />

      <BaseRadioButton
        v-model = "selectedValue"
        :value="selectedValue"
        :id="type_component + '-radio-2'"
        name="options"
        label="50000 Portfolios"
        class="portfolio-select__radio-button"
        @change="changeValue"
      />
    </div>

    <BaseButton
      :is-inactive="is_inactive_button"
      type="primary"
      class="efficient-frontier-parameters__launch-button efficient-frontier-parameters__launch-button-desktop"
      @click.native="onClick"
    >
      CALCULATE
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.efficient-frontier-parameters {
  padding-top: em(100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  @include ifmobile {
    padding: em(20px) em(10px);
  }
  &__title {
    margin-bottom: em(16px);
    @include ifmobile {
      display: none;
    }
  }
  &__portfolio-date {
    display: flex;
    flex-direction: column;
    align-items: center;
    @include ifmobile {
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
    }
    &__select-block {
      text-align: center;
      margin-bottom: em(17px);
      position: relative;
      &-title {
        font-size: em(12px);
        line-height: em(18px);
        color: #c4c4c4;
        margin-bottom: em(10px);
      }
      &-dateinput {
        max-width: em(155px);
        width: 100%;
        @include ifmobile {
          max-width: em(108px);
        }
      }
    }
  }

  &__portfolio-select {
    margin-bottom: em(35px);
    position: relative;
    z-index: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include ifmobile {
      width: 100%;
      flex-direction: row;
      justify-content: space-around;
      order: -1;
    }
    .portfolio-select__radio-button {
      margin-bottom: em(20px);
      @include ifmobile {
        margin-bottom: 0;
        width: 40%;
      }
    }
  }
}
.efficient-frontier-parameters__launch-button-mobile {
  display: none;
  @include ifmobile {
    display: block;
  }
}
.efficient-frontier-parameters__launch-button-desktop {
  @include ifmobile {
    display: none;
  }
}
</style>

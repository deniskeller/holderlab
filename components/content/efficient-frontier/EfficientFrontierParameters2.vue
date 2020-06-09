<script>
/*EfficientFrontierParameters*/
import { mapMutations } from 'vuex';

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
      is_click: false,
      value_radio: null,
      time_start: null,
      time_end: null,
      selectedValue2: '5000 Portfolios',
      vipUser: 1
    };
  },

  computed: {},

  watch: {
    is_click() {
      this.$emit('input', {
        value_radio: this.value_radio,
        time_start: this.time_start,
        time_end: this.time_end,
        is_click: this.is_click
      });
    }
  },

  methods: {
    ...mapMutations('page', ['setPopup']),

    onClick() {
      this.is_click = !this.is_click;
    },

    changeValue: function(newValue) {
      this.selectedValue2 = newValue;

      if (this.selectedValue2 == '50000 Portfolios' && this.vipUser == 1) {
        this.setPopup('upgrade-popup');
        // console.log('kek');
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
        type="primary"
        class="efficient-frontier-parameters__launch-button efficient-frontier-parameters__launch-button-mobile"
      >
        CALCULATE
      </BaseButton>
    </div>

    <div class="efficient-frontier-parameters__portfolio-select">
      <BaseRadioButton
        :value="selectedValue2"
        :id="type_component + '-radio-1'"
        name="options"
        label="5000 Portfolios"
        class="portfolio-select__radio-button"
        @change="changeValue"
      />

      <BaseRadioButton
        :value="selectedValue2"
        :id="type_component + '-radio-2'"
        name="options"
        label="50000 Portfolios"
        class="portfolio-select__radio-button"
        @change="changeValue"
      />
    </div>

    <BaseButton
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

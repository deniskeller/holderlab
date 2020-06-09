<script>
import RangeSlider from '~/components/content/efficient-frontier/RangeSlider';

export default {
  components: {
    RangeSlider
  },

  data() {
    return {
      value: 0
    };
  },

  watch: {
    value() {
      this.$emit('input', this.value);
    }
  }
};
</script>

<template>
  <div class="risk-slider">
    <BaseAngleBar 
      type="light-blue" 
      class="risk-slider__angle-bar" />
    <div class="risk-slider__text">
      The goal of the model is to find the optimal portfolio with minimal risk and maximum profitability, according to the theory of portfolio Markowitz.
    </div>

    <RangeSlider 
      v-model="value" 
      class="risk-slider__range-slider" />

    <div class="risk-slider__titles">
      <div class="risk-slider__title">
        LOW RISK
      </div>
      <div class="risk-slider__title">
        OPTIMAL RISK
      </div>
      <div class="risk-slider__title">
        HIGH RISK
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.risk-slider {
  position: relative;
  padding: em(24px);
  background-color: $light-blue;

  &__angle-bar {
    left: em(17px);
  }

  &__text {
    color: $grey;
  }

  &__range-slider {
    margin: em(20px) 0 em(6px) 0;
  }

  &__titles {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
    text-transform: uppercase;
  }
}
</style>

<script>
export default {
  data() {
    return {
      investmentVisible: false
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<template>
  <div 
    :class="{ is_visible: investmentVisible }" 
    class="backtest-investment">
    <div
      class="backtest-investment__title"
      @click="investmentVisible = !investmentVisible"
    >
      PORTFOLIO STATISTICS
      <svg 
        class="backtest-investment__arrow-list" 
        viewBox="0 0 8 6">
        <path
          d="M0.9375 0.71875L4 3.78125L7.0625 0.71875L8 1.65625L4 5.65625L0 1.65625L0.9375 0.71875Z"
        />
      </svg>
    </div>
    <div class="backtest-investment__items">
      <div class="backtest-investment__item">
        <div class="backtest-investment__value">
          $13489.9
        </div>
        <div class="backtest-investment__text">
          PORTFOLIO VALUE
        </div>
      </div>

      <div class="backtest-investment__item">
        <div
          class="backtest-investment__value backtest-investment__value_green"
        >
          $16.8473
        </div>
        <div class="backtest-investment__text">
          TOTAL RETURN, $
        </div>
      </div>

      <div class="backtest-investment__item">
        <div class="backtest-investment__value backtest-investment__value_red">
          -3.26%
        </div>
        <div class="backtest-investment__text">
          MAX DRAWNDAWN
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.backtest-investment {
  @include ifmobile {
    padding: 0 em(15px) em(20px);
    border-bottom: 1px solid $grey;
  }
  &__title {
    $size: 14px;
    font-size: em($size);
    font-weight: bold;
    color: $grey;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__arrow-list {
    width: em(12px);
    height: em(9px);
    fill: $grey;

    @include ifdesktop {
      display: none;
    }

    @include ifparent('.is_visible') {
      transform: scaleY(-1);
    }
  }
  &__items {
    @include ifdesktop {
      display: flex;
      margin-top: em(30px);
    }
    @include ifmobile {
      margin-top: em(10px);
      overflow: hidden;
      max-height: 0;
      transition: max-height $speed linear;
    }
    @include ifparent('.is_visible') {
      max-height: em(500px);
    }
  }
  &__item {
    @include ifdesktop {
      width: em(166px);
      margin-right: em(30px);
    }
    @include ifmobile {
      margin-bottom: em(15px);
    }
    padding: em(8px) em(13px);
    &:first-child {
      border: em(2px) solid $grey;
      border-radius: em(6px);
    }
  }
  &__value {
    $size: 26px;
    font-size: em($size);
    &_green {
      color: $green;
    }
    &_red {
      color: $red;
    }
  }
  &__text {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
  }
}
</style>

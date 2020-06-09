<script>
export default {
  props: {
    is_capitalications_in_btc: {
      type: Boolean,
      default: false
    },
    portfoliovalue: {
      type: String,
      default: ''
    },
    portfoliovalue_btc: {
      type: String,
      default: ''
    },
    get_return_persent_time_stamp: {
      type: String,
      default: ''
    },
    get_return_usd_time_stamp: {
      type: String,
      default: ''
    },

    get_return_btc_time_stamp: {
      // type: Number,
      // default: 0
      type: String,
      default: ''
    },
    totalreturn: {
      type: String,
      default: ''
    },
    totalreturn_btc: {
      type: String,
      default: ''
    },
    maxdrawndawn: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      investmentVisible: false
    };
  },
  computed: {},

  mounted() {
    // if (!this.$cookie.get('secret_token')) {
    //   this.$router.push({ path: '/login' });
    // } else {
    // }
  },
  methods: {}
};
</script>

<template>
  <div 
    :class="{ is_visible: investmentVisible }" 
    class="dashboard-investment">
    <div
      class="dashboard-investment__title"
      @click="investmentVisible = !investmentVisible"
    >
      PORTFOLIO STATISTICS 1
      <svg 
        class="dashboard-investment__arrow-list" 
        viewBox="0 0 8 6">
        <path
          d="M0.9375 0.71875L4 3.78125L7.0625 0.71875L8 1.65625L4 5.65625L0 1.65625L0.9375 0.71875Z"
        />
      </svg>
    </div>
    <div class="dashboard-investment__items">
      <div class="dashboard-investment__item">
        <div class="dashboard-investment__value">
          <div
            v-if ="!is_capitalications_in_btc">
            {{ portfoliovalue }}$
          </div>
          <div
            v-else >
            {{ portfoliovalue_btc }}BTC
          </div>
        </div>
        <div class="dashboard-investment__text">
          PORTFOLIO VALUE
        </div>
      </div>

      <div class="dashboard-investment__item dashboard-investment__item-mobile">
        <!--get_return_persent_time_stamp.charAt(0) === '-'-->
        <div
          :class="[
            Number(get_return_persent_time_stamp)<0
              ? 'dashboard-investment__value_red'
              : 'dashboard-investment__value_green'
          ]"
          class="dashboard-investment__value"
        >
          {{ get_return_persent_time_stamp }}%
        </div>
        <div class="dashboard-investment__text">
          RETURN %
        </div>
      </div>

      <div class="dashboard-investment__item dashboard-investment__item-mobile">
        <div
          :class="[
            get_return_usd_time_stamp.charAt(0) === '-'
              ? 'dashboard-investment__value_red'
              : 'dashboard-investment__value_green'
          ]"
          class="dashboard-investment__value"
        >
          <div
            v-if ="!is_capitalications_in_btc">
            {{ get_return_usd_time_stamp }}$
          </div>
          <div
            v-else >
            {{ get_return_btc_time_stamp }}BTC
          </div>
        </div>
        <div class="dashboard-investment__text">
          RETURN <span v-if ="!is_capitalications_in_btc">$</span><span v-else>BTC</span>
        </div>
      </div>

      <div class="dashboard-investment__item">
        <div
          :class="[
            totalreturn.charAt(0) === '-'
              ? 'dashboard-investment__value_red'
              : 'dashboard-investment__value_green'
          ]"
          class="dashboard-investment__value"
        >
          <div
            v-if ="!is_capitalications_in_btc">
            {{ totalreturn }}$
          </div>
          <div
            v-else >
            {{ totalreturn_btc }}BTC
          </div>
        </div>
        <div class="dashboard-investment__text">
          TOTAL RETURN <span v-if ="!is_capitalications_in_btc">$</span><span v-else>BTC</span>
        </div>
      </div>

      <div class="dashboard-investment__item">
        <div
          :class="[
            maxdrawndawn.charAt(0) === '-'
              ? 'dashboard-investment__value_red'
              : 'dashboard-investment__value_green'
          ]"
          class="dashboard-investment__value"
        >
          {{ maxdrawndawn }}%
        </div>
        <div class="dashboard-investment__text">
          MAX DRAWDOWN
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.dashboard-investment {
  @include ifmobile {
    padding: 0 em(15px) em(20px);
    border-bottom: 1px solid $grey;
  }
  &__title {
    $size: 14px;
    font-size: em($size);
    font-weight: bold;
    color: $black;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  &__arrow-list {
    width: em(12px);
    height: em(9px);
    fill: $grey;
    position: absolute;
    right: 30px;
    top: 5px;

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
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid $grey;
      padding: em(15px) 0;
      margin-bottom: em(15px);
    }
  }
  &__item:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
  &__item-mobile {
    display: none;
    @include ifmobile {
      display: flex;
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

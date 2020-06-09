<script>
/*BacktestAsideAllocatedAssets*/
import { mapState } from 'vuex';

import backtestAllocatedAssets from '~/assets/data/backtest-allocated-assets.json';
import BacktestAsideAllocatedAsset from '~/components/content/backtest/BacktestAsideAllocatedAsset';
import AsidePlus from '~/components/aside/AsidePlus';

export default {
  components: {
    BacktestAsideAllocatedAsset,
    AsidePlus
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    },
    plus: {
      type: Boolean,
      default: true
    },
    selected_coins: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      close: true,
      backtestAllocatedAssets
    };
  },
  computed: {
    ...mapState('page', ['addAsset', 'isPathOnNewPortfolio']),

    is_show() {
      if (this.selected_coins.length === 0) {
        return false;
      } else {
        return true;
      }
    },

    percent() {
      let percent = 0;
      for (let item of this.selected_coins) {
        percent += parseFloat(item.percent) || 0;
      }
      return Math.round(percent * 100) / 100;
    }
  },
  watch: {
    selected_coins() {
      this.calculate();
    },
    percent() {
      this.$emit('input', this.percent);
    }
  },
  mounted() {
    this.calculate();
  },
  methods: {
    calculate() {
      if (this.percent === 100) {
        this.buttonInactive = false;
      } else {
        this.buttonInactive = true;
      }
    }
  }
};
</script>

<template>
  <div class="aside-allocated-assets">
    <BaseTitle 
      type="h3" 
      class="aside-allocated-assets__aside-title">
      {{ title }}
    </BaseTitle>

    <BaseBacktestAllocatedHeader
      v-show="is_show"
      :percent="percent"
      :title="subtitle"
      class="aside-allocated-assets__allocated-header"
    />
    <BaseScrollBlock6 class="aside-allocated-assets__scroll-block">
      <div class="aside-allocated-assets__items">
        <BacktestAsideAllocatedAsset
          v-for="(item, index) in selected_coins"
          :key="index"
          :title="item.title"
          :price="item.price"
          :id_coin="item.id_coin"
          :percent="item.percent"
          :short="item.short"
          class="aside-allocated-assets__item"
        />
        <div class="aside-allocated-assets__item-hidden" />
        <div class="aside-allocated-assets__item-hidden" />
      </div>
    </BaseScrollBlock6>
    <AsidePlus
      v-show = "!isPathOnNewPortfolio"
      v-if="plus"
      class="aside-allocated-assets__plus"
      @open-customize="setPopup('efficient-frontier-popup')"
    />

    <BaseButton
      v-show = "!isPathOnNewPortfolio"
      v-if="plus"
      :is-inactive="buttonInactive"
      type="primary"
      class="aside-allocated-assets__button"
    >
      SAVE AND CONTINUE
    </BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.aside-allocated-assets {
  &__items {
    @include ifmobile {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      margin-bottom: em(35px);
    }
  }

  &__aside-title {
    @include ifmobile {
      display: none;
    }
  }
  &__allocated-header {
    @include ifmobile {
      /*display: none;*/
    }
  }
  &__item {
    margin-bottom: em(6px);
  }
  &__item-hidden {
    width: em(102px);
    height: 0;
  }
  &__plus {
    margin-bottom: em(40px);
  }
  &__button {
    margin-left: em(15px);
  }
  &__scroll-block {
    height: em(616px);
    @include ifmobile {
      height: 100%;
    }
  }
  .aside-allocated-assets__item {
    width: em(240px);
    @include ifmobile {
      width: em(88px);
      height: em(60px);
    }
  }
}
</style>

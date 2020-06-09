<script>
/*AddCurrenciesTag*/
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    title: {
      type: String,
      default: null
    },
    short: {
      type: String,
      default: null
    },
    type_comp: {
      type: String,
      default: 'new'
    },
    close: {
      type: Boolean,
      default: true
    },
    id_coin: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      noValid: false
    };
  },
  computed: {
    ...mapState('page', [
      'analyzedPortfolios',
      'selectedCoinList',
      'portfolioCoinList'
    ]),

    no_valid() {
      if (this.noValid == true) {
        return 'rgba(233, 42, 0, 0.2)';
      }
    },

    get_portfolios() {
      if (this.type_comp == 'rebalancing') {
        return this.portfolioCoinList;
      }
      if (this.type_comp == 'new') {
        return this.analyzedPortfolios;
      }
      if (this.type_comp != 'rebalancing' && this.type_comp != 'new') {
        return this.selectedCoinList;
      }
    },

    isVisible() {
      for (let item of this.get_portfolios) {
        if (this.id_coin === item.id_coin) {
          return true;
        }
      }
      return false;
    }
  },

  mounted() {},

  methods: {
    ...mapMutations('page', [
      'setRemoveAsset',
      'setNewRemoveAsset',
      'setDellItemInSelectedCoinList',
      'setDellItemInPortfolioCoinList'
    ]),

    newSetRemoveAsset(value) {
      // console.log(this.type_comp);

      if (this.type_comp == 'rebalancing') {
        this.setDellItemInPortfolioCoinList(value);
      }
      if (this.type_comp == 'new') {
        this.setNewRemoveAsset(value);
      }
      if (this.type_comp != 'rebalancing' && this.type_comp != 'new') {
        this.setDellItemInSelectedCoinList(value);
      }
    },

    onClose() {
      if (this.id_coin) {
        this.newSetRemoveAsset(this.id_coin);
        this.setRemoveAsset(this.id_coin);
      }
      setTimeout(() => {
        this.$emit('close');
      }, 300);
    }
  }
};
</script>

<template>
  <transition name="aside-allocated-asset-fade">
    <div
      v-if="isVisible"
      :style="{ background: no_valid }"
      class="add-currencies-tag add-currencies-tag-1"
    >
      <BaseCoinMini 
        :title="id_coin" 
        class="add-currencies-tag__coin" />
      <div class="add-currencies-tag__title">
        <slot />
        <span class="short-name">{{ short }}</span>
      </div>
      <BaseClose
        v-if="close"
        class="add-currencies-tag__close"
        @click.native="onClose"
      />
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.add-currencies-tag {
  display: inline-block;
  width: em(130px);
  background: $light-blue;
  padding: em(2px) 0 em(2px) em(5px);
  border-radius: em(4px);
  margin-right: em(5px);
  margin-bottom: em(5px);
  position: relative;
  box-sizing: border-box;
  @include ifmobile {
    width: em(105px);
    height: em(75px);
    margin-right: 0;
  }
  &__coin {
    display: inline-block;
    vertical-align: middle;
    width: em(16px);
    height: em(16px);
    margin-right: em(4px);
  }
  &__title {
    display: inline-block;
    $size: 12px;
    font-size: em($size);
  }
  &__close {
    display: inline-block;
    float: right;
    svg {
      width: em(10px);
      height: em(10px);
      fill: $grey;
    }
  }
  .short-name {
    /*position: absolute;*/
  }
  &:last-child {
    margin-right: 0;
  }
}
.aside-allocated-asset-fade-enter-active,
.aside-allocated-asset-fade-leave-active {
  transition-property: max-height, opacity;
  transition-duration: 0.2s;
  max-height: em(500px);
}
.aside-allocated-asset-fade-enter,
.aside-allocated-asset-fade-leave-to {
  max-height: 0;
  opacity: 0;
}

.aside-allocated-asset-more-fade-enter-active,
.aside-allocated-asset-more-fade-leave-active {
  transition-property: max-height;
  transition-duration: 0.2s;
  max-height: em(300px);
}
.aside-allocated-asset-more-fade-enter,
.aside-allocated-asset-more-fade-leave-to {
  max-height: 0;
}
</style>

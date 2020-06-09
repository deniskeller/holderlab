<script>
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
    close: {
      type: Boolean,
      default: false
    },
    id_coin: {
      type: String,
      default: null
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('page', ['analyzedPortfolios']),

    isVisible() {
      for (let item of this.analyzedPortfolios) {
        if (this.id_coin === item.id_coin) {
          return true;
        }
      }
      return false;
    }
  },
  mounted() {},
  methods: {
    ...mapMutations('page', ['setRemoveAsset', 'setNewRemoveAsset']),

    onClose() {
      // this.isVisible = false;
      if (this.id_coin) {
        this.setNewRemoveAsset(this.id_coin);
        this.setRemoveAsset(this.id_coin);
      }
      setTimeout(() => {
        this.$emit('close');
      }, 300);
    },

    onKey(e) {
      if (e.key === 'ArrowUp') {
        this.value = parseInt(this.value) + 1;
        setTimeout(() => {
          this.onChange();
        });
      }
      if (e.key === 'ArrowDown') {
        this.value = parseInt(this.value) - 1;
        if (this.value < 0) this.value = 0;
        setTimeout(() => {
          this.onChange();
        });
      }
    }
  }
};
</script>

<template>
  <transition name="aside-allocated-asset-fade">
    <div 
      v-if="isVisible" 
      class="add-currencies-tag add-currencies-tag-1">
      <BaseCoinMini 
        :title="id_coin" 
        class="add-currencies-tag__coin" />
      <div class="add-currencies-tag__title">
        <slot />
        <span class="short-name">{{ short }}</span>
      </div>
      <BaseClose 
        class="add-currencies-tag__close" 
        @click.native="onClose" />
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.add-currencies-tag {
  display: inline-block;
  width: em(105px);
  background: $light-blue;
  padding: em(2px) 0 em(2px) em(10px);
  border-radius: em(4px);
  margin-right: em(5px);
  margin-bottom: em(5px);
  @include ifmobile {
    width: em(95px);
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

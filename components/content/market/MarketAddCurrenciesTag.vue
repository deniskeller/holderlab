<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    remove: {
      type: Number,
      default: null
    },
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
    }
  },
  data() {
    return {
      isVisible: true
    };
  },
  computed: {
    ...mapState('page', ['removeAsset'])
  },
  watch: {
    removeAsset() {
      if (this.remove === this.removeAsset) {
        this.isVisible = false;
      }
    }
  },
  mounted() {},
  methods: {
    ...mapMutations('page', ['setRemoveAsset']),

    onClose() {
      this.isVisible = false;
      if (this.remove) {
        this.setRemoveAsset(this.remove);
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
      <BaseCoin 
        :title="title" 
        class="add-currencies-tag__coin" />
      <div class="add-currencies-tag__title">
        <slot />
        <span class="short-name">{{ short }}</span>
      </div>
      <BaseClose
        class="add-currencies-tag__close"
        @click.native="isVisible = false"
      />
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.add-currencies-tag {
  display: inline-block;
  background: $light-blue;
  padding: em(2px) 0 em(2px) em(10px);
  border-radius: em(4px);
  margin-right: em(5px);
  margin-bottom: em(5px);
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

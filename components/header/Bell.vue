<script>
import { mapMutations, mapState, mapActions } from 'vuex';
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isVisible: false
    };
  },

  computed: {
    ...mapState('page', ['count_dont_viewed'])
  },

  methods: {
    ...mapMutations('page', [
      'setIsMenuVisible',
      'setCountDontViewed',
    ]),
    onClick() {
      if (this.isVisible) {
        this.hideTip();
      } else {
        this.isVisible = true;
        setTimeout(() => {
          document.addEventListener('click', this.hideTip);
          document.addEventListener('keyup', this.keyUp);
        });
      }
    },
    keyUp(e) {
      if (e.keyCode == 27) {
        this.hideTip();
      }
    },
    hideTip() {
      document.removeEventListener('click', this.hideTip);
      document.removeEventListener('keyup', this.keyUp);
      this.isVisible = false;
    }
  }
};
</script>

<template>
  <div 
    :class="{ is_active: isActive }" 
    class="bell" 
    @click="onClick">
    <svg 
      class="bell__icon" 
      viewBox="0 0 18 20">
      <path
        d="M15 13.9844L17.0156 16V16.9844H0.984375V16L3 13.9844V9.01562C3 7.45312 3.39062 6.09375 4.17188 4.9375C4.98438 3.78125 6.09375 3.03125 7.5 2.6875V1.98438C7.5 1.57812 7.64062 1.23438 7.92188 0.953125C8.20312 0.640625 8.5625 0.484375 9 0.484375C9.4375 0.484375 9.79688 0.640625 10.0781 0.953125C10.3594 1.23438 10.5 1.57812 10.5 1.98438V2.6875C11.9062 3.03125 13 3.78125 13.7812 4.9375C14.5938 6.09375 15 7.45312 15 9.01562V13.9844ZM9 19.9844C8.4375 19.9844 7.95312 19.7969 7.54688 19.4219C7.17188 19.0469 6.98438 18.5781 6.98438 18.0156H11.0156C11.0156 18.5469 10.8125 19.0156 10.4062 19.4219C10 19.7969 9.53125 19.9844 9 19.9844Z"
      />
    </svg>
    <transition name="bell-tip-fade">
      <nuxt-link
        v-if="isVisible"
        tag="div"
        to="/account/history"
        class="bell-tip bell__tip"
        @click.native="setIsMenuVisible(false)"
      >
        <BaseAngleBar 
          type="white" 
          class="bell-tip__angle-bar" />
        <div class="bell-tip__title">
          HISTORY
        </div>
        <div class="bell-tip__count">
          {{ count_dont_viewed }}
        </div>
      </nuxt-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.bell {
  $this: &;

  position: relative;
  height: em(20px);
  cursor: pointer;

  &:hover {
    opacity: 1;

    #{$this}__icon {
      opacity: 1;
    }
  }
  &__icon {
    width: em(18px);
    fill: $white;
    transition: opacity $speed;
    opacity: 0.5;
  }
  &.is_active {
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: em(8px);
      height: em(8px);
      top: em(-4px);
      right: em(-4px);
      border-radius: 100%;
      background-color: $yellow;
    }
  }

  &__tip {
    position: absolute;
    @include ifdesktop {
      top: em(51px);
      right: em(-3px);
    }
    @include ifmobile {
      top: em(35px);
      right: em(-5px);
    }
  }
}

.bell-tip {
  background: $yellow;
  width: em(262px);
  height: em(70px);
  padding: 0 em(24px);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: em(50px);
    height: 100%;
    top: -100%;
    right: 0;
  }

  &__title {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
    color: $black;
  }

  &__count {
    $size: 12px;
    font-size: em($size);
    color: $blue;
    font-weight: bold;
    padding: em(4px, $size) em(12px, $size);
    background: $white;
    border-radius: em(20px, $size);
  }

  &__angle-bar {
    top: em(-6px);

    bottom: auto;
    transform: scaleY(-1);
    @include ifdesktop {
      right: em(6px);
    }
    @include ifmobile {
      right: em(7px);
    }
  }
}

.bell-tip-fade-enter-active,
.bell-tip-fade-leave-active {
  transition-property: opacity, transform;
  transition-duration: $speed;
}
.bell-tip-fade-enter,
.bell-tip-fade-leave-to {
  opacity: 0;
  transform: translateY(-5%);
}
</style>

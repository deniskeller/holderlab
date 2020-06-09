<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    ...mapMutations('page', ['setPopup']),
    ...mapMutations('page', ['setIsMenuVisible']),
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
  <div class="header-settings">
    <BaseSettings 
      class="header-settings__icon" 
      @click.native="onClick" />
    <transition name="header-settings-fade">
      <div
        v-if="isVisible"
        class="header-settings__tip"
        @click="setIsMenuVisible(false)"
      >
        <BaseAngleBar 
          type="blue" 
          class="header-settings__angle-bar" />
        <nuxt-link 
          to="/account" 
          tag="div" 
          class="header-settings__item">
          MY HOLDERLAB
        </nuxt-link>
        <div 
          class="header-settings__item" 
          @click="setPopup('quit-popup')">
          EXIT
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.header-settings {
  $this: &;

  position: relative;
  height: em(20px);
  cursor: pointer;

  &:hover {
    #{$this}__icon {
      opacity: 1;
    }
  }

  &__icon {
    position: relative;
    fill: $white;
    opacity: 0.5;
    transition: opacity $speed;
    z-index: 1;
  }

  &__tip {
    position: absolute;
    width: em(262px);
    @include ifdesktop {
      top: em(51px);
      left: em(-180px);
    }
    @include ifmobile {
      top: em(35px);
      left: em(-202px);
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: em(100px);
      height: 100%;
      top: -100%;
      right: em(40px);
    }
  }

  &__angle-bar {
    top: em(-6px);
    bottom: auto;
    transform: scaleY(-1);
    @include ifdesktop {
      left: em(182px);
    }
    @include ifmobile {
      left: em(204px);
    }
  }

  &__item {
    $size: 12px;
    font-size: em($size);
    position: relative;
    padding: em(28px, $size) em(24px, $size);
    box-sizing: border-box;
    background: $blue;
    font-weight: bold;
    color: $white;
    cursor: pointer;
    transition: all $speed;

    &:hover {
      color: $yellow;
    }
  }
}

.header-settings-fade-enter-active,
.header-settings-fade-leave-active {
  transition-property: opacity, transform;
  transition-duration: $speed;
}
.header-settings-fade-enter,
.header-settings-fade-leave-to {
  opacity: 0;
  transform: translateY(-5%);
}
</style>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      isVisible: false
    };
  },
  computed: {
    ...mapState('page', ['popup'])
  },
  watch: {
    popup() {
      if (this.$el.classList.contains(this.popup)) {
        this.showPopup();
      }
      if (!this.popup) {
        this.hidePopup();
      }
    }
  },
  methods: {
    ...mapMutations('page', ['setPopup']),
    keyUp(e) {
      if (e.keyCode == 27) {
        this.hidePopup();
      }
    },
    showPopup() {
      document.addEventListener('keyup', this.keyUp);
      this.isVisible = true;
    },
    hidePopup() {
      document.removeEventListener('keyup', this.keyUp);
      this.setPopup(null);
      this.isVisible = false;
    }
  }
};
</script>

<template>
  <transition name="popup-fade">
    <div 
      v-show="isVisible" 
      class="base-popup">
      <div class="base-popup__container">
        <slot />
        <BaseClose
          :title="true"
          class="base-popup__close"
          @click.native="hidePopup"
        />
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.base-popup {
  width: 100%;
  z-index: 11;

  @include ifdesktop {
    /*position: fixed;*/
    top: 0;
    /*min-height: 100%;*/
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    z-index: 1000;
    overflow-y: scroll;
    height: 100%;
  }
  @include ifmobile {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    overflow: auto;
    z-index: 1000;
  }

  &__container {
    position: relative;
    box-sizing: border-box;
    background-color: $white;
    margin: 0 auto;

    @include ifdesktop {
      width: em(947px);
      padding: em(60px) em(130px) em(70px) em(97px);
    }
    @include ifmobile {
      padding-bottom: em(50px);
    }
  }

  &__headline {
    margin-bottom: em(15px);
    @include ifdesktop {
      padding-bottom: em(35px);
      border-bottom: 1px solid $grey;
    }
    @include ifmobile {
      padding-top: em(20px);
    }
  }

  &__close {
    position: absolute;
    @include ifdesktop {
      top: em(30px);
      right: em(24px);
    }
    @include ifmobile {
      top: em(10px);
      right: em(10px);
    }
  }
}

.popup-fade-enter-active,
.popup-fade-leave-active {
  transition-property: opacity, transform;
  transition-duration: $speed;
}
.popup-fade-enter,
.popup-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>

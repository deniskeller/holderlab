<script>
export default {
  data() {
    return {
      isVisible: true
    };
  }
};
</script>

<template>
  <transition name="hint-form-fade">
    <div 
      v-show="isVisible" 
      class="hint-form">
      <slot />
      <BaseClose 
        class="hint-form__close" 
        @click.native="isVisible = false" />
    </div>
  </transition>
</template>

<style lang="scss">
.hint-form {
  position: relative;
  background-color: $light-blue;
  padding: em(24px);
  overflow: hidden;

  &__close {
    position: absolute;
    right: (20px);
    top: em(22px);
  }
}

.hint-form-fade-enter-active,
.hint-form-fade-leave-active {
  transition-property: max-height;
  transition-duration: $speed;
  max-height: em(100px);
}
.hint-form-fade-enter,
.hint-form-fade-leave-to {
  max-height: 0;
}
</style>

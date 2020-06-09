<template>
  <div class="hamburger">
    <div class="hamburger__icon">
      <div class="hamburger__line hamburger__line_1" />
      <div class="hamburger__line hamburger__line_2" />
      <div class="hamburger__line hamburger__line_3" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hamburger {
  $this: &;

  @extend %center;
  cursor: pointer;

  &:hover {
    #{$this}__line {
      background: $yellow;
    }
  }

  @include ifparent('.is_active') {
    #{$this}__line_1 {
      transform: translateY(em(6px)) rotate(45deg);
    }
    #{$this}__line_2 {
      transform: scaleX(0);
    }
    #{$this}__line_3 {
      transform: translateY(em(-6px)) rotate(-45deg);
    }
    @include ifmobile {
      transform: translateX(em(4px));
    }
  }

  &__icon {
    position: relative;
    width: em(19px);
    height: em(14px);
  }

  &__line {
    position: absolute;
    width: 100%;
    height: 2px;
    left: 0;
    background: $white;
    transition-property: background, transform;
    transition-duration: $speed;

    &_1 {
      top: 0;
    }
    &_2 {
      top: 50%;
      margin-top: -1px;
    }
    &_3 {
      bottom: 0;
    }
  }
}
</style>

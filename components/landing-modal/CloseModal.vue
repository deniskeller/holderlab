<template>
  <nuxt-link 
    to="/landing/" 
    class="hamburger">
    <div class="hamburger__icon">
      <div class="hamburger__line hamburger__line_1" />
      <div class="hamburger__line hamburger__line_2" />
      <div class="hamburger__line hamburger__line_3" />
    </div>
  </nuxt-link>
</template>

<style lang="scss" scoped>
.hamburger {
  $this: &;

  @extend %center;
  cursor: pointer;
  #{$this}__line_1 {
    transform: translateY(em(9px)) rotate(45deg);
  }
  #{$this}__line_2 {
    transform: scaleX(0);
  }
  #{$this}__line_3 {
    transform: translateY(em(-11px)) rotate(-45deg);
  }
  @include ifmobile {
    transform: translateX(em(0px));
  }

  &:hover {
    #{$this}__line {
      background: $yellow;
    }
  }

  @include ifparent('.is_active') {
    #{$this}__line_1 {
      transform: translateY(em(9px)) rotate(45deg);
    }
    #{$this}__line_2 {
      transform: scaleX(0);
    }
    #{$this}__line_3 {
      transform: translateY(em(-11px)) rotate(-45deg);
    }
    @include ifmobile {
      transform: translateX(em(0px));
    }
  }

  &__icon {
    position: relative;
    width: em(23px);
    height: em(19px);
  }

  &__line {
    position: absolute;
    width: 100%;
    height: em(2px);
    left: 0;
    background: $white;
    transition-property: background, transform;
    transition-duration: $speed;

    &_1 {
      top: -0.05em;
    }
    &_2 {
      top: 50%;
      margin-top: -1px;
    }
    &_3 {
      bottom: -0.175em;
    }
  }
}
</style>

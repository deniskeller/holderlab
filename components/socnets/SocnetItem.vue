<script>
export default {
  props: {
    href: {
      type: String,
      default: '#'
    }
  }
};
</script>

<template>
  <a 
    :href="href" 
    target="_blank" 
    class="socnet">
    <slot />
  </a>
</template>

<style lang="scss">
.socnet {
  $this: &;
  @extend %center;
  position: relative;
  width: em(40px);
  height: em(40px);
  cursor: pointer;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 2px solid $white;
    box-sizing: border-box;
    border-radius: 100%;
    opacity: 0.5;
    transition: opacity $speed;
    z-index: 0;
  }

  &__icon {
    fill: $white;
    z-index: 1;

    &_10 {
      width: em(10px);
    }
    &_14 {
      width: em(14px);
    }
    &_20 {
      width: em(20px);
    }
  }

  &:hover {
    &::before {
      opacity: 1;
    }
  }

  &:active {
    &::before {
      background-color: $white;
    }
    #{$this}__icon {
      fill: $blue;
    }
  }
}
</style>

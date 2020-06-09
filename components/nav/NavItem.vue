<template>
  <div class="nav-item">
    <slot />
  </div>
</template>

<style lang="scss">
.nav-item {
  $size: 12px;
  font-size: em($size);
  position: relative;
  color: $grey;
  text-transform: uppercase;
  font-weight: bold;
  padding: em(4px, $size) em(34px, $size);
  box-sizing: border-box;
  height: em(67px, $size);
  line-height: em(67px, $size);
  cursor: pointer;
  transition: color $speed;

  &::after {
    content: '';
    display: none;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: em(4px, $size);
    background-color: $blue;
  }

  &:hover {
    color: $black;
  }

  @include ifparent('.nuxt-link-exact-active') {
    color: $black;
    &::after {
      display: block;
    }
  }
}
</style>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'blue'
    }
  }
};
</script>

<template>
  <svg
    :class="['base-angle-bar_' + type]"
    class="base-angle-bar"
    viewBox="0 0 14 7"
  >
    <path d="M7,7c0.5-3.2,3.4-5.8,7-6V0H0v1C3.6,1.2,6.5,3.8,7,7z" />
  </svg>
</template>

<style lang="scss">
.base-angle-bar {
  position: absolute;
  width: em(14px);
  height: em(7px);
  bottom: em(-6px);

  &_blue {
    fill: $blue;
  }

  &_light-blue {
    fill: $light-blue;
  }

  &_green {
    fill: $green;
  }

  &_red {
    fill: $red;
  }

  &_yellow {
    fill: $yellow;
  }
}
</style>

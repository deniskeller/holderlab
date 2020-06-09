<script>
export default {
  props: {
    type: {
      type: String,
      default: 'green'
    }
  }
};
</script>

<template>
  <div 
    :class="['base-percent-tip_' + type]" 
    class="base-percent-tip">
    <BaseAngleBar 
      :type="type" 
      class="base-percent-tip__angle-bar" />
    <div class="base-percent-tip__title">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.base-percent-tip {
  position: absolute;
  min-height: em(30px);
  padding: 0 em(8px);
  @extend %center;
  color: $white;
  text-transform: uppercase;
  border-radius: em(6px);

  &_green {
    background-color: $green;
  }

  &_red {
    background-color: $red;
  }

  &__angle-bar {
    left: 50%;
    transform: translateX(-50%);
  }

  &__title {
    $size: 14px;
    font-size: em($size);
    text-transform: uppercase;
  }
}
</style>

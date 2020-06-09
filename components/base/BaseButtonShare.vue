<script>
export default {
  props: {
    href: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'default'
    },
    isInactive: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<template>
  <a
    :href="href"
    :class="['base-button-share_' + type, { is_inactive: isInactive }]"
    target="_blank"
    tag="button"
    class="base-button-share"
  >
    <slot />
  </a>
</template>

<style lang="scss" scoped>
.base-button-share {
  font-size: em(16px);
  box-sizing: border-box;
  border: none;
  border-radius: em(5px);
  height: em(50px);
  outline: none;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: $white;
  background: none;
  padding: em(20px) em(20px);
  transition-property: color, background;
  transition-duration: $speed;

  &:hover {
    box-shadow: 0px 2px 10px rgba(0, 59, 249, 0.5);
  }
  @include ifdesktop {
    min-width: em(100px);
  }
}
</style>

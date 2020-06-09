<script>
export default {
  props: {
    single: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<template>
  <div 
    :class="{ 'base-container_single': single }" 
    class="base-container">
    <slot />
  </div>
</template>

<style lang="scss">
.base-container {
  @include ifdesktop {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: em(64px);
    box-sizing: border-box;
  }
  &_single {
    display: block;
  }
}
</style>

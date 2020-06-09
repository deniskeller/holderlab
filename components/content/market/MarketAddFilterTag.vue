<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isVisible: true
    };
  }
};
</script>

<template>
  <div 
    v-if="isVisible" 
    class="filter-tag">
    <BaseCoin 
      :title="title" 
      class="filter-tag__coin" />
    <div class="filter-tag__title">
      <slot />
    </div>
    <BaseClose 
      class="filter-tag__close" 
      @click.native="isVisible = false" />
  </div>
</template>

<style lang="scss" scoped>
.filter-tag {
  display: inline-block;
  background: $light-blue;
  padding: em(2px) 0 em(2px) em(8px);
  border-radius: em(4px);

  &__coin {
    display: inline-block;
    vertical-align: middle;
    width: em(16px);
    height: em(16px);
  }
  &__title {
    display: inline-block;
    $size: 10px;
    font-size: em($size);
  }
  &__close {
    display: inline-block;
    svg {
      width: em(10px);
      height: em(10px);
      fill: $grey;
    }
  }
}
</style>

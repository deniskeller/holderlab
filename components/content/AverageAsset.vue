<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    degree: {
      type: Number,
      default: 0
    },
    id_coin: {
      type: String,
      default: '0'
    }
  }
};
</script>

<template>
  <div class="average-assets-item">
    <BaseCurrency 
      :id_market="id_coin" 
      :title="title" 
      type="coins" />
    <div 
      class="average-assets-item__degree" 
      v-html="degree" />
  </div>
</template>

<style lang="scss">
.average-assets-item {
  padding: em(10px) em(22px);
  height: em(70px);
  border: 1px solid $grey;
  box-sizing: border-box;
  background-color: $white;
  margin-bottom: em(6px);
  @extend %bottom-shadow;

  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__degree {
    $size: 14px;
    font-size: em($size);
  }
}
</style>

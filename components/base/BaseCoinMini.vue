<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'coins'
    }
  }
};
</script>

<template>
  <div
    :style="{
      backgroundImage: `url(https://s2.coinmarketcap.com/static/img/coins/128x128/${title}.png)`
    }"
    class="base-coin"
  />
</template>

<style lang="scss" scoped>
.base-coin {
  $size: 15px;
  width: em($size);
  height: em($size);
  border-radius: 100%;
  background-color: $grey;
  @extend %background-cover;
}
</style>

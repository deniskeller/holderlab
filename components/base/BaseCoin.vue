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
  <span class="overflow">
    <div
      v-if="title !== '0' && type !== 'market'"
      :style="{
        backgroundImage: `url('https://s2.coinmarketcap.com/static/img/${type}/128x128/${title}.png')`
      }"
      class="base-coin"
    />

    <div
      v-if="title === '0' || type === 'market'"
      :style="{ backgroundImage: `url(/img/all.svg)` }"
      class="base-coin"
    />
  </span>
</template>

<style lang="scss">
.base-coin {
  width: em(21px);
  height: em(21px);
  border-radius: 100%;
  background-color: $grey;
  @extend %background-cover;
}
</style>

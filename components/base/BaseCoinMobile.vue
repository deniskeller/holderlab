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
        backgroundImage: `url('/img/currency/${title}.png')`
      }"
      class="base-coin-mobile"
    />

    <div
      v-if="title === '0' || type === 'market'"
      :style="{ backgroundImage: `url(/img/all.svg)` }"
      class="base-coin-mobile"
    />
  </span>
</template>

<style lang="scss">
.base-coin-mobile {
  width: em(21px);
  height: em(21px);
  border-radius: 100%;
  background-color: $grey;
  @extend %background-cover;
  @include ifmobile {
    width: em(12px);
    height: em(12px);
  }
}
</style>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },

    type: {
      type: String,
      default: 'exchanges'
    },

    id_market: {
      type: String,
      default: null
    }
  }
};
</script>

<template>
  <div class="base-currency">
    <BaseCoin 
      :title="id_market" 
      :type="type" 
      class="base-currency__coin" />
    <div 
      class="base-currency__title" 
      v-html="title" />
  </div>
</template>

<style lang="scss" scoped>
.base-currency {
  display: flex;
  align-items: center;
  &__coin {
    margin-right: em(14px);
  }
  &__title {
    $size: 16px;
    font-size: em($size);
    @include ifmobile {
      display: none;
    }
  }
}
</style>

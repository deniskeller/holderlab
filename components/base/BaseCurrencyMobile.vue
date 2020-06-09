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
  },
  computed: {
    all_in_one() {
      if (this.type == 'exchanges' && this.title == 'all') {
        return 'All in one';
      } else {
        return this.title;
      }
    }
  },
  mounted() {},
  methods: {}
};
</script>

<template>
  <div class="base-currency-mobile">
    <BaseCoinMobile
      :title="title"
      :type="type"
      class="base-currency-mobile__coin"
    />
    <div 
      class="base-currency-mobile__title" 
      v-html="all_in_one" />
  </div>
</template>

<style lang="scss" scoped>
.base-currency-mobile {
  display: flex;
  align-items: center;
  &__coin {
    margin-right: em(14px);
    @include ifmobile {
      margin-right: em(5px);
    }
  }
  &__title {
    $size: 16px;
    font-size: em($size);
    @include ifmobile {
      font-size: em(10px);
    }
  }
}
</style>

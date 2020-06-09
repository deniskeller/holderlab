<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  computed: {
    tipType() {
      return this.percent === 100 ? 'green' : 'red';
    }
  },
  mounted() {},
  methods: {}
};
</script>

<template>
  <div class="base-rebalance-allocated-header">
    <div class="base-rebalance-allocated-header__title">
      {{ title }}
    </div>
    <BasePercentTip
      :type="tipType"
      class="base-rebalance-allocated-header__percent-tip"
    >
      {{ percent }}%
    </BasePercentTip>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.base-rebalance-allocated-header {
  position: relative;
  margin-bottom: em(15px);

  @include ifmobile {
    padding: 0 em(15px);
  }

  &__title {
    $size: 14px;
    font-size: em($size);
  }

  &__percent-tip {
    position: absolute;
    top: 0;
    @include ifdesktop {
      right: em(30px);
    }
    @include ifmobile {
      right: em(20px);
    }
  }
}
</style>

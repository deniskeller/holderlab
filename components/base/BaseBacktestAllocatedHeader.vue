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
  <div class="base-allocated-header">
    <div class="base-allocated-header__title">
      {{ title }}
    </div>
    <BasePercentTip 
      :type="tipType" 
      class="base-allocated-header__percent-tip">
      {{ percent }}%
    </BasePercentTip>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.base-allocated-header {
  position: relative;
  margin-bottom: em(15px);

  @include ifmobile {
    padding: 0 em(15px);
  }

  &__title {
    $size: 14px;
    font-size: em($size);
    @include ifmobile {
      display: none;
    }
  }

  &__percent-tip {
    position: absolute;
    top: 0;
    width: em(32px);
    padding: 0 em(15px);
    @include ifdesktop {
      right: em(72px);
    }
    @include ifmobile {
      top: em(-40px);
      right: 43%;
    }
  }
}
</style>

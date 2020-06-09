<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    }
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<template>
  <div class="base-headline">
    <BaseTitle 
      v-if="title" 
      class="base-headline__title">{{ title }}</BaseTitle>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.base-headline {
  @include ifdesktop {
    text-align: center;
    margin-bottom: em(40px);
  }
  @include ifmobile {
    position: relative;
    padding: 0 em(15px);
    background: $purple;

    color: $white;
    padding-bottom: em(20px);
    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: em(500px);
      top: em(-500px);
      left: 0;
      background-color: $purple;
    }
  }
  &__title {
    @include ifmobile {
      padding: 0 1em;
    }
  }
}
</style>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    title_orange: {
      type: String,
      default: null
    },
    subtitle: {
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
  <div class="landing-headline">
    <BaseLandingSubtitle 
      v-if="subtitle" 
      class="landing-headline__subtitle">{{
        subtitle
      }}</BaseLandingSubtitle>
    <BaseLandingTitle 
      v-if="title" 
      class="landing-headline__title">{{
        title
      }}</BaseLandingTitle>
    <BaseLandingTitle
      v-if="title_orange"
      class="landing-headline__title-orange"
    >{{ title_orange }}</BaseLandingTitle
    >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.landing-headline {
  @include ifdesktop {
    margin-bottom: em(120px);
    color: $white;
  }
  @include ifmobile {
    position: relative;
    text-align: center;
    color: $white;
    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: em(500px);
      top: em(-500px);
      left: 0;
    }
  }
  &__title {
    text-transform: uppercase;
  }
  &__title-orange {
    color: $light-orange;
    text-transform: uppercase;
  }
  &__subtitle {
    @include ifmobile {
      font-size: em(10px);
    }
  }
}
</style>

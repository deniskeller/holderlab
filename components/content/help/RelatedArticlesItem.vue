<script>
export default {
  props: {
    link: {
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
  <nuxt-link 
    :to="link" 
    class="related-articles-item">
    <div class="related-articles-item__title">
      <slot />
    </div>
    <svg 
      viewBox="0 0 18 6" 
      class="related-articles-item__icon">
      <path
        d="M7.59375 1.59375C8 1.1875 8.46875 0.984375 9 0.984375C9.53125 0.984375 10 1.1875 10.4062 1.59375C10.8125 2 11.0156 2.46875 11.0156 3C11.0156 3.53125 10.8125 4 10.4062 4.40625C10 4.8125 9.53125 5.01562 9 5.01562C8.46875 5.01562 8 4.8125 7.59375 4.40625C7.1875 4 6.98438 3.53125 6.98438 3C6.98438 2.46875 7.1875 2 7.59375 1.59375ZM13.5938 1.59375C14 1.1875 14.4688 0.984375 15 0.984375C15.5312 0.984375 16 1.1875 16.4062 1.59375C16.8125 2 17.0156 2.46875 17.0156 3C17.0156 3.53125 16.8125 4 16.4062 4.40625C16 4.8125 15.5312 5.01562 15 5.01562C14.4688 5.01562 14 4.8125 13.5938 4.40625C13.1875 4 12.9844 3.53125 12.9844 3C12.9844 2.46875 13.1875 2 13.5938 1.59375ZM1.59375 1.59375C2 1.1875 2.46875 0.984375 3 0.984375C3.53125 0.984375 4 1.1875 4.40625 1.59375C4.8125 2 5.01562 2.46875 5.01562 3C5.01562 3.53125 4.8125 4 4.40625 4.40625C4 4.8125 3.53125 5.01562 3 5.01562C2.46875 5.01562 2 4.8125 1.59375 4.40625C1.1875 4 0.984375 3.53125 0.984375 3C0.984375 2.46875 1.1875 2 1.59375 1.59375Z"
      />
    </svg>
  </nuxt-link>
</template>

<style lang="scss">
.related-articles-item {
  $this: &;

  position: relative;
  display: block;
  background-color: $light-blue;
  margin-bottom: em(6px);
  color: $black;
  transition-property: background-color, color;
  transition-duration: $speed;

  @include ifdesktop {
    padding: em(24px) em(96px) em(24px) em(24px);
  }
  @include ifmobile {
    padding: em(15px) em(60px) em(15px) em(15px);
  }

  &:hover {
    background-color: $blue;
    color: $white;

    #{$this}__icon {
      fill: $white;
    }
  }

  &:active {
    background-color: darken($blue, 10%);
  }

  &__icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: em(24px);
    width: em(18px);
    height: em(6px);
    fill: $blue;
    transition: fill $speed;
  }
}
</style>

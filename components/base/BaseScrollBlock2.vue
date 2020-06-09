<script>
import baron from 'baron';

export default {
  data() {
    return {};
  },
  computed: {},
  mounted() {
    baron({
      root: '.base-scroll-block-2',
      scroller: '.base-scroll-block__scroller-2',
      bar: '.base-scroll-block__bar-2'
    });
  },
  methods: {}
};
</script>

<template>
  <div class="base-scroll-block-2">
    <div class="base-scroll-block__scroller-2">
      <slot />
    </div>
    <div class="base-scroll-block__track">
      <div class="base-scroll-block__bar-2">
        <svg 
          class="base-scroll-block__bar-icon" 
          viewBox="0 0 4 10">
          <path d="M0 1H4M0 4.7651H4M0 8.5302H4" />
          <path d="M0 1H4M0 4.7651H4M0 8.5302H4" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-scroll-block-2 {
  /*margin-right: em(-20px);*/
}
.base-scroll-block {
  &__scroller-2 {
    padding-right: em(20px);
    @include ifmobile {
      padding-right: 0;
    }
  }
}
</style>

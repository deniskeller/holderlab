<script>
import baron from 'baron';

export default {
  data() {
    return {};
  },
  computed: {},
  mounted() {
    baron({
      root: '.base-scroll-block-5',
      scroller: '.base-scroll-block__scroller-5',
      bar: '.base-scroll-block__bar-5'
    });
  },
  methods: {}
};
</script>

<template>
  <div class="base-scroll-block-5">
    <div class="base-scroll-block__scroller-5">
      <slot />
    </div>
    <div class="base-scroll-block__track-5">
      <div class="base-scroll-block__bar-5">
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
.base-scroll-block-5 {
  position: relative;
  overflow: hidden;

  &__scroller-5 {
    overflow-y: scroll;
    -ms-overflow-style: none;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    height: 100%;

    @include ifdesktop {
      padding-right: em(60px);
    }
    @include ifmobile {
      padding-right: 0;
    }

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
  .base-scroll-block__track-5 {
    display: none;
    position: absolute;
    top: 1em;
    right: 1.75em;
    bottom: 1.275em;
    width: em(6px);
    background: $grey;
    border-radius: em(3px);
  }
  &._scrollbar &__track {
    display: block;
  }
  &__free {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
  }

  &__bar-5 {
    display: none;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: em(-2px);
    width: em(8px);
    border: 1px solid $grey;
    border-radius: em(4px);
    background-color: $white;
    box-shadow: 0 em(2px) em(5px) $grey;
  }
  &._scrollbar &__bar-5 {
    display: flex;
  }

  &__bar-icon {
    width: em(5px);
    height: em(10px);
    stroke: $grey;
  }
}
</style>

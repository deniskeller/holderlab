<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    link: {
      type: String,
      default: null
    }
  },
  methods: {
    ...mapMutations('page', ['setIsMenuVisible'])
  }
};
</script>

<template>
  <nuxt-link
    :to="link"
    class="landing-tab-item"
    @click.native="setIsMenuVisible(false)"
  >
    <div 
      :title="title" 
      class="landing-tab-item__tip" />
    <div class="landing-tab-item__title">
      {{ title }}
    </div>
  </nuxt-link>
</template>

<style lang="scss" scoped>
.landing-tab-item {
  $this: &;

  position: relative;
  @extend %center;
  background: $white;
  width: 100%;
  height: em($tab-width);
  box-sizing: border-box;
  border-bottom: 1px solid $grey;
  cursor: pointer;

  @include ifparent('.account') {
    /*background: rgba(255, 255, 255, 0.2);*/
    border-color: rgba(0, 0, 0, 0.1);
    transition: background $speed;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: em(12px);
    bottom: em(-12px);
    left: 0;
    background: linear-gradient(to bottom, $grey, $white);
    opacity: 0;
    pointer-events: none;
    transition: height 0.2s;
    @include ifparent('.account') {
      display: none;
    }
  }

  &__icon {
    width: em(18px);
    height: em(18px);
    fill: $grey;
    transition: fill $speed;
    z-index: 3;

    @include ifparent('.is_active') {
      fill: $white;
    }

    &_w20 {
      width: em(20px);
    }

    &_h20 {
      height: em(20px);
    }

    &_h22 {
      height: em(22px);
    }
    &_h30 {
      height: em(30px);
    }
    &_h12 {
      height: em(12px);
    }
  }

  &__tip {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;
  }

  &__title {
    position: absolute;
    white-space: nowrap;
    color: $white;
    font-weight: bold;
    top: 0;
    left: 0;
    height: em($tab-width);
    line-height: em($tab-width);
    padding-left: 1.7875em;
    z-index: 4;
    visibility: hidden;
    transition: visibility $speed, color $speed;

    @include ifparent('.is_active') {
      visibility: visible;
    }
    @include ifparent('.nuxt-link-active') {
      color: $yellow;
    }
  }

  &:hover {
    #{$this}__icon {
      fill: $black;
      @include ifparent('.is_active') {
        fill: $yellow;
      }
    }
    #{$this}__title {
      color: $yellow;
    }
    @include ifparent('.account') {
      background: $white;
    }
  }

  &.nuxt-link-active {
    border-bottom-color: transparent;
    &::after {
      opacity: 0.6;
      z-index: 1;
    }
    .tab-item__icon {
      fill: $blue;
      @include ifparent('.is_active') {
        fill: $white;
      }
    }
  }
}
</style>

<script>
import HelpHelpful from '~/components/content/help/HelpHelpful';
export default {
  components: {
    HelpHelpful
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },
    link: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isActive: false
    };
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<template>
  <div 
    :class="{ is_active: isActive }" 
    class="help-item">
    <svg 
      class="help-item__arrow" 
      viewBox="0 0 12 9">
      <path
        d="M1.40625 0.828125L6 5.42188L10.5938 0.828125L12 2.23438L6 8.23438L0 2.23438L1.40625 0.828125Z"
      />
    </svg>

    <div
      class="help-item__title"
      @click="isActive = !isActive"
      v-html="title"
    />

    <transition name="help-reply-fade">
      <div 
        v-show="isActive" 
        class="help-item__reply">
        <svg 
          class="help-item__quote" 
          viewBox="0 0 14 12">
          <path
            d="M9.01562 11.0156L10.9844 6.98438H7.98438V0.984375H13.9844V6.98438L12.0156 11.0156H9.01562ZM1 11.0156L3.01562 6.98438H0.015625V0.984375H6.01562V6.98438L4 11.0156H1Z"
          />
        </svg>
        <div 
          class="help-item__reply-text" 
          v-html="text" />
        <br >
        <a 
          v-if="link" 
          :href="link">Read more</a>

        <HelpHelpful 
          :id = "id"
          class="help-item__helpful" />
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
.help-item {
  $this: &;
  position: relative;
  box-sizing: border-box;
  background-color: $light-blue;
  border: 1px solid transparent;
  transition-property: background-color, border-color;
  transition-duration: $speed;
  margin-bottom: em(6px);

  &.is_active {
    background-color: $white;
    border-color: $grey;
    @extend %bottom-shadow;

    #{$this}__arrow {
      transform: scaleY(-1);
      fill: $grey;
    }
  }

  &:hover {
    border-color: $grey;
  }

  &__title {
    padding: em(24px) em(96px) em(24px) em(24px);
    cursor: pointer;
  }

  &__arrow {
    position: absolute;
    top: em(36px);
    right: em(24px);
    width: em(12px);
    height: em(9px);
    fill: $blue;
    pointer-events: none;
    transition: all $speed;
  }

  &__reply {
    position: relative;
    padding: 0 em(96px) em(24px) em(64px);
  }

  &__quote {
    position: absolute;
    top: em(10px);
    left: em(24px);
    width: em(14px);
    height: em(12px);
    fill: $grey;
  }

  &__helpful {
    border-top: 1px solid $grey;
    padding-top: em(24px);
    margin-top: em(24px);
    @include ifmobile {
      display: none;
    }
  }
}

.help-reply-fade-enter-active,
.help-reply-fade-leave-active {
  transition-property: max-height;
  transition-duration: $speed;
  transition-timing-function: ease-in;
  overflow: hidden;
  max-height: 10em;
}
.help-reply-fade-enter,
.help-reply-fade-leave-to {
  max-height: 0;
}
</style>

<script>
import QuestionIcon from '~/components/icons/QuestionIcon';
import EmailIcon from '~/components/icons/EmailIcon';
export default {
  components: {
    QuestionIcon,
    EmailIcon
  },
  props: {
    href: {
      type: String,
      default: ''
    },
    test: {
      type: Boolean,
      default: null
    },
    icon: {
      type: String,
      default: ''
    }
  }
};
</script>

<template>
  <a
    :href="href"
    :class="{ is_test: test }"
    target="_blank"
    class="base-help-banner"
  >
    <QuestionIcon
      v-if="icon === 'question' && !test"
      class="base-help-banner__icon"
    />
    <EmailIcon
      v-if="icon === 'email' && !test"
      class="base-help-banner__icon"
    />
    <div class="base-help-banner__title">
      <slot />
    </div>
  </a>
</template>

<style lang="scss">
.base-help-banner {
  $this: &;

  display: block;
  position: relative;
  min-height: em(140px);
  box-sizing: border-box;
  background-color: #c5dbf2;
  @extend %background-cover;
  text-decoration: none;

  @include ifmobile {
    display: none;
  }

  &:hover {
    #{$this}__icon {
      fill: $blue;
    }
  }

  &:active {
    opacity: 0.9;
  }

  &__title {
    $size: 14px;
    font-size: em($size);
    padding: em(30px, $size) em(50px, $size) em(30px, $size) em(30px, $size);
    font-weight: bold;
    text-transform: uppercase;
    color: $white;
  }

  &__icon {
    position: absolute;
    top: em(30px);
    right: em(20px);
    width: em(20px);
    height: em(20px);
    fill: $white;
    transition: fill 1s;
  }

  &.is_test {
    height: em(200px);
  }
}
</style>

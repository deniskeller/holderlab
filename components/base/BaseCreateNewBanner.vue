<script>
import QuestionIcon from '~/components/icons/QuestionIcon';
import EmailIcon from '~/components/icons/EmailIcon';
import LampIcon from '~/components/icons/LampIcon';
export default {
  components: {
    QuestionIcon,
    EmailIcon,
    LampIcon
  },
  props: {
    to: {
      type: String,
      default: ''
    },
    test: {
      type: Boolean,
      default: null
    },
    icon: {
      type: String,
      default: 'question'
    }
  }
};
</script>

<template>
  <nuxt-link 
    :to="to" 
    :class="{ is_test: test }" 
    class="base-help-banner">
    <QuestionIcon
      v-if="icon === 'question' && !test"
      class="base-help-banner__icon"
    />
    <EmailIcon
      v-if="icon === 'email' && !test"
      class="base-help-banner__icon"
    />
    <LampIcon
      v-if="icon === 'lamp' && !test"
      class="base-help-banner__icon-lamp"
    />
    <div class="base-help-banner__title">
      <slot />
    </div>
  </nuxt-link>
</template>

<style lang="scss" scoped>
.base-help-banner {
  $this: &;
  display: block;
  position: relative;
  max-width: em(247px);
  width: 100%;
  height: em(129px);
  margin-bottom: em(30px);
  box-sizing: border-box;
  background-color: #c5dbf2;
  @extend %background-cover;
  background-position: right;
  text-decoration: none;

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
    top: em(40px);
    right: em(80px);
    width: em(20px);
    height: em(20px);
    fill: $white;
    transition: fill 1s;
  }

  &__icon-lamp {
    display: none;
    position: absolute;
    top: 4.825em;
    right: 5.32em;
    width: 0.7em;
    height: 0.45em;
    border-radius: 50%;
    fill: none;
    transition: fill 1s;

    @include ifmobile {
      right: 5.3em;
    }
  }
  &:hover {
    #{$this}__icon {
      fill: $blue;
    }
    .base-help-banner__icon-lamp {
      display: block;
    }
  }

  &:active {
    opacity: 0.9;
  }

  &.is_test {
    height: em(200px);
  }
}
</style>

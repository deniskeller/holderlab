<script>
export default {
  props: {
    to: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'secondary'
    },
    isInactive: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<template>
  <nuxt-link
    :to="to"
    :class="['base-button_' + type, { is_inactive: isInactive }]"
    tag="button"
    class="base-button"
  >
    <slot />
  </nuxt-link>
</template>

<style lang="scss">
.base-button {
  $size: 12px;
  font-size: em($size);
  text-transform: uppercase;
  box-sizing: border-box;
  border: none;
  border-radius: em(50px, $size);
  height: em(47px, $size);
  outline: none;
  font-weight: bold;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0 em(24px, $size);

  @include ifdesktop {
    min-width: em(100px, $size);
  }

  &.is_inactive {
    color: $grey;
    cursor: default;
    pointer-events: none;
  }

  &_primary,
  &_orange {
    position: relative;
    background-size: 101%;
    color: $white;
    box-shadow: 0 em(2px) em(16px) rgba(15, 103, 240, 0.5);
    transition: box-shadow $speed;

    &.is_inactive {
      background: #f1f7ff;
      box-shadow: none;
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: $white;
      opacity: 0;
      border-radius: em(50px);
      transition: opacity $speed;
    }

    &:hover {
      &::after {
        opacity: 0.1;
      }
      box-shadow: 0 em(4px) em(18px) rgba(15, 103, 240, 1);
    }
    &:active {
      background: darken($blue, 10%);
      box-shadow: none;
    }
  }

  &_primary {
    @extend %blue-gradient;
    &:active {
      background: darken($blue, 10%);
    }
  }

  &_orange {
    @extend %orange-gradient;
    &:active {
      background: darken($orange, 10%);
    }
  }

  &_secondary {
    color: $blue;
    border: 2px solid $blue;
    background: none;
    padding: em(12px, $size) em(22px, $size);

    transition-property: color, background;
    transition-duration: $speed;

    &.is_inactive {
      border-color: $grey;
    }

    &:hover {
      color: $white;
      background: $blue;
    }

    &:active {
      background: darken($blue, 10%);
    }
  }

  &_default {
    color: $white;
    border: 2px solid $white;
    background: none;
    padding: em(12px, $size) em(22px, $size);

    transition-property: color, background;
    transition-duration: $speed;

    &.is_inactive {
      border-color: $grey;
    }

    &:hover {
      color: $blue;
      background: $white;
    }

    &:active {
      background: darken($white, 10%);
      border: darken($white, 10%);
    }
  }

  &_white {
    background-color: $white;
    color: $blue;
    box-shadow: 0 em(2px) em(16px) rgba(255, 255, 255, 0.5);
    transition: box-shadow $speed;

    &:hover {
      box-shadow: 0 em(3px) em(20px) rgba(255, 255, 255, 1);
    }

    &:active {
      background-color: $light-blue;
      box-shadow: none;
    }
  }

  &_translucent {
    background: linear-gradient(90deg, #f1f7ff 0%, #0395ff 100%);
    color: $white;
    box-shadow: 0px 2px 10px rgba(15, 103, 240, 0.5);
    transition: box-shadow $speed;

    &.is_inactive {
      background: #f1f7ff;
      box-shadow: none;
    }

    &:hover {
      box-shadow: 0 em(4px) em(18px) rgba(15, 103, 240, 1);
    }
    &:active {
      background: darken(#0395ff, 10%);
    }
  }
}
</style>

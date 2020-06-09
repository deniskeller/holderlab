<script>
/**/
export default {
  props: {
    name: {
      type: String,
      default: null
    },
    is_active: {
      type: Boolean,
      default: false
    },
    isError: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: this.is_active,
      error: this.isError
    };
  },
  computed: {
    value() {
      return this.active ? 1 : 0;
    }
  },
  watch: {
    active() {
      this.sendEvent();
    }
  },
  mounted() {},
  methods: {
    onClick() {
      this.active = !this.active;
    },
    sendEvent() {
      this.$emit('input', this.active);
    },
    onError() {
      this.error = false;

      setTimeout(() => {
        this.error = true;
      }, 30);
    }
  }
};
</script>

<template>
  <div
    :class="{ is_active: is_active, is_error: isError }"
    class="base-checkbox"
    @click.stop="onClick"
  >
    <input
      ref="input"
      :value="value"
      :name="name"
      type="text"
      class="base-checkbox__input"
    >
    <div class="base-checkbox__check">
      <svg 
        class="base-checkbox__tick" 
        viewBox="0 0 13 12">
        <path d="M1 6L5 9.5L11 1" />
      </svg>
    </div>
    <div class="base-checkbox__title">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.base-checkbox {
  text-align: left;
  position: relative;
  user-select: none;
  padding-left: em(35px);
  cursor: pointer;
  display: inline-block;
  a {
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
  &__title {
    a {
      text-decoration: underline;
      &:hover {
        text-decoration: none;
      }
    }
  }
  &__input {
    position: absolute;
    visibility: hidden;
    font-size: 0;
    width: 0;
    height: 0;
    padding: 0;
    border: 0;
    outline: 0;
  }
  &.is_error {
    color: $red;
    .checkbox__title {
      color: $red;
      a {
        color: $red;
      }
    }
  }
  &__check {
    position: absolute;
    left: 0;
    top: em(2px);
    border: 2px solid $blue;
    box-sizing: border-box;
    border-radius: em(3px);
    width: em(20px);
    height: em(20px);
    background: $white;
    @include ifparent('.base-checkbox.is_active') {
      background: $blue;
    }
    @include ifparent('.base-checkbox.is_active-add') {
      background: $grey;
      border: 2px solid $grey;
    }
    @include ifparent('.base-checkbox.is_error') {
      background: $red;
    }
  }
  &__tick {
    stroke: $white;
    stroke-width: 3;
    fill: none;
    width: em(13px);
    height: em(12px);
    position: absolute;
    top: em(2px);
    left: em(2px);
    visibility: hidden;
    transform: scale(1.5);
    @include ifparent('.base-checkbox.is_active') {
      visibility: visible;
      transform: scale(1);
      transition: transform $speed;
    }
  }
}
</style>

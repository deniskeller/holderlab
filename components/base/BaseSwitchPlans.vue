<script>
export default {
  data() {
    return {
      // active: 1,
      active: this.isActive
    };
  },
  computed: {
    value() {
      return this.active ? 1 : 0;
    }
  },
  methods: {
    onClick() {
      this.active = !this.active;
      this.sendEvent();
    },
    sendEvent() {
      this.$emit('input', this.active);
    }
  }
};
</script>

<template>
  <div
    :class="{ is_active: active }"
    class="base-checkbox-slider"
    @mousedown.prevent="onClick"
    @touchstart.prevent="onClick"
  >
    <div class="base-checkbox-slider__check">
      <div
        :class="{ is_active: active }"
        class="base-checkbox-slider__slider"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-checkbox-slider {
  position: relative;
  display: inline-block;
  user-select: none;
  width: em(50px);
  height: em(26px);
  background: #924dae;
  border-radius: em(14px);
  transition: background $speed;
  cursor: pointer;

  &.is_active {
    background: #f7931a;
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

  &__slider {
    position: absolute;
    width: em(24px);
    height: em(24px);
    background-color: $white;
    border-radius: 100%;
    margin: 1px;
    box-shadow: 0 em(2px) em(1px) rgba(0, 0, 0, 0.1);
    transition: transform $speed;
    &.is_active {
      transform: translateX(100%);
    }
  }
}
</style>

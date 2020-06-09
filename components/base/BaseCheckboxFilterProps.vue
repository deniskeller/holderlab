<script>
export default {
  props: {
    name: {
      type: String,
      default: null
    },
    is_active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: this.is_active
    };
  },
  computed: {},
  watch: {
    is_active() {
      this.updateActive();
    }
  },
  mounted() {},
  methods: {
    updateActive() {
      this.active = this.is_active;
    },
    onClick() {
      this.$emit('input', this.is_active);
      this.sendEvent();
    },
    sendEvent() {
      this.$emit('change', { name: this.name, is_active: this.is_active });
    }
  }
};
</script>

<template>
  <div
    :class="{ is_active: active }"
    class="base-checkbox-filter"
    @mousedown.prevent="onClick"
    @touchstart.prevent="onClick"
  >
    <input
      ref="input"
      :value="is_active"
      :name="name"
      type="text"
      class="base-checkbox-filter__input"
    >
    <div class="base-checkbox-filter__check">
      <div
        :class="{ is_active: active }"
        class="base-checkbox-filter__slider"
      />
    </div>
  </div>
</template>

<style lang="scss">
.base-checkbox-filter {
  position: relative;
  display: inline-block;
  user-select: none;
  width: em(50px);
  height: em(26px);
  background: $grey;
  border-radius: em(14px);
  transition: background $speed;
  cursor: pointer;

  &.is_active {
    background: $green;
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

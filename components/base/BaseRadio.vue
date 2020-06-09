<script>
export default {
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<template>
  <div 
    :class="{ is_checked: isChecked }" 
    class="base-radio" />
</template>

<style lang="scss">
.base-radio {
  position: relative;
  width: em(20px);
  height: em(20px);
  border: 2px solid $grey;
  border-radius: 100%;
  box-sizing: border-box;
  transition: border-color $speed;
  @extend %center;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 2px;
    right: 2px;
    bottom: 2px;
    left: 2px;
    border-radius: 100%;
    background-color: $blue;
    visibility: hidden;
    transform: scale(0);
    transition: transform $speed;
  }

  &.is_checked {
    border-color: $blue;
    &::after {
      visibility: visible;
      transform: scale(1);
    }
  }
}
</style>

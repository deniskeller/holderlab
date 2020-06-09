<script>
export default {
  props: {
    items: {
      type: Array,
      default: null
    },
    index: {
      type: String,
      default: null
    },
    active: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      activeItem: this.active
    };
  },
  computed: {},
  mounted() {
    this.changeItem(this.active);
  },
  methods: {
    changeItem(index) {
      this.activeItem = index;
      this.$emit('input', String(index));
    }
  }
};
</script>

<template>
  <div class="base-switch">
    <div
      v-for="(item, index) in items"
      :class="{ is_active: activeItem === index }"
      :key="index"
      class="base-switch__item"
      @click="changeItem(index)"
      v-html="item"
    />
  </div>
</template>

<style lang="scss">
.base-switch {
  display: flex;
  &__item {
    $size: 12px;
    font-size: em($size);
    display: inline-block;
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
    padding: em(6px, $size) em(18px, $size);
    box-sizing: border-box;
    margin-right: em(6px, $size);
    border-radius: em(20px, $size);
    color: $blue;
    box-shadow: 0 2px 1px $grey;
    user-select: none;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &.is_active {
      color: $white;
      background-color: $blue;
      box-shadow: none;
    }
    &:hover {
      box-shadow: 0 em(2px) em(16px) rgba(15, 103, 240, 0.5);
      transition: box-shadow $speed;
    }
  }
}
</style>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: null
    },
    active: {
      type: Number,
      default: null
    },
    first_name: {
      type: String,
      default: ''
    },
    second_name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    btnText: function() {
      if (this.show) {
        return this.first_name;
      }
      return this.second_name;
    }
  },
  mounted() {},
  methods: {}
};
</script>

<template>
  <div class="base-switch">
    <button
      :class="{ 'base-switch__item--active': show }"
      class="base-switch__item"
      @click.stop="show = !show"
    >
      {{ btnText }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.base-switch {
  display: flex;
  &__item {
    display: inline-block;
    width: 100%;
    max-width: em(130px);
    $size: 12px;
    font-size: em($size);
    line-height: em(24px);
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
    text-transform: uppercase;
    padding: em(6px, $size) em(12px, $size);
    box-sizing: border-box;
    margin-right: em(6px, $size);
    border-radius: em(20px, $size);
    color: $white;
    background: $blue;
    box-shadow: 0 2px 1px $grey;
    user-select: none;
    cursor: pointer;
    border: none;
    outline: none;
    &--active {
      background: $white;
      color: $blue;
    }

    &:last-child {
      margin-right: 0;
    }

    &.is_active {
      color: $white;
      background-color: $blue;
      box-shadow: none;
    }
  }
}
</style>

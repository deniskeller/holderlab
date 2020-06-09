<script>
export default {
  props: {
    title: {
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
  <div class="base-close">
    <span 
      v-if="title" 
      class="base-close__title">
      CLOSE
    </span>
    <svg 
      class="base-close__icon" 
      viewBox="0 0 10 10">
      <path
        d="M9.65625 1.28125L5.9375 5L9.65625 8.71875L8.71875 9.65625L5 5.9375L1.28125 9.65625L0.34375 8.71875L4.0625 5L0.34375 1.28125L1.28125 0.34375L5 4.0625L8.71875 0.34375L9.65625 1.28125Z"
      />
    </svg>
  </div>
</template>

<style lang="scss">
.base-close {
  $this: &;
  cursor: pointer;
  user-select: none;

  &__icon {
    padding: em(4px) em(6px) em(6px) em(6px);
    vertical-align: middle;
    width: em(11px);
    height: em(11px);
    fill: $blue;
    @include ifdesktop {
    }
    /*@include ifmobile {*/
    /*  width: em(22px);*/
    /*  height: em(22px);*/
    /*  fill: $white;*/
    /*}*/
  }

  &__title {
    $size: 12px;
    font-size: em($size);
    color: $blue;
    font-weight: bold;
    vertical-align: middle;
    /*@include ifmobile {*/
    /*  display: none;*/
    /*}*/
  }

  &:hover {
    #{$this}__title {
      color: $red;
    }
    #{$this}__icon {
      fill: $red;
    }
  }
  &:active {
    #{$this}__title {
      color: $black;
    }
    #{$this}__icon {
      fill: $black;
    }
  }
}
</style>

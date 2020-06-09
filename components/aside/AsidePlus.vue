<script>
export default {
  methods: {
    openCustomize() {
      this.$emit('open-customize');
    }
  }
};
</script>

<template>
  <div class="aside-plus">
    <div class="aside-plus__icon">
      <svg 
        viewBox="0 0 10 10" 
        class="aside-plus__icon-svg">
        <path
          d="M9.65625 5.65625H5.65625V9.65625H4.34375V5.65625H0.34375V4.34375H4.34375V0.34375H5.65625V4.34375H9.65625V5.65625Z"
        />
      </svg>
    </div>
    <div class="aside-plus__text">
      You can add your own selected assets and change they weight
    </div>
    <a
      href="#"
      class="aside-plus__link aside-plus-link"
      @click.prevent="openCustomize"
    >
      <div class="aside-plus-link__title">
        CUSTOM YOUR WEIGHT
      </div>
      <svg 
        viewBox="0 0 12 12" 
        class="aside-plus-link__icon">
        <path
          d="M8 4V0H9.34375V1.34375H12V2.65625H9.34375V4H8ZM12 6.65625H5.34375V5.34375H12V6.65625ZM2.65625 4H4V8H2.65625V6.65625H0V5.34375H2.65625V4ZM6.65625 12H5.34375V8H6.65625V9.34375H12V10.6562H6.65625V12ZM0 1.34375H6.65625V2.65625H0V1.34375ZM0 9.34375H4V10.6562H0V9.34375Z"
        />
      </svg>
    </a>
  </div>
</template>

<style lang="scss">
.aside-plus {
  position: relative;
  padding: em(25px);
  border: 1px solid $grey;
  @extend %bottom-shadow;

  &__icon {
    position: absolute;
    left: 50%;
    top: em(-4px);
    transform: translate(-50%, -50%);
    width: em(24px);
    height: em(24px);
    border-radius: 100%;
    @extend %blue-gradient;
    @extend %center;
    box-shadow: 0 em(2px) em(10px) rgba(0, 59, 249, 0.7);

    &-svg {
      width: em(10px);
      height: em(10px);
      fill: $white;
    }
  }

  &__link {
    margin-top: em(30px);
  }
}

.aside-plus-link {
  $this: &;

  display: flex;
  justify-content: space-between;

  &:hover {
    #{$this}__icon {
      transform: scaleX(-1);
    }
  }

  &__title {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
    text-transform: uppercase;
  }

  &__icon {
    width: em(12px);
    height: em(12px);
    fill: $blue;
  }
}
</style>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'blue'
    },
    title: {
      type: String,
      default: null
    }
  },
  data() {
    return {};
  }
};
</script>

<template>
  <div 
    :class="'plate-tip_' + type" 
    class="plate-tip">
    <BaseAngleBar 
      :type="type" 
      class="plate-tip__angle-bar" />
    <div class="plate-tip__title">
      {{ title }}
    </div>
    <slot />
  </div>
</template>

<style lang="scss">
.plate-tip {
  position: relative;
  min-height: em(70px);
  box-sizing: border-box;

  @include ifdesktop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 em(30px);
  }
  @include ifmobile {
    padding: em(20px) em(0px);
  }

  &_blue {
    background-color: $blue;

    .plate-tip__title {
      $size: 12px;
      font-size: em($size);
      color: $white;
      font-weight: bold;
    }
  }

  &_light-blue {
    background-color: $light-blue;
  }

  &__angle-bar {
    left: em(17px);
    @include ifmobile {
      /*display: none;*/
    }
  }

  &__title {
    @include ifmobile {
      text-align: center;
      margin-bottom: em(20px);
    }
  }
}
</style>

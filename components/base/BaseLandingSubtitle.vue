<script>
export default {
  props: {
    type: {
      type: String,
      default: 'h3'
    }
  }
};
</script>

<template>
  <h1 
    v-if="type === 'h1'" 
    :class="['subtitle_' + type]" 
    class="subtitle">
    <slot />
  </h1>
  <h2 
    v-else-if="type === 'h2'" 
    :class="['subtitle_' + type]" 
    class="subtitle">
    <slot />
  </h2>
  <h3 
    v-else-if="type === 'h3'" 
    :class="['subtitle_' + type]" 
    class="subtitle">
    <slot />
  </h3>
</template>

<style lang="scss" scoped>
.subtitle {
  display: block;
  font-weight: bold;
  margin: 0;

  &_h1 {
    @include ifdesktop {
      font-size: em(36px);
    }
    @include ifmobile {
      font-size: em(26px);
    }
  }
  &_h2 {
    font-size: em(26px);
  }
  &_h3 {
    text-transform: uppercase;
    font-size: em(14px);
    margin-bottom: 0.3em;
    @include ifmobile {
      font-size: em(10px);
    }
  }
}
</style>

<template>
  <div class="logo">
    <nuxt-link 
      to="/landing/" 
      class="logo__link">
      <span class="logo__word-1">HOLDER</span
      ><span class="logo__word-2">LAB</span>
    </nuxt-link>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  $size: 20px;
  font-size: em($size);
  letter-spacing: em(4px, $size);
  &__word-1 {
    font-weight: bold;
  }

  &__link {
    color: $white;
  }
}
</style>

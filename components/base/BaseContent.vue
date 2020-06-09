<template>
  <div class="base-content">
    <slot />
  </div>
</template>

<style lang="scss">
.base-content {
  @include ifdesktop {
    width: em(672px);
  }
  @include ifmobile {
    padding-bottom: em(50px);
  }
}
</style>

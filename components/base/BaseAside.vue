<template>
  <div class="base-aside">
    <slot />
  </div>
</template>

<style lang="scss">
.base-aside {
  @include ifdesktop {
    width: em(262px);
  }
  @include ifmobile {
    /*padding-bottom: em(50px);*/
  }
}
</style>

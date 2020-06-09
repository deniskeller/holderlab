<script>
import { mapState, mapMutations } from 'vuex';
export default {
  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>
<template>
  <div class="nav-account">
    <nuxt-link 
      to="/account/" 
      class="nav-account__item">
      MY HOLDERLAB</nuxt-link
      >
    <nuxt-link 
      to="/account/exchange" 
      class="nav-account__item">
      EXCHANGE
    </nuxt-link>
    <nuxt-link 
      to="/account/notification-setting" 
      class="nav-account__item">
      NOTIFICATION SETTING
    </nuxt-link>
    <!-- <nuxt-link 
      to="/" 
      class="nav-account__item">
      2FA
    </nuxt-link>
    <nuxt-link 
      to="/" 
      class="nav-account__item">
      AUTO-REBALANCE API
    </nuxt-link>
    <nuxt-link 
      to="/" 
      class="nav-account__item">
      BILLING
    </nuxt-link> -->
    <nuxt-link 
      to="/account/referal-programm" 
      class="nav-account__item">
      PROMO PROGRAM
    </nuxt-link>
    <a
      href="exit"
      class="nav-account__item"
      @click.prevent="setPopup('quit-popup')"
    >
      EXIT
    </a>
  </div>
</template>

<style lang="scss">
.nav-account {
  &__item {
    position: relative;
    display: block;
    $size: 12px;
    font-size: em($size);
    padding: em(20px, $size);
    color: $grey;
    font-weight: bold;
    transition: color $speed;

    &:hover {
      color: $black;
    }
    &::before {
      content: '';
      display: none;
      position: absolute;
      width: em(4px);
      top: 0;
      left: 0;
      height: 100%;
      background: $blue;
    }

    &.nuxt-link-exact-active {
      color: $black;
      &::before {
        display: block;
      }
    }
  }
}
</style>

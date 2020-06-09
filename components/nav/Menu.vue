<script>
import { mapState, mapMutations } from 'vuex';

import Hamburger from '~/components/header/Hamburger';
import TabItem from '~/components/nav/TabItem';

export default {
  components: {
    Hamburger,
    TabItem
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('page', ['isMenuVisible'])
  },
  mounted() {},
  methods: {
    ...mapMutations('page', ['setIsMenuVisible'])
  }
};
</script>

<template>
  <div 
    :class="{ is_active: isMenuVisible }" 
    class="menu">
    <div class="menu__tab-bar">
      <TabItem
        title="CREATE PORTFOLIO"
        icon="create-portfolio"
        link="/create-new-portfolio/"
        class="menu__tab-item"
      />
      <TabItem
        title="DASHBOARD"
        icon="dashboard"
        link="/dashboard/"
        class="menu__tab-item"
      />
      <TabItem
        title="ASSET REBALANCE"
        icon="rebalance"
        link="/rebalancing-tab/"
        class="menu__tab-item"
      />
      <TabItem
        title="READY-MADE"
        icon="ready-made"
        link="/ready-made/"
        class="menu__tab-item"
      />
      <TabItem
        title="MATRIX"
        icon="matrix"
        link="/matrix/"
        class="menu__tab-item"
      />

      <TabItem
        title="PORTFOLIO OPTIMIZATION"
        icon="efficient-frontier"
        link="/efficient-frontier/"
        class="menu__tab-item"
      />

      <TabItem
        title="BACKTEST"
        icon="backtest"
        link="/backtest/"
        class="menu__tab-item"
      />

      <!--<TabItem-->
      <!--  title="MARKET"-->
      <!--  icon="market"-->
      <!--  link="/market/"-->
      <!--  class="menu__tab-item"/>-->

      <!--<TabItem-->
      <!--  title="MARKET"-->
      <!--  icon="market"-->
      <!--  link="/404/"-->
      <!--  class="menu__tab-item"-->
      <!--/>-->

      <TabItem
        title="SUBSCRIPTIONS"
        icon="payment"
        link="/subscriptions/"
        class="menu__tab-item"
      />
      <TabItem 
        title="FAQ" 
        icon="help" 
        link="/help/" 
        class="menu__tab-item" />
      <!--<TabItem-->
      <!--  title="ABOUT HOLDERLAB"-->
      <!--  icon="about"-->
      <!--  link="/about/"-->
      <!--  class="menu__tab-item menu__tab-item_last"/>-->

      <TabItem
        title="PRIVACY POLICY"
        link="/privacy-policy/"
        class="menu__tab-item menu__tab-item_hidden"
      />
      <TabItem
        title="TERM OF SERVICE"
        link="/terms-of-use/"
        class="menu__tab-item menu__tab-item_hidden"
      />
      <!--<TabItem-->
      <!--  title="SUPPORT"-->
      <!--  link="/support/"-->
      <!--  class="menu__tab-item menu__tab-item_hidden"-->
      <!--/>-->
    </div>
    <div class="menu__bg" />
    <!--<div class="menu__content">-->
    <!--  <img -->
    <!--    src="~static/img/menu-banner.png" -->
    <!--    alt=""-->
    <!--    class="menu__banner">-->
    <!--  <img -->
    <!--    src="~static/img/menu-banner.png" -->
    <!--    alt=""-->
    <!--    class="menu__banner">-->
    <!--  <img -->
    <!--    src="~static/img/menu-banner.png" -->
    <!--    alt=""-->
    <!--    class="menu__banner">-->
    <!--</div>-->
    <div class="menu__title">
      Holderlab
    </div>
    <Hamburger
      class="menu__hamburger is_close"
      @click.native="setIsMenuVisible(!isMenuVisible)"
    />
  </div>
</template>

<style lang="scss" scoped>
.menu {
  $this: &;

  width: em($tab-width);
  transition: width $speed * 2;
  transition-timing-function: ease-in;

  @include ifdesktop {
    height: 100%;
  }
  @include ifmobile {
    height: em(70px);
  }

  &.is_active {
    width: 25%;
    transition-timing-function: ease-out;
    z-index: 4;

    #{$this}__content {
      visibility: visible;
      opacity: 1;
      transition-delay: $speed;
    }

    @include ifmobile {
      width: 100%;
      height: 100%;
      overflow: auto;
      z-index: 1000;
      #{$this}__tab-bar {
        visibility: visible;
      }
      #{$this}__title {
        visibility: visible;
        opacity: 1;
        transition-delay: $speed;
      }
    }
  }

  &__title {
    $size: 26px;
    font-size: em($size);
    position: absolute;
    width: 100%;
    top: em(12px);
    left: 0;
    text-align: center;
    font-weight: bold;
    color: $white;
    z-index: 2;

    visibility: hidden;
    opacity: 0;
    transition: all $speed;
  }

  &__hamburger {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    @include ifdesktop {
      width: em($tab-width);
      height: em($header-height);
    }
    @include ifmobile {
      padding-top: em(12px);
      width: em(60px);
      height: em(60px);
    }
  }
  &__tab-bar {
    position: absolute;
    left: 0;
    top: em($header-height);
    width: em($tab-width);
    transition: visibility $speed * 2;
    @include ifmobile {
      visibility: hidden;
    }
  }
  &__tab-item {
    &_hidden {
      visibility: hidden;
      transition: visibility $speed * 2;

      @include ifparent('.is_active') {
        visibility: visible;
      }
    }
    &_last {
      border-bottom: none;
      &::after {
        display: none !important;
      }
    }
  }
  &__bg {
    position: absolute;
    visibility: hidden;
    transition-property: visibility;
    transition-duration: $speed * 2;
    width: 100%;
    @extend %background-gradient;
    z-index: 2;
    @include ifparent('.is_active') {
      visibility: visible;
    }
    @include ifdesktop {
      height: 100%;
    }
    @include ifmobile {
      height: em(960px);
    }
  }

  &__content {
    position: absolute;
    right: 0;
    top: em(100px);
    width: em(623px);
    z-index: 3;
    visibility: hidden;
    opacity: 0;
    transition: all $speed;
    @include ifmobile {
      display: none;
    }
  }

  &__banner {
    display: block;
    width: 100%;
    margin-bottom: em(6px);
  }
}
</style>

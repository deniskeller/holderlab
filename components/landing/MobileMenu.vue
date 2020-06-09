<script>
import { mapState, mapMutations } from 'vuex';

import Hamburger from '~/components/header/Hamburger';
import LandingTabItem from '~/components/landing/LandingTabItem';
import LandingTabLinkItem from '~/components/landing/LandingTabLinkItem';
import LandingModalTabItem from '~/components/landing/LandingModalTabItem';
import Logo from '~/components/header/Logo';
import Socnets from '~/components/socnets/Socnets';

export default {
  components: {
    Hamburger,
    LandingTabItem,
    LandingTabLinkItem,
    LandingModalTabItem,
    Logo,
    Socnets
  },
  data() {
    return {
      // is_menu_visible: false
    };
  },
  computed: {
    ...mapState('page', ['isMenuVisible'])
  },
  mounted() {},
  methods: {
    ...mapMutations('page', ['setIsMenuVisible']),
    ...mapMutations('page', ['setPopup'])
    // showMenu() {
    //   this.is_menu_visible = !this.is_menu_visible;
    // }
  }
};
</script>

<template>
  
    
  <div 
    :class="{ is_active: isMenuVisible }" 
    class="menu-mobile" >
    <div class="menu-mobile__tab-bar">
      <LandingTabItem
        title="LOG IN"
        icon=""
        link="/landing-modal/hello"
        class="menu__tab-item"
      />
  
      <LandingTabItem
        title="GET STARTED"
        icon="//"
        link="/landing-modal/welcome"
        class="menu__tab-item"
      />
  
      <!--<LandingTabItem -->
      <!--  title="TRIAL" -->
      <!--  icon="" -->
      <!--  link="//" -->
      <!--  class="menu__tab-item" />-->
      <LandingTabItem
        title="PLANS"
        icon="//"
        link="/landing-plans/"
        class="menu__tab-item"
      />
  
      <LandingTabLinkItem
        title="DOCS"
        href="https://docs.holderlab.io/"
        class="menu__tab-item"
      />
  
      <LandingTabLinkItem
        title="BLOG"
        href="https://blog.holderlab.io"
        class="menu__tab-item"
      />
  
      <LandingTabLinkItem
        title="PRIVACY POLICY"
        href="https://holderlab.io/landing-privacy-policy/"
        class="menu__tab-item"
      />
  
      <LandingTabLinkItem
        title="TERMS OF SERVICE"
        href="https://holderlab.io/landing-terms-of-service/"
        class="menu__tab-item"
      />
  
      <LandingTabItem
        title="SUPPORT"
        link="/support/"
        class="menu__tab-item menu__tab-item_hidden"
      />
  
      <Socnets class="menu-mobile__socnets" />
  
      <div class="footer__copyright">
        © 2019 HOLDERLAB OÜ All rights reserved
        <br >
        <a 
          href="mailto:contacts@holderlab.com" 
          class="footer__email">
          contacts@holderlab.com
        </a>
      </div>
    </div>
  
    <Logo class="menu-mobile__logo" />
    <div class="menu-mobile__bg" />
    <Hamburger
      class="menu-mobile__hamburger is_close"
      @click.native="setIsMenuVisible(!isMenuVisible)"
    />
  </div>
    
  
</template>

<style lang="scss" scoped>
.menu-mobile {
  position: fixed;
  width: 100%;
  height: em(80px);
  @extend %background-gradient;
  z-index: 1000;
  $this: &;
  transition: width $speed * 2;
  transition-timing-function: ease-in;

  &.is_active {
    width: 100%;
    height: 100%;
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    transition-timing-function: ease-out;

    #{$this}__content {
      visibility: visible;
      opacity: 1;
      transition-delay: $speed;
    }

    #{$this}__tab-bar {
      visibility: visible;
    }
    #{$this}__title {
      visibility: visible;
      opacity: 1;
      transition-delay: $speed;
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

  &__logo {
    position: absolute;
    width: 100%;
    top: 1.3em;
    text-align: center;
    z-index: 3;
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
      left: em(2px);
    }
  }

  &__tab-bar {
    position: absolute;
    left: 0px;
    top: em($header-height);
    width: 100%;
    transition: visibility $speed * 2;
    @include ifmobile {
      visibility: hidden;
    }
  }

  .menu__tab-item {
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
    overflow-y: scroll;
    @extend %background-gradient;
    z-index: 2;
    @include ifparent('.is_active') {
      visibility: visible;
      @include ifmobile {
        height: em(910px);
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        overflow-y: scroll;
      }
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

  &__socnets {
    z-index: 1000;
    position: relative;
    margin-top: em(80px);
  }

  .footer__copyright {
    $size: 14px;
    font-size: em($size);
    color: $white;
    z-index: 1000;
    position: relative;
    @include ifmobile {
      width: 100%;
      text-align: center;
      margin: em(30px) 0;
    }
  }
  .footer__email {
    color: $yellow;
    z-index: 1000;
    position: relative;
  }
}
</style>

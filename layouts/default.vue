<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import LayoutPreload from '~/components/LayoutPreload';
import PagePreload from '~/components/PagePreload';
import Header from '~/components/header/Header';
import Menu from '~/components/nav/Menu';
import Footer from '~/components/Footer';
import Socnets from '~/components/socnets/Socnets';
import UpgradePopup from '~/components/content/UpgradePopup';
import UpgradeProPopup from '~/components/content/UpgradeProPopup';
import QuitPopup from '~/components/content/account/QuitPopup';

export default {
  middleware: 'authenticated',
  
  components: {
    LayoutPreload,
    PagePreload,
    Header,
    Menu,
    Footer,
    Socnets,
    UpgradePopup,
    UpgradeProPopup,
    QuitPopup
  },

  data() {
    return {
      // isFullPreload: false
    };
  },

  computed: {
    ...mapState('page', [
      'popup',
      'isFullPreload',
      'idActivePortfolio',
      'timer'
    ]),

    id_portfel() {
      return this.idActivePortfolio;
    }
  },

  watch: {
    timer() {
      setTimeout(this.getHistoryMessage, 60000);
    }
  },

  mounted() {
    this.getBestReadyMadePortfolio();
    this.getHistoryMessage();
    this.makeRequestWhiteList();
    this.getBalance(this.id_portfel);
  },

  methods: {
    ...mapActions('page', [
      'makeRequestWhiteList',
      'getHistoryMessage',
      'getBalance',
      'getBestReadyMadePortfolio'
    ]),
    ...mapMutations('page', ['setPopup', 'setIsFullPreload', 'changeTimer'])
  }
};
</script>

<template>
  <div 
    class="layout" 
    scoped>
    <LayoutPreload />
    
    <PagePreload v-if="isFullPreload"/>
    
    <div class="layout__container">
      <Header class="layout__header" />
      <nuxt class="layout__content" />
      <Menu class="layout__menu" />
      <Socnets class="layout__socnets" />
      <Footer class="layout__footer" />
    </div>
    <transition name="layout-fade">
      <div 
        v-if="popup" 
        class="layout__fade" 
        @click="setPopup(null)" />
    </transition>
    <UpgradePopup class="upgrade-popup" />
    <UpgradeProPopup class="upgrade-pro-popup" />
    <QuitPopup class="quit-popup" />
  </div>
</template>
<style lang="scss" scoped>
.layout {
  &__container {
    position: relative;
    @include ifdesktop {
      width: em(1138px);
      padding-left: em($tab-width);
      margin: 0 auto;
    }
  }

  &__header {
    @include ifdesktop {
      z-index: 5;
      position: relative;
      height: em($header-height);
    }
    @include ifmobile {
      z-index: 1;
      position: fixed;
      width: 100%;
      height: em(130px);
    }
  }

  &__content {
    position: relative;
    background-color: $white;
    @include ifdesktop {
      min-height: em(1000px);
    }
    @include ifmobile {
      padding-top: em(130px);
    }
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 0%;
      height: 100%;
      top: 0;
      left: 0;
      background: $white;
      z-index: 10;
    }
  }

  &__menu {
    position: absolute;
    left: 0;
    top: 0;
    @include ifmobile {
      position: fixed;
      z-index: 1000;
    }
  }

  &__socnets {
    @include ifdesktop {
      position: absolute;
      left: 0;
      bottom: em(100px);
    }
    @include ifmobile {
      margin-top: em(30px);
    }
  }

  &__footer {
    @include ifdesktop {
      height: em(100px);
      margin-bottom: em(33px);
    }
  }

  &__fade {
    position: absolute;
    @extend %background-gradient;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.5;
    z-index: 10;
  }
}

.layout-fade-enter-active,
.layout-fade-leave-active {
  transition: opacity $speed;
}
.layout-fade-enter,
.layout-fade-leave-to {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition-duration: $speed * 2;
  &::after {
    transition: all $speed * 2;
  }
}

.page-enter,
.page-leave-active {
  &::after {
    width: 100%;
  }
}

.page-enter-active {
  &::after {
    left: auto;
    right: 0;
  }
}
</style>

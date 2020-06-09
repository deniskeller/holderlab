<script>
import { mapState, mapMutations } from 'vuex';

import DesktopMenuItem from '~/components/landing/DesktopMenuItem';
import DesktopMenuLinkItem from '~/components/landing/DesktopMenuLinkItem';
import MenuItemModal from '~/components/landing/MenuItemModal';

export default {
  components: {
    DesktopMenuItem,
    DesktopMenuLinkItem,
    MenuItemModal
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('page', ['isMenuVisible'])
  },
  mounted() {},
  methods: {
    ...mapMutations('page', ['setIsMenuVisible']),
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <div class="desktop-menu">
    <div class="desktop-menu__tab-bar">
      <!--<DesktopMenuItem -->
      <!--  title="TRIAL" -->
      <!--  link="//" -->
      <!--  class="desktop-menu__tab-item" />-->

      <DesktopMenuItem
        title="PLANS"
        link="/landing-plans/"
        class="modal-plans desktop-menu__tab-item"
      />

      <DesktopMenuLinkItem
        href="https://docs.holderlab.io/"
        title="DOCS"
        class="desktop-menu__tab-item"
      />

      <DesktopMenuLinkItem
        href="https://blog.holderlab.io"
        title="BLOG"
        class="desktop-menu__tab-item"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.desktop-menu {
  $this: &;

  width: 100%;
  transition: width $speed * 2;
  transition-timing-function: ease-in;

  @include ifdesktop {
    height: 100%;
    display: block;
  }
  @include ifmobile {
    height: em(70px);
    display: none;
  }

  &__tab-bar {
    display: flex;
    flex-direction: row;
  }
  .desktop-menu__tab-item {
    margin-right: em(95px);
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
  .desktop-menu__tab-item:last-child {
    margin-right: em(35px);
  }
}
</style>

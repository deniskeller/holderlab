<script>
import { mapState, mapMutations } from 'vuex';

import LandingUpgradePopup from '~/components/content/LandingUpgradePopup';
import QuitPopup from '~/components/content/account/QuitPopup';

export default {
  components: {
    LandingUpgradePopup,
    QuitPopup
  },
  computed: {
    ...mapState('page', ['popup'])
  },
  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <div class="layout">
    <nuxt class="layout__content" />

    <transition name="layout-fade">
      <div 
        v-if="popup" 
        class="layout__fade" 
        @click="setPopup(null)" />
    </transition>
    <LandingUpgradePopup class="landing-upgrade-popup" />
    <QuitPopup class="quit-popup" />
  </div>
</template>

<style lang="scss" scoped>
.layout {
}
</style>

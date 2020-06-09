<script>
import { mapState, mapMutations } from 'vuex';

export default {
  components: {},
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
  </div>
</template>

<style lang="scss" scoped>
</style>

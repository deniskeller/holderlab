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
  <div class="content">
    <nuxt />
  </div>
</template>

<style lang="scss" scoped>
</style>

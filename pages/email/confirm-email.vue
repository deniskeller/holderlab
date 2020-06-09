<script>
import { mapState, mapMutations } from 'vuex';

export default {
  layout: 'email',
  components: {},
  data() {
    return {};
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
  <div class="">
    dfgdfg
  </div>
</template>

<style lang="scss" scoped>
</style>

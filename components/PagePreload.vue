<script>
import { mapState, mapMutations } from 'vuex';

import loader from '~/components/loader';
export default {
  components: {
    loader
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('page', ['removeAsset'])
  },
  mounted() {},
  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <div class="overflow">
    
    <loader :is-dark="true"/>
    
  </div>
  
</template>

<style lang="scss" scoped>
.overflow {
  position: fixed;
  overflow: hidden;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  /*background: $blue;*/
  /*opacity: .3;*/
}
</style>

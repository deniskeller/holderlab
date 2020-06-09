<script>
import { mapMutations } from 'vuex';

import HeatMapCorMat from '~/components/content/matrix/HeatMapCorMat';
export default {
  components: {
    HeatMapCorMat
  },
  props: {
    series: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <BasePopup class="matrix-graph-popup">
    <HeatMapCorMat 
      :series="series" 
      class="matrix__graph" />
  </BasePopup>
</template>

<style lang="scss" scoped>
.base-popup__container {
  max-width: 548px;
}
</style>

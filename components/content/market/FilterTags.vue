<script>
import MarketAddFilterTag from '~/components/content/market/MarketAddFilterTag';
export default {
  components: {
    MarketAddFilterTag
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<template>
  <div class="add-currencies-tags">
    <MarketAddFilterTag 
      title="Bytecoin Cash" 
      class="add-currencies-tags__tag">
      ROI
    </MarketAddFilterTag>
    <MarketAddFilterTag 
      title="Bitcryctall" 
      class="add-currencies-tags__tag">
      TOP
    </MarketAddFilterTag>
    <MarketAddFilterTag 
      title="Bela" 
      class="add-currencies-tags__tag">
      DOWN
    </MarketAddFilterTag>
  </div>
</template>

<style lang="scss">
.add-currencies-tags {
}
</style>

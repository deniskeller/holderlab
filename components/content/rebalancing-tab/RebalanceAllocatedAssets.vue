<script>
/*RebalanceAllocatedAssets*/
import { mapState } from 'vuex';
import RebalanceAllocatedAssetItem from '~/components/content//rebalancing-tab/RebalanceAllocatedAssetItem';
import allocatedAssets from '~/assets/data/allocated-assets.json';
export default {
  components: {
    RebalanceAllocatedAssetItem
  },
  props: {
    aside_allocated_assets: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },

  data() {
    return {};
  },

  computed: {
    percent() {
      let percent = 0;
      for (let item of this.aside_allocated_assets) {
        percent += parseFloat(item.percent) || 0;
      }
      return Math.round(percent * 100) / 100;
    }
  },

  watch: {
    aside_allocated_assets() {
      this.calculate();
    }
  },

  mounted() {
    this.calculate();
  },

  methods: {
    calculate() {
      if (this.percent === 100) {
        this.$emit('percent', false);
      } else {
        this.$emit('percent', true);
      }
    }
  }
};
</script>

<template>
  <div class="allocated-assets">
    <BaseAllocatedHeader2
      v-if="aside_allocated_assets.length > 0"
      :percent="percent"
      title="Allocated"
      class="allocated-assets__header"
    />
    <BaseScrollBlock3 class="allocated-assets__scroll-block">
      <!--{{ aside_allocated_assets }}-->
      
      <RebalanceAllocatedAssetItem
        v-for="(item, index) in aside_allocated_assets"
        :key="index"
        :title="item.title"
        :short="item.short"
        :rank="item.rank"
        :price="item.asset_price"
        :change="item.change"
        :rebalance="item.rebalance"
        :progress_props="item.piece_of_coin"
        :id_coin="item.id_coin"
        :percent="item.percent"
        :close="true"
        class="allocated-assets__asset-item"
        @change="calculate"
        @close="calculate"
      />
    </BaseScrollBlock3>
  </div>
</template>

<style lang="scss">
.allocated-assets {
  &__header {
    margin-right: em(-5px);
  }
}
</style>

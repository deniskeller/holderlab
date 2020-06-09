<script>
// import { mapState, mapMutations } from 'vuex';
import AllocatedAssetItem from '~/components/content/AllocatedAssetItem';
export default {
  components: {
    AllocatedAssetItem
  },
  props: {
    aside_allocated_assets: {
      type: Array,
      default: function() {
        return [];
      }
    },
    balance: {
      type: Number,
      default: 0
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
      :percent="percent"
      title="Allocated"
      class="allocated-assets__header"
    />
    <BaseScrollBlock3 class="allocated-assets__scroll-block">
      <AllocatedAssetItem
        v-for="(item, index) in aside_allocated_assets"
        :key="index"
        :balance="balance"
        :short="item.short"
        :title="item.title"
        :rank="item.rank"
        :price="item.price"
        :hour24="item.change"
        :id_coin="item.id_coin"
        :percent="item.percent"
        :close="true"
        :is_estimated_error="false"
        class="allocated-assets__asset-item"
        @change="calculate"
        @close="calculate"
      />
    </BaseScrollBlock3>
  </div>
</template>

<style lang="scss">
.allocated-assets {
  &__scroll-block {
    /*height: em(500px);*/
  }
}
</style>

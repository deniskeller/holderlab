<script>
/*RebalancingSpopList*/
import AddCurrenciesTag from '~/components/content/add-currencies/AddCurrenciesTag';
export default {
  components: {
    AddCurrenciesTag
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
    return {
      type_comp: 'rebalancing_stop'
    };
  },
  computed: {
    stop_list() {
      return this.aside_allocated_assets.filter(item => {
        if (!item.rebalance) return item;
      });
    }
  },
  mounted() {},
  methods: {}
};
</script>

<template>
  <div class="add-currencies-tags">
    <AddCurrenciesTag
      v-for="(item, index) in stop_list"
      :key="index"
      :index="index"
      :type_comp="type_comp"
      :title="item.title"
      :short="item.short"
      :id_coin="item.id_coin"
      class="add-currencies-tags__tag"
    />
    <div class="add-currencies-tags__tag-hidden"/>
  </div>
</template>

<style lang="scss" scoped>
.add-currencies-tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  &__tag {
    margin-bottom: em(5px);
  }
  &__tag-hidden {
    width: 6.6375em;
    height: 0;
  }
}
</style>

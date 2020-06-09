<script>
import RebalanceAddCurrenciesTag from '~/components/content/add-currencies/RebalanceAddCurrenciesTag';

export default {
  components: {
    RebalanceAddCurrenciesTag
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
      type_comp: 'rebalancing'
    };
  },

  computed: {},
  mounted() {},
  methods: {}
};
</script>

<template>
  <div class="add-currencies-tags">
    <RebalanceAddCurrenciesTag
      v-for="(item, index) in aside_allocated_assets"
      :key="index"
      :index="index"
      :type_comp="type_comp"
      :title="item.title"
      :short="item.short"
      :id_coin="item.id_coin"
      class="add-currencies-tags__tag"
    >
      <span class="currencies-percent">+{{ item.piece_of_coin }}%</span>
    </RebalanceAddCurrenciesTag>
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
    position: relative;
    .currencies-percent {
      font-size: em(14px);
      line-height: em(21px);
      color: #81d540;
      @include ifmobile {
        position: absolute;
        top: em(50px);
        left: em(42px);
        display: flex;
        justify-content: center;
        align-items: center;
        width: em(60px);
        height: em(40px);
        background: $white;
        border-radius: 6px;
        font-size: em(16px);
        color: $black;
      }
    }
  }
  &__tag-hidden {
    width: 8.3625em;
    height: 0;
  }
}
</style>

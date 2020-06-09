<script>
import { mapState, mapMutations } from 'vuex';

import PortfolioAddCurrenciesTag from '~/components/content/create-new-portfolio/PortfolioAddCurrenciesTag';
import addTagData from '~/assets/data/add-tag.json';
export default {
  components: {
    PortfolioAddCurrenciesTag
  },

  data() {
    return {};
  },

  computed: {
    ...mapState('page', ['addAsset', 'analyzedPortfolios']),

    get_analyzed_portfolios() {
      return this.analyzedPortfolios;
    }
  },

  mounted() {},

  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <div class="add-currencies-tags">
    <PortfolioAddCurrenciesTag
      v-for="(item, index) in get_analyzed_portfolios"
      :key="index"
      :index="index"
      :title="item.title"
      :short="item.short"
      :id_coin="item.id_coin"
      class="add-currencies-tags__tag"
    />
    <div class="add-currencies-tags__tag-hidden" />
  </div>
</template>

<style lang="scss" scoped>
.add-currencies-tags {
  @include ifmobile {
    padding: 0 em(5px);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  &__tag-hidden {
    display: none;
    @include ifmobile {
      display: block;
      width: em(105px);
      height: 0;
    }
  }
}
</style>

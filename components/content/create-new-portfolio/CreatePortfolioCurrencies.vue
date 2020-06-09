<script>
/*CreatePortfolioCurrencies*/
import { mapMutations, mapState } from 'vuex';
import CreatePortfolioCurrenciesItem from '~/components/content/create-new-portfolio/CreatePortfolioCurrenciesItem';
import PortfolioAddCurrenciesTags from '~/components/content/create-new-portfolio/PortfolioAddCurrenciesTags';
import AddIcon from '~/components/icons/AddIcon';

export default {
  components: {
    CreatePortfolioCurrenciesItem,
    AddIcon,
    PortfolioAddCurrenciesTags
  },
  props: {
    search: {
      type: Boolean,
      default: false
    },
    portfolio_data: {
      type: Array,
      default() {
        return [];
      }
    },
    pages: {
      type: Boolean,
      default: false
    },
    tags: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search_item: ''
    };
  },

  computed: {
    ...mapState('page', ['addAsset', 'analyzedPortfolios']),

    get_len_analyzed_portfolios() {
      return this.analyzedPortfolios.length;
    },
    // поиск монет
    filteredData: function() {
      var search_array = this.portfolio_data,
        search_item = this.search_item;

      if (!search_item) {
        return search_array;
      }

      search_item = search_item.trim().toLowerCase();

      search_array = search_array.filter(item => {
        if (item.full_name.toLowerCase().indexOf(search_item) !== -1) {
          return item;
        }
      });

      return search_array;
    }
  },

  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <div 
    class="add-currencies" 
    scoped>
    <BaseSearchField
      v-if="search"
      v-model="search_item"
      class="add-currencies__search"
      placeholder="SEARCH"
    />

    <PortfolioAddCurrenciesTags 
      v-if="tags" 
      class="add-currencies__tags" />

    <BaseScrollBlock class="add-currencies__scroll-block">
      <CreatePortfolioCurrenciesItem
        v-for="(item, index) in filteredData"
        :key="index"
        :index="index"
        :amount="item.in_usd"
        :min_limits_amoun_in_usd="item.min_limits_amoun_in_usd"
        :min_limits_amount="item.min_limits_amount"
        :inpercent="item.percent_real"
        :change="item.statistics.day"
        :price="item.last_price"
        :coin="item.in_btc"
        :title="item.full_name"
        :remove="item.remove"
        :short="item.name"
        :id_coin="item.id_coin"
        :rank="item.rank"
        :search_item="search_item"
        class="add-currencies__item"
      />
    </BaseScrollBlock>

    <div 
      v-if="pages" 
      class="add-currencies__pages">
      <span class="add-currencies__pages-current">{{
        get_len_analyzed_portfolios
      }}</span>
      <span 
        class="add-currencies__pages-all"
      >/{{ portfolio_data.length }}</span
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-currencies {
  position: relative;

  &__scroll-block {
    height: em(384px);
    @include ifmobile {
      height: 100%;
      min-height: em(184px);
    }
  }
  &__search {
    @include ifdesktop {
      margin: 0 em(60px) em(17px) 0;
    }
    @include ifmobile {
      margin-bottom: em(15px);
    }
  }
  &__more-assets {
    height: em(70px);
    padding: em(10px) em(22px);
    margin-bottom: em(6px);
    box-sizing: border-box;
    @extend %bottom-shadow;
    background-color: $blue;
    color: $white;
    cursor: pointer;

    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color $speed;

    &:hover {
      background-color: lighten($blue, 10%);
    }
    &:active {
      background-color: darken($blue, 10%);
    }
  }

  &__more-assets-title {
    $size: 12px;
    font-size: em($size);
    font-weight: bold;
  }

  &__more-assets-add-icon {
    width: em(14px);
    height: em(14px);
    fill: $white;
  }

  &__tags {
    margin-bottom: em(22px);
  }

  &__pages {
    position: absolute;
    right: em(60px);
    bottom: em(-80px);
    @include ifmobile {
      display: none;
    }

    &-all {
      color: $grey;
    }
  }
}
</style>

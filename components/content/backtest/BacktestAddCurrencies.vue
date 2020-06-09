<script>
/*BacktestAddCurrencies*/
import BacktestAddCurrenciesItem from '~/components/content/backtest/BacktestAddCurrenciesItem';
import AddCurrenciesTags from '~/components/content/add-currencies/AddCurrenciesTags';
import AddIcon from '~/components/icons/AddIcon';
export default {
  components: {
    BacktestAddCurrenciesItem,
    AddIcon,
    AddCurrenciesTags
  },
  props: {
    search: {
      type: Boolean,
      default: false
    },

    whitelist: {
      type: Array,
      default() {
        return [];
      }
    },

    coin_list: {
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
    length_coin_list() {
      return this.coin_list.length;
    },
    // поиск монет
    filteredData: function() {
      var search_array = this.whitelist,
        search_item = this.search_item;

      if (!search_item) {
        return search_array;
      }

      search_item = search_item.trim().toLowerCase();

      search_array = search_array.filter(item => {
        if (item.name.toLowerCase().indexOf(search_item) !== -1) {
          return item;
        }
        if (item.symbol.toLowerCase().indexOf(search_item) !== -1) {
          return item;
        }
      });

      return search_array;
    }
  }
};
</script>

<template>
  <div class="matrix-add-currencies">
    <BaseSearchField
      v-if="search"
      v-model="search_item"
      class="matrix-add-currencies__search"
      placeholder="SEARCH"
    />
    <AddCurrenciesTags
      v-if="tags"
      :aside_allocated_assets="coin_list"
      type_comp="matrix"
      class="matrix-add-currencies__tags"
    />
    <BaseScrollBlock3 class="matrix-add-currencies__scroll-block">
      <BacktestAddCurrenciesItem
        v-for="(item, index) in filteredData"
        :key="index"
        :index="index"
        :id_coin="item.id_coin"
        :title="item.name"
        :short="item.symbol"
        :date="item.epoch"
        :price="item.price"
        :hour24="item.statistics.day"
        :search_item="search_item"
        class="matrix-add-currencies__item"
      />
    </BaseScrollBlock3>

    <div 
      v-if="pages" 
      class="matrix-add-currencies__pages">
      <span class="matrix-add-currencies__pages-current">{{
        length_coin_list
      }}</span>
      <span 
        class="matrix-add-currencies__pages-all"
      >/{{ whitelist.length }}</span
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.matrix-add-currencies {
  position: relative;

  &__scroll-block {
    width: 100%;
    height: em(453px);
  }
  &__search {
    width: 100%;
    @include ifdesktop {
      margin: 0 em(0px) em(40px) 0;
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

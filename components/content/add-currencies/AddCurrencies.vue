<script>
/*AddCurrencies*/
import AddCurrenciesItem from '~/components/content/add-currencies/AddCurrenciesItem';
import AddCurrenciesTags from '~/components/content/add-currencies/AddCurrenciesTags';
import AddIcon from '~/components/icons/AddIcon';
export default {
  components: {
    AddCurrenciesItem,
    AddIcon,
    AddCurrenciesTags
  },

  props: {
    search: {
      type: Boolean,
      default: false
    },
    is_new_portfolio: {
      type: Boolean,
      default: false
    },

    coin_list: {
      type: Array,
      default: function() {
        return [];
      }
    },

    whitelist: {
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
    coin_list_length() {
      return this.coin_list.length;
    },

    whitelist_length() {
      return this.whitelist.length;
    },

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
  <div class="add-currencies">
    <BaseSearchField
      v-if="search"
      v-model="search_item"
      class="add-currencies__search"
      placeholder="SEARCH"
    />
    <AddCurrenciesTags
      v-if="tags"
      :aside_allocated_assets="coin_list"
      class="add-currencies__tags"
    />

    <BaseScrollBlock class="add-currencies__scroll-block">
      <AddCurrenciesItem
        v-for="(item, index) in filteredData"
        :key="index"
        :index="index"
        :title="item.name"
        :rank="item.rank"
        :price="item.price"
        :change="item.statistics.day"
        :short="item.symbol"
        :id_coin="item.id_coin"
        :search_item="search_item"
        :is_new_portfolio="is_new_portfolio"
        :min_limits_amoun_in_usd="item.min_limits_amoun_in_usd"
        :min_limits_amount="item.min_limits_amount"
        class="add-currencies__item"
      />
    </BaseScrollBlock>

    <div 
      v-if="pages" 
      class="add-currencies__pages">
      <span class="add-currencies__pages-current">{{ coin_list_length }}</span>
      <span class="add-currencies__pages-all">/{{ whitelist_length }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-currencies {
  position: relative;

  &__scroll-block {
    height: em(384px);
  }
  &__search {
    @include ifdesktop {
      margin: 0 em(60px) em(40px) 0;
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

    &-all {
      color: $grey;
    }
  }
}
</style>

<script>
import { mapMutations } from 'vuex';
import addCurrenciesData from '~/assets/data/market-add-currencies.json';
import MarketAddCurrenciesItem from '~/components/content/market/MarketAddCurrenciesItem';
import MarketAddCurrenciesTags from '~/components/content/market/MarketAddCurrenciesTags';
import AddIcon from '~/components/icons/AddIcon';
export default {
  components: {
    MarketAddCurrenciesItem,
    AddIcon,
    MarketAddCurrenciesTags
  },
  props: {
    search: {
      type: Boolean,
      default: false
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
      addCurrenciesData
    };
  },
  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <div class="add-currencies">
    <BaseSearchField
      v-if="search"
      class="add-currencies__search"
      placeholder="SEARCH"
    />
    <MarketAddCurrenciesTags 
      v-if="tags" 
      class="add-currencies__tags" />
    <BaseScrollBlock class="add-currencies__scroll-block">
      <MarketAddCurrenciesItem
        v-for="(item, index) in addCurrenciesData"
        :key="index"
        :index="index"
        :title="item.title"
        :day="item.day"
        :roi="item.roi"
        :draw="item.draw"
        :rank="item.rank"
        :price="item.price"
        :hour24="item.hour24"
        :short="item.short"
        :remove="item.remove"
        class="add-currencies__item"
      />
      <!--<div-->
      <!--  class="add-currencies__more-assets"-->
      <!--  @click.prevent="setPopup('upgrade-popup')">-->
      <!--  <div class="add-currencies__more-assets-title">-->
      <!--    MORE ASSETS-->
      <!--  </div>-->
      <!--  <AddIcon class="add-currencies__more-assets-add-icon"/>-->
      <!--</div>-->
    </BaseScrollBlock>

    <div 
      v-if="pages" 
      class="add-currencies__pages">
      <span class="add-currencies__pages-current">12</span>
      <span class="add-currencies__pages-all">/149</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-currencies {
  position: relative;

  &__scroll-block {
    height: em(390px);
  }
  &__search {
    @include ifdesktop {
      margin: 0 em(0px) em(17px) 0;
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

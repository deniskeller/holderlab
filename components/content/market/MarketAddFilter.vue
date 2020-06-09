<script>
import FilterTags from '~/components/content/market/FilterTags';
import AddIcon from '~/components/icons/AddIcon';
export default {
  components: {
    AddIcon,
    FilterTags
  },
  props: {
    tags: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<template>
  <div class="add-currencies">
    <FilterTags 
      v-if="tags" 
      class="add-currencies__tags" />
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

    &-all {
      color: $grey;
    }
  }
}
</style>

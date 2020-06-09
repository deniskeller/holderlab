<script>
/*AddCurrenciesTags*/
import { mapState, mapMutations } from 'vuex';
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
    },

    type_comp: {
      type: String,
      default: 'new'
    }
  },

  data() {
    return {};
  },

  computed: {
    get_aside_allocated_assets() {
      return this.aside_allocated_assets;
    }
  },

  mounted() {},

  methods: {}
};
</script>

<template>
  <div class="add-currencies-tags">
    <AddCurrenciesTag
      v-for="(item, index) in aside_allocated_assets"
      :key="index"
      :index="index"
      :type_comp="type_comp"
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

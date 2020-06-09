<script>
import { mapState, mapMutations } from 'vuex';

import MarketAddCurrenciesTag from '~/components/content/market/MarketAddCurrenciesTag';
import addTagData from '~/assets/data/add-tag.json';
export default {
  components: {
    MarketAddCurrenciesTag
  },
  props: {
    remove: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    short: {
      type: String,
      default: null
    },
    close: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      addTagData
    };
  },
  computed: {
    ...mapState('page', ['addAsset'])
  },
  watch: {
    addAsset() {
      this.add();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapMutations('page', ['setPopup']),
    init() {
      this.items = document.querySelectorAll('.add-currencies-tag-1');
      // console.log(this.items);
    },
    add() {
      this.addTagData.push(this.addAsset);
      // console.log(this.addAsset);
      setTimeout(() => {
        this.init();
        // console.log(this.init);
      });
    }
  }
};
</script>

<template>
  <div class="add-currencies-tags">
    <MarketAddCurrenciesTag
      v-for="(item, index) in addTagData"
      :key="index"
      :index="index"
      :title="item.title"
      :remove="item.remove"
      :short="item.short"
      class="add-currencies-tags__tag add-currencies-tags__tag-item"
    />
  </div>
</template>

<style lang="scss">
.add-currencies-tags {
}
</style>

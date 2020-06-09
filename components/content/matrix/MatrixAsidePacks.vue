<script>
import { mapState, mapMutations } from 'vuex';

import matrixPacks from '~/assets/data/matrix-packs.json';
import MatrixAsidePack from '~/components/content/matrix/MatrixAsidePack';

export default {
  components: {
    MatrixAsidePack
  },
  data() {
    return {
      matrixPacks
    };
  },

  computed: {
    ...mapState('page', ['readyMadePortfolioList', 'userInfo']),

    ready_made_portfolio_list: {
      // """return best Reade Made Portfolio from store"""
      get: function() {
        // console.log(this.readyMadePortfolioList);
        return this.readyMadePortfolioList;
      },
      set: function(value) {
        this.setReadyMadePortfolioList(value);
      }
    }
  },

  methods: {
    ...mapMutations('page', ['setReadyMadePortfolioList', 'setPopup'])
  }
};
</script>

<template>
  <div class="matrix-aside-packs">
    <div class="matrix-aside-packs__risk">
      <div class="matrix-aside-packs__risk-title">Risk</div>
      <BaseSwitch
        :items="['LOW', 'MED', 'HIGH']"
        :active="2"
        class="matrix-aside-packs__risk-switch"
      />
    </div>
    <div class="matrix-aside-packs__packs">
      <MatrixAsidePack
        v-for="(item, index) in ready_made_portfolio_list"
        :key="index"
        :title="item.name"
        :text="item.description"
        :day="item.statistics.day"
        :month="item.statistics.month"
        :year="item.statistics.year"
        class="matrix-aside-packs__pack"
      />
    </div>

    <!--@click.native="setPopup('upgrade-popup')"-->
  </div>
</template>

<style lang="scss" scoped>
.matrix-aside-packs {
  &__risk {
    display: flex;
    justify-content: space-between;
    margin-top: em(26px);

    @include ifmobile {
      padding: 0 em(15px);
    }
  }
  &__pack {
    margin-top: em(20px);
  }
}
</style>

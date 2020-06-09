<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import packs from '~/assets/data/packs.json';
import AsidePack from '~/components/aside/AsidePack';

export default {
  components: {
    AsidePack
  },
  data() {
    return {
      packs,
      active: '1'
    };
  },

  computed: {
    ...mapState('page', ['short_rm_portfolio_list', 'userInfo']),

    get_status_account() {
      return this.userInfo.status_account;
    },

    ready_made_portfolio_list() {
      // """return best Reade Made Portfolio from store"""
      switch (this.active) {
        case '0':
          // code
          return this.short_rm_portfolio_list.low_risk;
        case '1':
          // code
          return this.short_rm_portfolio_list.medium_risk;
        case '2':
          // code
          return this.short_rm_portfolio_list.hight_risk;
      }
    }
  },

  mounted() {
    // console.log('----mounted----');
    // if (!this.$cookies.get('secret_token')) {
    // this.$router.push({ path: '/landing-modal/hello/' });
    // } else {
    this.getReadyMadePortfel();
    this.getShortRMPortfolioList();
    // }
  },

  methods: {
    ...mapMutations('page', ['setPopup']),
    ...mapActions('page', ['getReadyMadePortfel', 'getShortRMPortfolioList'])
  }
};
</script>

<template>
  <div class="aside-packs">
    <div class="aside-packs__risk">
      <div class="aside-packs__risk-title">Risk</div>
      <BaseSwitch
        :items="['LOW', 'MID', 'HIGH']"
        :active="2"
        v-model="active"
        class="aside-packs__risk-switch"
      />
    </div>

    <div class="aside-packs__packs">
      <AsidePack
        v-for="(item, index) in ready_made_portfolio_list"
        :key="index"
        :title="item.name"
        :id_portfolio="item.id_portfolio"
        :statusaccount="get_status_account"
        :text="item.description"
        :day="item.statistics.day"
        :month="item.statistics.month"
        :year="item.statistics.year"
        class="aside-packs__pack"
      />
    </div>
    <BaseButton 
      type="secondary" 
      class="aside-packs__button" 
      to="/ready-made">
      MORE PACKS
    </BaseButton>
    <!--@click.native="setPopup('upgrade-popup')"-->
  </div>
</template>

<style lang="scss">
.aside-packs {
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

  &__packs {
    margin-bottom: em(40px);
  }

  &__button {
    @include ifmobile {
      margin-left: em(15px);
    }
  }
}
</style>

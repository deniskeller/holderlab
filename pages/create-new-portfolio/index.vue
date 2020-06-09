<script>
import { mapState, mapMutations } from 'vuex';

import ApiService from '@/services/ApiService';
import NavCreateNewPortfolio from '~/components/nav/NavCreateNewPortfolio';
import CreateNewPortfolioForm from '~/components/content/create-new-portfolio/CreateNewPortfolioForm';
import AddCurrienciesForm from '~/components/content/create-new-portfolio/AddCurrienciesForm';
import AsidePacks from '~/components/aside/AsidePacks';

export default {
  components: {
    NavCreateNewPortfolio,
    CreateNewPortfolioForm,
    AddCurrienciesForm,
    AsidePacks
  },

  data: function() {
    return {
      selected_market: ''
    };
  },

  computed: {
    ...mapState('page', [
      'newPortfolio',
      'activeMarket',
      'userInfo',
      'balanceChosenMarket',
      'whiteListForMarkets'
    ]),

    get_data_with_market() {
      return this.whiteListForMarkets.data[this.selected_market];
    },

    get_balance_chosen_market() {
      return this.balanceChosenMarket;
    },

    get_new_portfolio_data() {
      // """return best ReadeMade Portfolio from store """
      return this.newPortfolio;
    },

    is_show_item() {
      if (this.get_new_portfolio_data.length > 0) {
        return true;
      } else {
        return false;
      }
    },

    get_user_info() {
      // """return best ReadeMade Portfolio from store"""
      return this.userInfo;
    },

    active_market: {
      /* all or any name market */
      get() {
        if (this.activeMarket.market_title == 'all') return null;
        else {
          return this.activeMarket;
        }
      },
      set(value) {
        this.setActiveMarket(value);
      }
    }
  },

  mounted() {
    this.setOffPathInDashboard();
    // if (!this.$cookies.get('secret_token')) {
    //   this.$router.push({ path: '/landing-modal/hello/' });
    // } else {
    //   console.log('loggin');
    // }
  },

  methods: {
    ...mapMutations('page', ['setActiveMarket', 'setOffPathInDashboard'])
  }
};
</script>

<template>
  <div class="create-new-portfolio">
    <NavCreateNewPortfolio class="create-new-portfolio__nav" />

    <BaseContainer class="content-bg">
      <BaseContent>
        <div class="create-new-portfolio__headline-title">
          <BaseHeadline title="Create your new portfolio">
            <!--{{}}-->
            <p class="create-new-portfolio__subtitle">
              You can choose and add your assets to your new or old portfolio
              and our system pull up historical data from every token/coin that
              you choose. Or choose ready-made portfolio.
            </p>
          </BaseHeadline>
        </div>

        <CreateNewPortfolioForm
          :balance="get_balance_chosen_market"
          :is_show_item="is_show_item"
          :active_market="active_market"
          class="create-new-portfolio__form"
        />
        <AddCurrienciesForm
          v-show="is_show_item"
          :portfolio_data="get_new_portfolio_data"
          class="create-new-portfolio__add-curriencies-form"
        />
      </BaseContent>

      <BaseAside class="create-new-portfolio__aside">
        <BaseHelpBanner2
          href="https://docs.holderlab.io/knowledge-base/about-ready-made-portfolios/"
          style="background-image: url(/img/help/1.png)"
          class="create-new-portfolio__help-banner"
        >
          ABOUT READY-MADE PORTFOLIO
        </BaseHelpBanner2>

        <div class="create-new-portfolio__aside-headline">
          <BaseTitle type="h3">
            GET READY-MADE PORTFOLIO
          </BaseTitle>
          Look at the best performance portfolio
        </div>

        <AsidePacks class="create-new-portfolio__aside-packs" />
      </BaseAside>
    </BaseContainer>
  </div>
</template>

<style lang="scss" scoped>
.create-new-portfolio__headline-title {
  @include ifmobile {
    background: $purple;
    text-align: center;
    color: $white;
  }
}
.create-new-portfolio__subtitle {
  @include ifmobile {
    display: none;
  }
}
.create-new-portfolio {
  &__nav {
    @include ifmobile {
      display: none !important;
    }
  }

  &__form {
    @include ifdesktop {
      width: em(423px);
    }
    @include ifmobile {
      padding: em(50px) em(15px) 0;
    }
  }

  &__add-curriencies-form {
    margin-top: em(40px);
  }

  &__help-banner {
    margin-bottom: em(50px);
  }

  &__aside-headline {
    @include ifmobile {
      padding: 0 em(15px);
    }
  }
  &__aside {
    @include ifmobile {
      display: none;
    }
  }
}
</style>
